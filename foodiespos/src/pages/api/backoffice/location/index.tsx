//Next.js Api route support: http://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

//serverless function
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Okay Get Location");
  } else if (method === "POST") {
    return res.status(200).send("Okay Post Location");
  } else if (method === "PUT") {
    return res.status(200).send("Okay Put Location");
  } else if (method === "DELETE") {
    return res.status(200).send("Okay Delete Location");
  }
  return res.status(405).send("Invaild Method");
};

export default handler;
