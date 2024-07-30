//Next.js Api route support: http://nextjs.org/docs/api-routes/introduction

import { prisma } from "@/src/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

//serverless function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    res.status(200).send("Get method is okday");
  } else if (method === "POST") {
    const { name, price, menuCategorIds, assetUrl } = req.body;
    const isValid = name && price !== undefined && menuCategorIds.length > 0;
    if (!isValid) return res.status(400).send("Bad request");
    const menu = await prisma.menu.create({ data: { name, price,assetUrl } });
    const newMenuCategoryMenu = await prisma.$transaction(
      menuCategorIds.map((itemId: number) =>
        prisma.menuCategoryMenu.create({
          data: { menuId: menu.id, menuCategoryId: itemId },
        })
      )
    );

    return res.status(200).json({ menu, newMenuCategoryMenu });
  } else if (method === "PUT") {
    const {
      id,
      assetUrl,
      isAvailable,
      locationId,
      name,
      price,
      menuCategoryIds,
      ...payload
    } = req.body;
    if (locationId && isAvailable !== undefined) {
      if (isAvailable === false) {
        await prisma.disabledLocationMenu.create({
          data: { menuId: id, locationId: locationId },
        });
      } else {
        const disableMenu = await prisma.disabledLocationMenu.findFirst({
          where: { menuId: id, locationId },
        });
        await prisma.disabledLocationMenu.delete({
          where: { id: disableMenu?.id },
        });
      }
    }
    const disableLocationMenu = await prisma.disabledLocationMenu.findMany({
      where: { locationId },
    });
    const vaild = await prisma.menu.findFirst({ where: { id: id } });
    if (!vaild) res.status(401).send("Bad request");

    const updateMenu = await prisma.menu.update({
      data: { name, price ,assetUrl},
      where: { id },
    });

    if (menuCategoryIds) {
      const menuCategoryMenu = await prisma.menuCategoryMenu.findMany({
        where: { menuId: id },
      });
      //to Remove
      const toRemove = menuCategoryMenu.filter(
        (item) => !menuCategoryIds.includes(item.menuCategoryId)
      );
      if (toRemove.length) {
        await prisma.$transaction(
          toRemove.map((item) =>
            prisma.menuCategoryMenu.delete({ where: { id: item.id } })
          )
        );
      }
      //To Add
      const toAdd = menuCategoryIds.filter(
        (menuCategoryId: number) =>
          !menuCategoryMenu.find(
            (item) => item.menuCategoryId === menuCategoryId
          )
      );
      if (toAdd.length) {
        await prisma.$transaction(
          toAdd.map((item: number) =>
            prisma.menuCategoryMenu.create({
              data: { menuId: id, menuCategoryId: item },
            })
          )
        );
      }
    }

    const menuCategoryMenu = await prisma.menuCategoryMenu.findMany({
      where: { menuId: id },
    });
    return res
      .status(200)
      .json({ disableLocationMenu, updateMenu, menuCategoryMenu });
  } else if (method === "DELETE") {
    const menuId = Number(req.query.id);
    const existMenu = await prisma.menu.findFirst({ where: { id: menuId } });
    if (!existMenu) return res.status(401).send("Bad Request");

    const removeMenu = await prisma.menu.update({
      data: { isArchived: true },
      where: { id: menuId },
    });
    res.status(200).send("Everythibng is okay");
  }

  return res.status(405).send("Invaild Method");
};

export default handler;
