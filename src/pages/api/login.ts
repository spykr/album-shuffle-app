import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

import {
  getLoginTokens,
  putLoginTokens,
  getAuthTokens,
  putAuthTokens,
} from "../../data";

const LOGIN_TOKEN_EXPIRE_TIME_MS = 15 * 60 * 1000; // 15 minutes

type Response = {
  email: string;
  token: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method !== "POST") {
    return res.status(404).end();
  }

  // Get the email and login token from the body
  const email = req.body.email || "";
  const token = req.body.token || "";
  if (email.trim() === "" || token.trim() === "") {
    return res.status(400).end();
  }

  // Fetch the login tokens attached to this email address
  let tokens = await getLoginTokens(email);
  // Filter out any expired tokens
  const time = Date.now();
  tokens = tokens.filter((t) => {
    return time < t.timestamp + LOGIN_TOKEN_EXPIRE_TIME_MS;
  });
  // If the token provided isn't in there, return 401
  if (tokens.find((t) => t.token === token) === undefined) {
    return res.status(401).end();
  }

  // Remove the login token from the database
  tokens = tokens.filter((t) => {
    return t.token !== token;
  });
  await putLoginTokens(email, tokens);

  // Generate an auth token and save it
  const authTokens = await getAuthTokens(email);
  const authToken = uuidv4();
  authTokens.push({
    token: authToken,
    timestamp: time,
  });
  await putAuthTokens(email, authTokens);

  // Return the auth token
  return res.status(200).json({
    token: authToken,
    email: email,
  });
};
