//Next.js Api route support: http://nextjs.org/docs/api-routes/introduction

import { prisma } from "@/src/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

//serverless function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    const menu = await prisma.menu.findMany()
    const menuCatagory = await prisma.menuCatagory.findMany()
    return res.status(200).json({menu, menuCatagory});
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
