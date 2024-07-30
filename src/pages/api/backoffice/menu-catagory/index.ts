//Next.js Api route support: http://nextjs.org/docs/api-routes/introduction

import { prisma } from "@/src/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

//serverless function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Okay Get Menu Catagory");
  } else if (method === "POST") {
    const { name, isAvailable, companyId } = req.body;
    const isVild = name && companyId && isAvailable !== undefined;
    if (!isVild) return res.status(400).json("Bad request");
    const menuCatagory = await prisma.menuCategory.create({
      data: { name, isAvailable, companyId },
    });
    return res.status(200).json({ menuCatagory });
  } else if (method === "PUT") {
    const { id, isAvailable, locationId, ...payload } = req.body;
    const vaild = await prisma.menuCategory.findFirst({ where: { id } });
    if (locationId && isAvailable !== undefined) {
      if (isAvailable === false) {
        await prisma.disabledLocationMenuCategory.create({
          data: { menuCategoryId: id, locationId: locationId },
        });
      } else {
        const disableMenuCategory =
          await prisma.disabledLocationMenuCategory.findFirst({
            where: { menuCategoryId: id, locationId },
          });
        if (disableMenuCategory)
        await prisma.disabledLocationMenuCategory.delete({
          where: { id: disableMenuCategory?.id },
        });
      }
    }
    if (!vaild) return res.status(400).send("Bad Request");

    //this is to show update data instantly without refresh "important consect"
    const updatedMenuCatagory = await prisma.menuCategory.update({
      data: payload,
      where: { id },
    });
    const location = await prisma.location.findFirst({
      where: { id: locationId },
    });
    const company = await prisma.company.findFirst({
      where: { id: location?.companyId },
    });
    const menuCategory = await prisma.menuCategory.findMany({
      where: { companyId: company?.id },
    });
    const menuCategoryId = menuCategory.map((item) => item.id);
    const disableMenuCategory =
      await prisma.disabledLocationMenuCategory.findMany({
        where: { menuCategoryId: { in: menuCategoryId } },
      });
    return res.status(200).json({ updatedMenuCatagory, disableMenuCategory });
  } else if (method === "DELETE") {
    const menuCategoryId = Number(req.query.id);
    const findMenuCategoryId = await prisma.menuCategory.findFirst({
      where: { id: menuCategoryId },
    });
    if (!findMenuCategoryId) return res.status(400).send("Bad request");
    return res.status(200).send("Every is okay");
  }
  return res.status(405).send("Invaild Method");
};

export default handler;
