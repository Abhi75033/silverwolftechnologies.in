import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { signState, getRpID } from "@/lib/cryptoUtils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // ─── 1. Load Registered Passkeys from Supabase ───────────────────────────
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    let allowedCredentials: any[] = [];
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
          allowedCredentials = credentials.map((cred: any) => ({
            id: cred.credential_id,
            type: "public-key" as const,
          }));
        }
      } catch (err) {
        console.error("Failed to load existing passkeys for login options:", err);
      }
    }

    // If no passkeys are registered, return empty allowCredentials so frontend can display
    // a message that no passkeys are registered yet.
    
    // ─── 2. Generate Authentication Options ──────────────────────────────────
    const host = request.headers.get("host") || "localhost";
    const rpID = getRpID(host);

    const options = await generateAuthenticationOptions({
      rpID,
      allowCredentials: allowedCredentials,
      userVerification: "preferred",
    });

    // ─── 3. Save challenge in stateless signed cookie ────────────────────────
    const signedChallengeState = signState({ challenge: options.challenge }, 5 * 60 * 1000); // 5 mins

    cookies().set("passkey_log_challenge", signedChallengeState, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 300,
      path: "/",
    });

    return NextResponse.json(options);
  } catch (error: any) {
    console.error("Error generating login options:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
