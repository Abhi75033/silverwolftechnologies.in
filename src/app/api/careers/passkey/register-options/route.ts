import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateRegistrationOptions } from "@simplewebauthn/server";
import { signState, verifyState, getRpID } from "@/lib/cryptoUtils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // ─── 1. Authenticate Request ─────────────────────────────────────────────
    // Admin must be logged in (either with password or an existing token) to register a new passkey.
    const password = request.headers.get("x-admin-password");
    const token = request.headers.get("x-admin-token");
    const requiredPassword = process.env.ADMIN_PASSWORD || "SilverWolfAdmin123";

    let isAuthenticated = false;
    if (password && password === requiredPassword) {
      isAuthenticated = true;
    } else if (token) {
      const payload = verifyState(token);
      if (payload && payload.role === "admin") {
        isAuthenticated = true;
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized. Admin credentials required to register a passkey." },
        { status: 401 }
      );
    }

    // ─── 2. Get registered credentials to exclude ───────────────────────────
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    let excludeCredentials: any[] = [];
    if (supabaseUrl && supabaseServiceKey) {
      const cleanUrl = supabaseUrl.replace(/\/$/, "");
      const restUrl = `${cleanUrl}/rest/v1/admin_passkeys?select=credential_id`;

      try {
        const res = await fetch(restUrl, {
          method: "GET",
          headers: {
            "apikey": supabaseServiceKey,
            "Authorization": `Bearer ${supabaseServiceKey}`,
          },
          cache: "no-store",
        });
        if (res.ok) {
          const credentials = await res.json();
          excludeCredentials = credentials.map((cred: any) => ({
            id: cred.credential_id,
            type: "public-key" as const,
          }));
        }
      } catch (err) {
        console.error("Failed to load existing passkeys for exclusion:", err);
      }
    }

    // ─── 3. Generate Registration Options ────────────────────────────────────
    const host = request.headers.get("host") || "localhost";
    const rpID = getRpID(host);

    const options = await generateRegistrationOptions({
      rpName: "Silver Wolf Technologies",
      rpID,
      userID: new TextEncoder().encode("silver-wolf-admin-id"),
      userName: "admin@silverwolftechnologies.in",
      userDisplayName: "Silver Wolf Admin",
      excludeCredentials,
      authenticatorSelection: {
        residentKey: "required",
        userVerification: "preferred",
      },
    });

    // ─── 4. Save challenge in stateless signed cookie ───────────────────────
    const signedChallengeState = signState({ challenge: options.challenge }, 5 * 60 * 1000); // 5 mins

    cookies().set("passkey_reg_challenge", signedChallengeState, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 300,
      path: "/",
    });

    return NextResponse.json(options);
  } catch (error: any) {
    console.error("Error generating registration options:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
