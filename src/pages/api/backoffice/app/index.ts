//Next.js Api route support: http://nextjs.org/docs/api-routes/introduction

import { prisma } from "@/src/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

//serverless function
export default async function handler   (req: NextApiRequest, res: NextApiResponse)  {
  const session = await getSession({ req });
  
  if (session) {
    const { user } = session;
    if (user) {
      const name = user.name as string;
      const email = user.email as string;
      const dataFromDb = await prisma.user.findFirst({
        where: { email },
      });

      if (dataFromDb) {
        const companyId = dataFromDb.companyId;
        const company = await prisma.company.findFirst({
          where: { id: companyId },
        });
        const location = await prisma.location.findMany({
          where: { companyId, isArchived: false },
        });

        const locationIds = location.map((item) => item.id);
        const table = await prisma.table.findMany({
          where: { locationId: { in: locationIds }, isArchived: false },
        });
        //this is to show itemCard corret order
        const menuCatagory = await prisma.menuCategory.findMany({
          orderBy: [{ id: "asc" }],
          where: { companyId },
        });

        const menuCatagoryIds = menuCatagory.map((item) => item.id);
        const disableLocationMenuCategoryMenu =
          await prisma.disabledLocationMenuCategory.findMany({
            where: { menuCategoryId: { in: menuCatagoryIds } },
          });

        const menuCatagoryMenu = await prisma.menuCategoryMenu.findMany({
          where: { menuCategoryId: { in: menuCatagoryIds } },
        });
        const menuIds = menuCatagoryMenu.map((item) => item.menuId);

        const disableLocationMenu = await prisma.disabledLocationMenu.findMany({
          where: { menuId: { in: menuIds } },
        });

        const menu = await prisma.menu.findMany({
          where: { id: { in: menuIds }, isArchived: false },
        });
        const menuAddonCatagory = await prisma.menuAddonCategory.findMany({
          where: { menuId: { in: menuIds } },
        });
        const AddonCatagoryIds = menuAddonCatagory.map(
          (item) => item.addonCategoryId
        );
        const addon = await prisma.addon.findMany({
          where: { addonCategoryId: { in: AddonCatagoryIds } },
        });
        const addonCatagory = await prisma.addonCategory.findMany({
          orderBy: [{ id: "asc" }],
          where: { id: { in: AddonCatagoryIds }, isArchived: false },
        });
        const order = await prisma.order.findMany({
          where: { tableId: { in: table.map((item) => item.id) } },
        });
        res.status(200).json({
          company,
          location,
          table,
          addonCatagory,
          addon,
          menu,
          menuCatagory,
          menuCatagoryMenu,
          menuAddonCatagory,
          disableLocationMenuCategoryMenu,
          disableLocationMenu,
          order,
        });
      } else {
        const newCompany = await prisma.company.create({
          data: {
            name: "Default name",
            street: "Default street",
            township: "Default township",
            city: "Default city",
          },
        });
        const newUser = await prisma.user.create({
          data: { name: name, email: email, companyId: newCompany.id },
        });
        const newLocation = await prisma.location.create({
          data: {
            name: "Default name",
            street: "Default Street ",
            city: "Default city",
            township: "Default township",
            companyId: newCompany.id,
          },
        });
        const newTable = await prisma.table.create({
          data: {
            name: "default table",
            locationId: newLocation.id,
            assetUrl: "",
          },
        });
        const newMenu = await prisma.menu.create({
          data: { name: "default menu", price: 0 },
        });
        const newMenuCatagory = await prisma.menuCategory.create({
          data: { name: "default menuCatagory", companyId: newCompany.id },
        });
        const newMenuCatagoryMenu = await prisma.menuCategoryMenu.create({
          data: { menuCategoryId: newMenuCatagory.id, menuId: newMenu.id },
        });
        const newAddonCatagory = await prisma.addonCategory.create({
          data: { name: "default name " },
        });
        const newMenuAddonCatagory = await prisma.menuAddonCategory.create({
          data: { menuId: newMenu.id, addonCategoryId: newAddonCatagory.id },
        });

        const newAddonData = [
          { name: "default name", addonCategoryId: newAddonCatagory.id },
          { name: "default name2", addonCategoryId: newAddonCatagory.id },
          { name: "default name3s", addonCategoryId: newAddonCatagory.id },
        ];

        const newAddon = await prisma.$transaction(
          newAddonData.map((item) => prisma.addon.create({ data: item }))
        );
        res.status(200).json({
          company: [newCompany],
          location: [newLocation],
          table: [newTable],
          addonCatagory: [newAddonCatagory],
          addon: [newAddon],
          menu: [newMenu],
          menuCatagory: [newMenuCatagory],
          menuCatagoryMenu: [newMenuCatagoryMenu],
          menuAddonCatagory: [newMenuAddonCatagory],
          disableLocationMenuCategoryMenu: [],
          disableLocationMenu: [],
          order: [],
        });
      }
    }
  } else {
    res.status(401).send("Something went Wrong");
  }
  
};

