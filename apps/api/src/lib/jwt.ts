import { SignJWT, jwtVerify } from "jose";

const ISSUER = "courtcare-api";
const AUDIENCE = "courtcare-app";
const EXPIRATION = "7d";

function getSecretKey(secret: string): Uint8Array {
  return new TextEncoder().encode(secret);
}

export async function signToken(
  userId: string,
  secret: string
): Promise<string> {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(EXPIRATION)
    .sign(getSecretKey(secret));
}

export async function verifyToken(
  token: string,
  secret: string
): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(secret), {
      issuer: ISSUER,
      audience: AUDIENCE,
    });

    if (!payload.sub) {
      return null;
    }

    return { userId: payload.sub };
  } catch {
    return null;
  }
}
