//Next.js Api route support: http://nextjs.org/docs/api-routes/introduction

import { prisma } from "@/src/utils/prisma";
import { Order, ORDERSTATUS } from "@prisma/client";
import { stat } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

//serverless function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Okay Get Order");
  } else if (method === "POST") {
    return res.status(200).send("Okay Post Order");
  } else if (method === "PUT") {
    const itemId = String(req.query.itemId)
    const status = req.body as ORDERSTATUS
    const vaild = itemId && status
    if(!vaild) return res.status(401).send("Bad Request")
    const exist = await prisma.order.findFirst({where: {itemId}})
    if(!exist) return res.status(401).send("Bad Request")
       await prisma.order.updateMany({data: {status}, where: {itemId}})
      const tables = await prisma.table.findFirst({where: {id: exist.tableId}})
      const tableIds = (await prisma.table.findMany({where: {locationId: tables?.locationId}})).map(item=> item.id)
      const orders = await prisma.order.findMany({where: {tableId: {in: tableIds}}, orderBy: {id: "asc"}})
    return res.status(200).json({orders});
  } else if (method === "DELETE") {
    return res.status(200).send("Okay Delete Order");
  }
  return res.status(405).send("Invaild Method");
};

export default handler;
