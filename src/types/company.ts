import { Company } from "@prisma/client";
import { BaseOption } from "./menu";

export interface companySliceProps{
    company: Company | null
    isLoading:boolean
    error: Error | null
}

export interface UpdateCompany extends BaseOption, Company{

}