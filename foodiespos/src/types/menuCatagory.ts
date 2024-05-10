import { BaseOption } from "./types"

export interface MenuCatagory{
    id: number
    name: string
    isAvailable: boolean
}

export interface CreateMenuCatagory extends BaseOption{
    name: string
    isAvailable: boolean
}