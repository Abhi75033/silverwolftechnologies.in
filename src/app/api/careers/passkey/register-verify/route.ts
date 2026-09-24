import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { verifyState, getRpID } from "@/lib/cryptoUtils";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    // ─── 1. Retrieve Challenge Cookie ────────────────────────────────────────
    const challengeCookieState = cookies().get("passkey_reg_challenge")?.value;
    if (!challengeCookieState) {
      return NextResponse.json(
        { error: "Registration challenge expired or missing. Please try again." },
        { status: 400 }
      );
    }

    const payload = verifyState(challengeCookieState);
    if (!payload || !payload.challenge) {
      return NextResponse.json(
        { error: "Invalid registration challenge. Please try again." },
        { status: 400 }
      );
    }

    // Clear the registration challenge cookie
    cookies().delete("passkey_reg_challenge");

    // ─── 2. Parse request body ───────────────────────────────────────────────
    const body = await request.json();

    // ─── 3. Verify Registration Response ─────────────────────────────────────
    const host = request.headers.get("host") || "localhost";
    const rpID = getRpID(host);
    const origin = request.headers.get("origin") || "";

    const verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge: payload.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
    });

    if (!verification.verified || !verification.registrationInfo) {
      return NextResponse.json(
        { error: "Verification failed. Device could not register." },
        { status: 400 }
      );
    }

    const { credential } = verification.registrationInfo;
    const { id: credentialID, publicKey: credentialPublicKey, counter } = credential;

    // credentialID is already a Base64URLString, publicKey is a Uint8Array
    const credentialIdBase64 = credentialID;
    const publicKeyBase64 = Buffer.from(credentialPublicKey).toString("base64url");

    // ─── 4. Save to Supabase ─────────────────────────────────────────────────
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Database configuration error on server." },
        { status: 500 }
      );
    }

    const cleanUrl = supabaseUrl.replace(/\/$/, "");
    const restUrl = `${cleanUrl}/rest/v1/admin_passkeys`;

    const insertRes = await fetch(restUrl, {
      method: "POST",
      headers: {
        "apikey": supabaseServiceKey,
        "Authorization": `Bearer ${supabaseServiceKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
      body: JSON.stringify({
        credential_id: credentialIdBase64,
        public_key: publicKeyBase64,
        counter: Number(counter),
      }),
    });

    if (!insertRes.ok) {
      const errText = await insertRes.text();
      console.error("Supabase insert error:", errText);
      return NextResponse.json(
        { error: "Failed to store passkey in database." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error verifying registration:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
