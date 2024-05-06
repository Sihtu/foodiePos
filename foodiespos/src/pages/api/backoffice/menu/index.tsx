//Next.js Api route support: http://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

//serverless function
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  console.log(req.body)
  if (method === "GET") {
  } else if (method === "POST") {
  } else if (method === "PUT") {
  } else if (method === "DELETE") {
  }
  return res.status(405).send("Invaild Method");
};

export default handler;
