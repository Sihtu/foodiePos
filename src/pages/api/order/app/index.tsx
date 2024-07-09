import { prisma } from "@/src/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    const id = Number(req.query.tableId);
    if (!id)
      return res.status(401).send("TableId is required");

    const table = await prisma.table.findFirst({ where: { id } });
    if(!table) return res.status(401).send("Table doesn't have in this resturnent")
    const location = await prisma.location.findFirst({where: {id: table.locationId}})
        
    const company = await prisma.company.findFirst({where: {id: location?.companyId}})
    let menuCatagory= await prisma.menuCategory.findMany({where: {companyId: company?.id,}})
    const menuCategoryIds = menuCatagory.map((item)=> item.id)
    
    const disableLocationMenuCategoryIds = (await prisma.disabledLocationMenuCategory.findMany({where: {menuCategoryId: {in: menuCategoryIds}}})).map((item)=> item.menuCategoryId)

    menuCatagory= menuCatagory.filter((item)=> !disableLocationMenuCategoryIds.includes(item.id))

    const menuCatagoryMenu = await prisma.menuCategoryMenu.findMany({where: {menuCategoryId: {in: menuCategoryIds}}})

    const menuId = menuCatagoryMenu.map((item)=> item.menuId)

    const disabledLocationMenuIds = (await prisma.disabledLocationMenu.findMany({where: {menuId: {in: menuId}}})).map((item)=> item.menuId)

    const menu = (await prisma.menu.findMany({where: {id: {in: menuId}, isArchived: false}})).filter((item)=> !disabledLocationMenuIds.includes(item.id))

    const menuAddonIds = menu.map(item=> item.id)
    const menuAddonCatagory = await prisma.menuAddonCategory.findMany({where: {menuId: {in: menuAddonIds}}})
    const addonCategoryIds = menuAddonCatagory.map((item)=> item.addonCategoryId)

    const addonCatagory = await prisma.addonCategory.findMany({where: {id: {in: addonCategoryIds}}})

    const addon = await prisma.addon.findMany({where: {addonCategoryId: {in: addonCategoryIds}}})

    const order = await prisma.order.findMany({where: {tableId: table.id}})


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
        disableLocationMenuCategoryMenu: [],
        disableLocationMenu: [],
        order
      })
  }
};

export default handler;
