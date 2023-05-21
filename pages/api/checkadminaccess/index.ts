import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;
  const adminToken = process.env.ADMIN_PASSWORD;

  // Check if the provided token matches the admin token
  const isAdmin = token === adminToken;

  res.status(200).json({ isAdmin });
}
