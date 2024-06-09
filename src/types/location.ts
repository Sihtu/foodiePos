import { Location } from "@prisma/client";
import { BaseOption } from "./menu";

export interface LocationProps {
  location: Location[];
  isLoading: boolean;
  error: Error | null;
}

export interface CreateLocation extends BaseOption{
  name: string
  city: string
  township: string
  street: string
  companyId?: number
}

export interface DeleteLocation extends BaseOption{
  id: number
}

export interface UpdateLocation extends Location , BaseOption{}