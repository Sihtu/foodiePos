import { AddonCategory } from "@prisma/client";
import { BaseOption } from "./menu";

export interface AddonCategoryProps {
  addonCategories: AddonCategory[];
  isLoading: boolean;
  error: Error | null;
}

export interface UpdateAddonCategory extends AddonCategory, BaseOption {
  menuId?: number[];
}

export interface CreateAddonCategory extends BaseOption {
  name: string;
  isRequired: boolean;
  menuIds: number[];
}

export interface DeleteAddonCategory extends BaseOption {
  id: number;
}
