import { Addon } from "@prisma/client";
import { BaseOption } from "./menu";

export interface AddonProps {
  addons: Addon[];
  isLoading: boolean;
  error: Error | null;
}

export interface CreateAddon extends BaseOption {
    name: string
    price: number
    addonCategoryId: number | undefined
}

export interface UpdateAddon extends BaseOption, Addon {}
