// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@component/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const comment = req.body;

  switch (req.method) {
    case "GET":
      try {
        const client = await clientPromise;
        const db = client.db("olswel");
        const comments = await db.collection("Comment").find({}).toArray();
        return res.status(200).json(comments);
      } catch (e) {
        return res.status(400).json(e);
      }
    case "POST":
      try {
        const client = await clientPromise;
        const db = client.db("olswel");
        const response = await db.collection("Comment").insertOne({ comment });
        return res.status(200).json(response);
      } catch (e) {
        return res.status(400).json(e);
      }
    default:
      return res.status(404).json({ msg: "no can do buddy" });
  }
}
