import { DisabledLocationMenu, Menu } from "@prisma/client"

export interface BaseOption {
    onSuccess ? : (data?:any) => void
    onError? : (data?:any) => void 
}

export interface NewMenuPram extends BaseOption{

    name : string
    price : number
    menuCategorIds : number[]
    assetUrl?: string
}

//for deleteMenuSlice 
export interface DeleteMenuProps extends BaseOption{
    id: number
}

export interface DisableLocationMenuPorps{
    disableLocationMenu: DisabledLocationMenu[],
    isLoading: boolean
    error: Error | null
}

export interface UpdateMenu extends Menu, BaseOption{
    locationId?: number
    isAvailable?: boolean
    menuCategoryIds?: number[]
}