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

const menuDetails = () => {
  const dispatch = useAppDispatch();
  const [number, setNumber] = useState(1);
  const menus = useAppSelector((item) => item.menu.item);
  const { menuAddonCategory } = useAppSelector(
    (item) => item.menuAddonCategory
  );

  const { addons } = useAppSelector((item) => item.addon);
  const router = useRouter();
  const cartSliceId = router.query.cartItemId;
  const { item } = useAppSelector((item) => item.cart);
  const vaildCart = item.find((item) => item.id === cartSliceId);
  useEffect(() => {
    if (vaildCart) {
      setSelectedAddon(vaildCart.addon);
    }
  }, [vaildCart]);
  const menuId = Number(router.query.id);
  const tableId = Number(router.query.tableId);
  const vaildMenu = menus.find((item) => item.id === menuId);

  const addonCategoryIds = menuAddonCategory
    .filter((items) => items.menuId === menuId)
    .map((item) => item.addonCategoryId);

  const addonCategories = useAppSelector(
    (item) => item.addonCategory.addonCategories
  ).filter((items) => addonCategoryIds.includes(items.id));

  const [selectedAddon, setSelectedAddon] = useState<Addon[]>([]);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const decrease = () => {
    let value = number - 1 === 0 ? 1 : number - 1;
    setNumber(value);
  };
  const increase = () => {
    let value = number + 1;
    setNumber(value);
  };
  if (!vaildMenu) return null;

  useEffect(() => {
    const requireAddonCategory = addonCategories.filter(
      (item) => item.isRequired
    ).length;

    const selectedRequireAddonCategory = selectedAddon.filter((item) => {
      const addonCategoryIds = item.addonCategoryId;
      const addonCategory = addonCategories.find(
        (items) => items.id === addonCategoryIds
      );
      return addonCategory?.isRequired ? true : false;
    }).length;

    const disable = requireAddonCategory !== selectedRequireAddonCategory;
    setIsDisable(disable);
  }, [selectedAddon]);

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

export default menuDetails;
