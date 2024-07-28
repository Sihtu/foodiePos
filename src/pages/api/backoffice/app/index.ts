import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method
  if(method === "GET"){
  return  res.status(200).send("everything is ok")
  }
  res.status(401).send("menthod is not allow")
}

export default handler
