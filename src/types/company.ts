import { Company } from "@prisma/client";

export interface companySliceProps{
    company: Company | null
    isLoading:boolean
    error: Error | null
}