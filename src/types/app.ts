import { BaseOption } from "./menu";

export interface UploadAssentProps extends BaseOption {
    file: File
}

export interface FetchAppDataProps{
    tableId?: number
}