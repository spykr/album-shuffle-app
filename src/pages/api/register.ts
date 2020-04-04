import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

import { getLoginTokens, putLoginTokens } from "../../data";

const LOGIN_TOKEN_EXPIRE_TIME_MS = 15 * 60 * 1000; // 15 minutes

type Response = {
  email: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method !== "POST") {
    return res.status(404).end();
  }

  const email = req.body.email || "";
  if (email.trim() === "") {
    return res.status(400).end();
  }

  // Fetch any login tokens attached to this email address
  let tokens = await getLoginTokens(email);
  // Filter out any expired tokens
  const time = Date.now();
  tokens = tokens.filter((t) => {
    return time < t.timestamp + LOGIN_TOKEN_EXPIRE_TIME_MS;
  });
  // Add a new token and save it
  const token = uuidv4();
  tokens.push({
    token: token,
    timestamp: time,
  });
  await putLoginTokens(email, tokens);

  // Generate a login link and send it to the user's email address
  const host =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://albumshuffle.darcyglennen.com";
  const t = encodeURIComponent(token);
  const e = encodeURIComponent(email);
  const url = `${host}?token=${t}&email=${e}`;

  await nodemailer
    .createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "albumshuffle@gmail.com",
        pass: process.env.SMTP_PASS,
      },
    })
    .sendMail({
      to: email,
      subject: "Log in to the Album Shuffle app",
      text: `Open the following URL in your browser to log in: ${url}`,
      html: `<p>Open the following URL in your browser to log in:</p><a href="${url}">${url}</a>`,
    });

  return res.status(200).json({
    email: email,
  });
};
