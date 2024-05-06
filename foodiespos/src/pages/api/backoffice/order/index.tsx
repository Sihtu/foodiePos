//Next.js Api route support: http://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

//serverless function
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Okay Get Order");
  } else if (method === "POST") {
    return res.status(200).send("Okay Post Order");
  } else if (method === "PUT") {
    return res.status(200).send("Okay Put Order");
  } else if (method === "DELETE") {
    return res.status(200).send("Okay Delete Order");
  }
  return res.status(405).send("Invaild Method");
};

export default handler;
