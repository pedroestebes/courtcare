import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "courtcare-dev-secret-change-in-production"
);

const ISSUER = "courtcare-api";
const AUDIENCE = "courtcare-app";
const EXPIRATION = "7d";

export async function signToken(userId: string): Promise<string> {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(EXPIRATION)
    .sign(JWT_SECRET);
}

export async function verifyToken(
  token: string
): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
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
