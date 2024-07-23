import ShowAddonCategory from "@/src/components/AddonCategory";
import QuantityCounter from "@/src/components/QuantityCounter";
import AddonCatagory from "@/src/pages/backoffice/addon-catagory";
import { useAppDispatch, useAppSelector } from "@/src/store/hook";
import { addToCart } from "@/src/store/slice/cartSlice";
import { CartItem, CartSliceProps } from "@/src/types/cart";
import { Box, Button } from "@mui/material";
import { Addon } from "@prisma/client";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuDetails = () => {
  const dispatch = useAppDispatch();
  const [number, setNumber] = useState(1);
  const menus = useAppSelector((item) => item.menu.item);
  const { menuAddonCategory } = useAppSelector(
    (item) => item.menuAddonCategory
  );

  const { addons } = useAppSelector((item) => item.addon);
  const router = useRouter();
  const cartSliceId = router.query.cartItemId;

  const [selectedAddon, setSelectedAddon] = useState<Addon[]>([]);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const { item } = useAppSelector((item) => item.cart);
  const vaildCart = item.find((item) => item.id === cartSliceId);

  const menuId = Number(router.query.id);
  const tableId = Number(router.query.tableId);
  const vaildMenu = menus.find((item) => item.id === menuId);
  const addonCategories = useAppSelector(
    (item) => item.addonCategory.addonCategories
  ).filter((items) => addonCategoryIds.includes(items.id));
  useEffect(() => {
    const requireAddonCategory = addonCategories.filter(
      (item) => item.isRequired
    ).length;

    const selectedRequireAddonCategory = selectedAddon.filter((item) => {
      const addonCategory = addonCategories.find(
        (items) => items.id === item.id
      );
      return addonCategory?.isRequired ? true : false;
    }).length;

    const disable = requireAddonCategory !== selectedRequireAddonCategory;
    setIsDisable(disable);
  }, [selectedAddon, addonCategories]);

  useEffect(() => {
    if (vaildCart) {
      setSelectedAddon(vaildCart.addon);
    }
  }, [vaildCart]);
  const addonCategoryIds = menuAddonCategory
    .filter((items) => items.menuId === menuId)
    .map((item) => item.addonCategoryId);

  const decrease = () => {
    let value = number - 1 === 0 ? 1 : number - 1;
    setNumber(value);
  };
  const increase = () => {
    let value = number + 1;
    setNumber(value);
  };
  if (!vaildMenu) return null;

  const handleCreateNewCart = () => {
    const newCart: CartItem = {
      id: cartSliceId ? String(cartSliceId) : nanoid(7),
      menu: vaildMenu,
      addon: selectedAddon,
      quantity: number,
    };
    dispatch(addToCart(newCart));
    router.push(`/order?tableId=${tableId}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <ShowAddonCategory
        addonCategory={addonCategories}
        selectedAddon={selectedAddon}
        setSelectedAddon={setSelectedAddon}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <QuantityCounter
          decrease={decrease}
          increase={increase}
          number={number}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Button
          disabled={isDisable}
          variant="contained"
          onClick={() => handleCreateNewCart()}
        >
          {vaildCart ? "Update" : "Add to cart"}
        </Button>
      </Box>
    </Box>
  );
};

export default MenuDetails;
