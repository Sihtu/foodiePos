//Next.js Api route support: http://nextjs.org/docs/api-routes/introduction

import { prisma } from "@/src/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

//serverless function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Okay Get Addon");
  } else if (method === "POST") {
    const { name, price, addonCategoryId } = req.body;
    const isVaild = name && addonCategoryId;
    if (!isVaild) return res.status(401).send("This is bad Request");
    const addon = await prisma.addon.create({
      data: { name, price, addonCategoryId },
    });

    return res.status(200).json({ addon });
  } else if (method === "PUT") {
    const { id, name, price, addonCategoryId } = req.body;
    const existAddon = await prisma.addon.findFirst({ where: { id } });
    if (!existAddon) return res.status(401).send("Bad Request");
    const addon = await prisma.addon.update({
      data: { name, price, addonCategoryId },
      where: { id },
    });

    return res.status(200).json({ addon });
  } else if (method === "DELETE") {
    return res.status(200).send("Okay Delete Addon");
  }
  return res.status(405).send("Invaild Method");
};

export default handler;
