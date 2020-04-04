import { NextApiRequest, NextApiResponse } from "next";

import { getAuthTokens } from "../data";

const AUTH_TOKEN_EXPIRE_TIME_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const authMiddleware = () => {
  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => void,
  ) => {
    // Get email and auth token from cookies
    const email = String(req.cookies.email);
    const token = String(req.cookies.token);
    if (email.trim() === "" || token.trim() === "") {
      return res.status(401).end();
    }

    // Fetch the auth tokens attached to this email address
    let authTokens = await getAuthTokens(email);
    // Filter out any expired tokens
    const time = Date.now();
    authTokens = authTokens.filter((t) => {
      return time < t.timestamp + AUTH_TOKEN_EXPIRE_TIME_MS;
    });
    // If the token provided isn't in there, return 401
    if (authTokens.find((t) => t.token === token) === undefined) {
      return res.status(401).end();
    }

    next();
  };
};

export default authMiddleware;
