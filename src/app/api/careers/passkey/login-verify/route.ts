import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { verifyState, signState, getRpID } from "@/lib/cryptoUtils";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    // ─── 1. Retrieve Challenge Cookie ────────────────────────────────────────
    const challengeCookieState = cookies().get("passkey_log_challenge")?.value;
    if (!challengeCookieState) {
      return NextResponse.json(
        { error: "Authentication challenge expired or missing. Please try again." },
        { status: 400 }
      );
    }

    const payload = verifyState(challengeCookieState);
    if (!payload || !payload.challenge) {
      return NextResponse.json(
        { error: "Invalid authentication challenge. Please try again." },
        { status: 400 }
      );
    }

    // Clear the challenge cookie
    cookies().delete("passkey_log_challenge");

    // ─── 2. Parse request body ───────────────────────────────────────────────
    const body = await request.json();
    const credentialId = body.id; // base64url format string

    if (!credentialId) {
      return NextResponse.json(
        { error: "Missing credential ID in authentication response." },
        { status: 400 }
      );
    }

    // ─── 3. Load Credential from Supabase ────────────────────────────────────
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Server Database configuration error." },
        { status: 500 }
      );
    }

    const cleanUrl = supabaseUrl.replace(/\/$/, "");
    const restUrl = `${cleanUrl}/rest/v1/admin_passkeys?credential_id=eq.${credentialId}&select=*`;

    const fetchRes = await fetch(restUrl, {
      method: "GET",
      headers: {
        "apikey": supabaseServiceKey,
        "Authorization": `Bearer ${supabaseServiceKey}`,
      },
      cache: "no-store",
    });

    if (!fetchRes.ok) {
      const errText = await fetchRes.text();
      console.error("Failed to fetch credential from Supabase:", errText);
      return NextResponse.json(
        { error: "Failed to verify credential in database." },
        { status: 500 }
      );
    }

    const credentials = await fetchRes.json();
    if (!credentials || credentials.length === 0) {
      return NextResponse.json(
        { error: "Passkey is not registered in the system. Use password login." },
        { status: 404 }
      );
    }

    const dbCredential = credentials[0];

    // Decode base64url strings back to Uint8Arrays for simplewebauthn
    const credentialIdUint8 = Buffer.from(dbCredential.credential_id, "base64url");
    const publicKeyUint8 = Buffer.from(dbCredential.public_key, "base64url");

    // ─── 4. Verify Authentication Signature ──────────────────────────────────
    const host = request.headers.get("host") || "localhost";
    const rpID = getRpID(host);
    const origin = request.headers.get("origin") || "";

    const verification = await verifyAuthenticationResponse({
      response: body,
      expectedChallenge: payload.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      credential: {
        id: dbCredential.credential_id,
        publicKey: publicKeyUint8,
        counter: Number(dbCredential.counter),
      },
    });

    if (!verification.verified || !verification.authenticationInfo) {
      return NextResponse.json(
        { error: "Signature verification failed. Passkey auth invalid." },
        { status: 400 }
      );
    }

    const { newCounter } = verification.authenticationInfo;

    // ─── 5. Update signature counter in Supabase ─────────────────────────────
    const updateUrl = `${cleanUrl}/rest/v1/admin_passkeys?id=eq.${dbCredential.id}`;
    await fetch(updateUrl, {
      method: "PATCH",
      headers: {
        "apikey": supabaseServiceKey,
        "Authorization": `Bearer ${supabaseServiceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        counter: Number(newCounter),
      }),
    });

    // ─── 6. Generate Session JWT Token ───────────────────────────────────────
    // Valid for 24 hours
    const token = signState({ role: "admin" }, 24 * 60 * 60 * 1000);

    return NextResponse.json({ success: true, token });
  } catch (error: any) {
    console.error("Error verifying login signature:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
