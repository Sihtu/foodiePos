import { Addon, Menu } from "@prisma/client"

export interface CartItem{
    id: string
    menu: Menu
    addon: Addon[]
    quantity: number
}
export interface CartSliceProps{
    item: CartItem[]
    isLoading: boolean
    error: Error | null
}