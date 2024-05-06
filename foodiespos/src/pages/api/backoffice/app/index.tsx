//Next.js Api route support: http://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

//serverless function
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Okay Get App");
  } else if (method === "POST") {
    return res.status(200).send("Okay Post App");
  } else if (method === "PUT") {
    return res.status(200).send("Okay Put App");
  } else if (method === "DELETE") {
    return res.status(200).send("Okay Delete App");
  }
  return res.status(405).send("Invaild Method");
};

export default handler;
