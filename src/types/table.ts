import { Table } from "@prisma/client";
import { BaseOption } from "./menu";

export interface TableProps{
    tables: Table[],
    isLoading: boolean,
    error: null | Error
}

export interface CreateTable extends  BaseOption{
    name: string
    locationId: number | undefined
    assetUrl: string
}

export interface UpdateTable extends Table, BaseOption{}

export interface DeleteTable extends BaseOption{
    id: number
}