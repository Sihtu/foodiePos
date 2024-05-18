//Next.js Api route support: http://nextjs.org/docs/api-routes/introduction

import { prisma } from "@/src/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

//serverless function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Okay Get Menu Catagory");
  } else if (method === "POST") {
    const { name, isAvailable } = req.body;
    const isVild = name && isAvailable !== undefined;
    if (!isVild) return res.status(400).json("Bad request");
    const menuCatagory = await prisma.menuCategory.create({
      data: { name, isAvailable },
    });
    return res.status(200).json({menuCatagory});
  } else if (method === "PUT") {
    return res.status(200).send("Okay Put Menu Catagory");
  } else if (method === "DELETE") {
    return res.status(200).send("Okay Delete Menu Catagory");
  }
  return res.status(405).send("Invaild Method");
};

export default handler;
