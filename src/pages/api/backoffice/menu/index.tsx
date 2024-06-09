//Next.js Api route support: http://nextjs.org/docs/api-routes/introduction

import { prisma } from "@/src/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

//serverless function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    res.status(200).send("Get method is okday");
  } else if (method === "POST") {
    const { name, price, menuCategorIds } = req.body;
    const isValid = name && price !== undefined && menuCategorIds.length > 0;
    if (!isValid) return res.status(400).send("Bad request");
    const menu = await prisma.menu.create({ data: { name, price } });
    const newMenuCategoryMenu = await prisma.$transaction(
      menuCategorIds.map((itemId: number) =>
        prisma.menuCategoryMenu.create({
          data: { menuId: menu.id, menuCategoryId: itemId },
        })
      )
    );

    return res.status(200).json({ menu, newMenuCategoryMenu });
  } else if (method === "PUT") {
    const { id, isAvailable, locationId,name, price, ...payload } = req.body;
    console.log(req.body);
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
      where: { locationId},
    });
    const vaild = await prisma.menu.findFirst({ where: { id: id } });
    if (!vaild) res.status(401).send("Bad request");
    
    const updateMenu = await prisma.menu.update({
      data: {name, price},
      where: { id },
    });
    return res.status(200).json({ disableLocationMenu, updateMenu });
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
