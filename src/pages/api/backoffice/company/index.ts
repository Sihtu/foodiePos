import { prisma } from "@/src/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Get method is okay");
  } else if (method === "POST") {
    return res.status(200).send("Post method is okay");
  } else if (method === "PUT") {
    const { id, name, street, city, township } = req.body;
    const existCompany = await prisma.company.findFirst({ where: { id } });
    if (!existCompany) return res.status(400).send("Bad request");
    const company = await prisma.company.update({
      data: { name, street, city, township },
      where: { id },
    });
    return res.status(200).json({ company });
  } else if (method === "DELETE") {
    return res.status(200).send("Delete method is okay");
  }
  return res.status(401).send("Method is invailde");
};

export default handler;
