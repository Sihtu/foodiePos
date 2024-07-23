import MenuCard from "@/src/components/MenuCard";
import OrderAppLayout from "@/src/components/OrderAppLayout";
import { useAppSelector } from "@/src/store/hook";
import menuCategoryMenuSlice from "@/src/store/slice/menuCategoryMenuSlice";
import { Box, Tab, Tabs } from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home = () => {
  const { menuCatagory } = useAppSelector((item) => item.menuCatagory);
  const { menuCategoryMenu } = useAppSelector((item) => item.menuCategoryMenu);
  const {tables} = useAppSelector((item)=> item.table)
  const { item } = useAppSelector((item) => item.menu);
  const [value, setValue] = useState(0);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategory>();

  useEffect(() => {
    if (menuCatagory.length) {
      setSelectedMenuCategory(menuCatagory[0]);
    }
  }, [menuCatagory]);

  const RenderMenu = () => {
    const router= useRouter()
    const tableId = Number(router.query.tableId)
    const vaildMenuIds = menuCategoryMenu
      .filter((item) => item.menuCategoryId === selectedMenuCategory?.id)
      .map((item) => item.menuId);  

    const vaildMenus = item.filter((item) => vaildMenuIds.includes(item.id));

    return vaildMenus.map((item) => (
      
      <MenuCard key={item.id} menu={item} href={`/order/menu/${item.id}?tableId=${tableId}`} />
    ));
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={(event, value) => setValue(value)}>
          {menuCatagory.map((item) => (
            <Tab
              key={item.id}
              label={item.name}
              onClick={() => setSelectedMenuCategory(item)}
            />
          ))}
        </Tabs>
      </Box>
      <Box sx={{display: "flex", flexWrap: "wrap"}}>
        {RenderMenu()}
      </Box>
    </Box>
  );
};

export default Home;
