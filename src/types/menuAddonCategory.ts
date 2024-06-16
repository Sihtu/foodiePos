import { MenuAddonCategory } from "@prisma/client";

export interface MenuAddonCategoryProps {
    menuAddonCategory: MenuAddonCategory[]
    isLoading: boolean
    error: Error | null
}