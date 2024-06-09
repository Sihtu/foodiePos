import { DisabledLocationMenuCategory, MenuCategoryMenu } from "@prisma/client";
import { BaseOption } from "./menu";

export interface CreateMenuCatagory extends BaseOption {
  name: string;
  isAvailable: boolean;
  companyId?: number;
}
export interface UpdateMenuCatagoryPayload extends BaseOption {
  id: number;
  name: string;
  isAvailable: boolean;
  locationId?: number;
}

export interface MenuCategoryMenuSlice {
  menuCategoryMenu: MenuCategoryMenu[];
  isLoading: boolean;
  error: Error | null;
}

export interface RemoveMenuCategorySlice extends BaseOption {
  id: number;
}

export interface DisableLocationMenuCategorySlice {
  disableLocationMenuCategories: DisabledLocationMenuCategory[];
  isLoading: boolean;
  error: null | Error;
}
