//Next.js Api route support: http://nextjs.org/docs/api-routes/introduction

import { qrCodeImageUpload } from "@/src/utils/assetUpload";
import { prisma } from "@/src/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

//serverless function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Okay Get Table");
  } else if (method === "POST") {
    const { name, locationId} = req.body;
    const isVaild = name && locationId;
    if (!isVaild) return res.status(401).send("Bad request");
    let newTable = await prisma.table.create({
      data: { name, locationId, assetUrl: '' },
    });

    const assetUrls = await qrCodeImageUpload(newTable.id)
    console.log(assetUrls)
    newTable = await prisma.table.update({data: {assetUrl: assetUrls}, where: {id: newTable.id}})
    const table = await prisma.table.findMany({ where: { locationId } });
    
    return res.status(200).json({ table });
  } else if (method === "PUT") {
    const { id, name, locationId } = req.body;
    const existTable = await prisma.table.findFirst({ where: { id } });
    if (!existTable) return res.status(400).send("Bad Request");
    let table = await prisma.table.update({
      data: { name, locationId },
      where: { id },
    });
    
    return res.status(200).json({ table });
  } else if (method === "DELETE") {
    const tableId = Number(req.query.id);
    const existTable = await prisma.table.findFirst({ where: { id: tableId } });
    if (!existTable) return res.status(401).send("Bad Request");
    await prisma.table.update({
      data: { isArchived: true },
      where: { id: tableId },
    });

    return res.status(200).send("Table was deleted successfully");
  }
  return res.status(405).send("Invaild Method");
};

export default handler;
