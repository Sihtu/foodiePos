//Next.js Api route support: http://nextjs.org/docs/api-routes/introduction

import { prisma } from "@/src/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

//serverless function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    res.status(200).send("Get method is okday")
    
  } else if (method === "POST") {
    const {name, price } = req.body
    res.json({name, price})
    const isValid = name && price !== undefined
    if(!isValid) return res.status(400).send("Bad request")
      const menu = await prisma.menu.create({data: {name,price}})
   return res.status(200).json(menu)
  } else if (method === "PUT") {
  } else if (method === "DELETE") {
  }
  return res.status(405).send("Invaild Method");
};

export default handler;
