import type { CookieOptions } from "#app";

const cookies = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60,
};

export default cookies;
