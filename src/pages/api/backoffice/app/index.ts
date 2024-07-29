import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest,res: NextApiResponse) => {
  const method = req.method
  if(method=== "GET"){
  return  res.status(200).send("Method is okay")
  }
  res.status(400).send("Method is not allow")

}

export default handler;