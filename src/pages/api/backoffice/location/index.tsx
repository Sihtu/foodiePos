//Next.js Api route support: http://nextjs.org/docs/api-routes/introduction

import { prisma } from "@/src/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

//serverless function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Okay Get Location");
  } else if (method === "POST") {
    const { name, street, township, city, companyId } = req.body;
    const Vaild = name && street && township && city && companyId;
    if (!Vaild) return res.status(401).send("Bad request");
    const location = await prisma.location.create({
      data: { name, street, township, city, companyId },
    });
    return res.status(200).json({ location });
  } else if (method === "PUT") {
    const { id, name, street, city, township, companyId } = req.body;
    const exist = await prisma.location.findFirst({ where: { id } });
    if (!exist) return res.status(401).send("Bad request");
    const locations = await prisma.location.update({
      data: { name, street, city, township, companyId },
      where: { id },
    });
    return res.status(200).json({ locations });
  } else if (method === "DELETE") {
    const locationId = Number(req.query.id);
    if (!locationId) return res.status(401).send("Bad Request");
    const location = await prisma.location.update({
      data: { isArchived: true },
      where: { id: locationId },
    });
    return res.status(200).send("Okay Delete Location");
  }
  return res.status(405).send("Invaild Method");
};

export default handler;
