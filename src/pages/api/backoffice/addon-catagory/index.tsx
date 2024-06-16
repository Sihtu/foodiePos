//Next.js Api route support: http://nextjs.org/docs/api-routes/introduction

import { prisma } from "@/src/utils/prisma";
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

//serverless function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("Okay Get Addon Catagory");
  } else if (method === "POST") {
    const { name, menuIds, isRequired } = req.body;
    const isVaild = name && menuIds;
    if (!isVaild) return res.status(401).send("Bad Request");
    const addonCategory = await prisma.addonCategory.create({
      data: { name, isRequired },
    });
    const menuAddonCategory = await prisma.$transaction(
      menuIds.map((itemId: number) =>
        prisma.menuAddonCategory.create({
          data: { menuId: itemId, addonCategoryId: addonCategory.id },
        })
      )
    );
    return res.status(200).json({ addonCategory, menuAddonCategory });
  } else if (method === "PUT") {
    const { name, isRequired, id, menuId } = req.body;
    const existAddonCategory = await prisma.addonCategory.findFirst({
      where: { id },
    });
    if (!existAddonCategory)
      return res
        .status(401)
        .send("This Addon Category doesn't exist at addonCategory table");
    const addonCategory = await prisma.addonCategory.update({
      data: { name, isRequired },
      where: { id },
    });

    //For Deleting and creating MenuAddonCategoryTable

    if (menuId) {
      const menuAddonCategories = await prisma.menuAddonCategory.findMany({
        where: { addonCategoryId: id },
      });
      const toRemove = menuAddonCategories.filter(
        (item) => !menuId.includes(item.menuId)
      );
      if (toRemove.length)
        await prisma.menuAddonCategory.deleteMany({
          where: { id: { in: toRemove.map((item) => item.id) } },
        });
      const toAdd = menuId.filter(
        (item: number) =>
          !menuAddonCategories.find((items) => items.menuId === item)
      );
      if (toAdd.length) {
        await prisma.$transaction(
          toAdd.map((menuId: number) =>
            prisma.menuAddonCategory.create({
              data: { menuId, addonCategoryId: id },
            })
          )
        );
      }
    }
    const menuAddonCategories = await prisma.menuAddonCategory.findMany({
      where: { addonCategoryId: id },
    });
    return res.status(200).json({ addonCategory, menuAddonCategories });
  } else if (method === "DELETE") {
    const deleteId = Number(req.query.id);
    const isVaild = await prisma.addonCategory.findFirst({
      where: { id: deleteId },
    });
    if (!isVaild) return res.status(401).send("Bad Request");
    await prisma.addonCategory.update({
      data: { isArchived: true },
      where: { id: deleteId },
    });
    const addonCategory = await prisma
    return res.status(200).send("Okay Delete Addon Catagory");
  }
  return res.status(405).send("Invaild Method");
};

export default handler;
