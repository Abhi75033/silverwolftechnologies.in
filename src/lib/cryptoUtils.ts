import crypto from "crypto";

const SECRET = process.env.ADMIN_PASSWORD || "SilverWolfAdmin123";

/**
 * Signs a payload using HMAC SHA-256 and returns a stateless JWT.
 * @param payload The object to encode and sign
 * @param expiresInMs Time from now in milliseconds when the token expires
 */
export function signState(payload: any, expiresInMs: number): string {
  const header = { alg: "HS256", typ: "JWT" };
  const fullPayload = {
    ...payload,
    exp: Date.now() + expiresInMs,
  };

  const headerB64 = Buffer.from(JSON.stringify(header)).toString("base64url");
  const payloadB64 = Buffer.from(JSON.stringify(fullPayload)).toString("base64url");

  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(`${headerB64}.${payloadB64}`)
    .digest("base64url");

  return `${headerB64}.${payloadB64}.${signature}`;
}

/**
 * Verifies a JWT signed by signState and returns the payload if valid.
 * Returns null if the signature is invalid or the token has expired.
 */
export function verifyState(token: string): any | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const [headerB64, payloadB64, signature] = parts;

    const expectedSignature = crypto
      .createHmac("sha256", SECRET)
      .update(`${headerB64}.${payloadB64}`)
      .digest("base64url");

    if (signature !== expectedSignature) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));

    if (payload.exp && payload.exp < Date.now()) {
      return null; // Expired
    }

    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

/**
 * Resolves the Relying Party ID (rpID) from the host header.
 * For production, it maps www.silverwolftechnologies.in and silverwolftechnologies.in
 * to the parent domain 'silverwolftechnologies.in' so passkeys work on both origins.
 */
export function getRpID(host: string): string {
  const domain = host.split(":")[0];
  if (domain === "localhost" || domain === "127.0.0.1") {
    return "localhost";
  }
  if (domain.endsWith("silverwolftechnologies.in")) {
    return "silverwolftechnologies.in";
  }
  return domain;
}
