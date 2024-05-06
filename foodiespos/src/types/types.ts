export interface BaseOption {
    onSuccess ? : (data?:any) => void
    onError? : (data?:any) => void 
}

export interface NewMenuPram extends BaseOption{
    name : string
    price : number
}