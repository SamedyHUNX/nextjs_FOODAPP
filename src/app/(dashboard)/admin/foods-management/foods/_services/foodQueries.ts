import { PaginatedResult } from "@/lib/types/paginatedResult";
import { FoodFiltersSchema } from "../_types/foodFilterSchema";
import { Prisma } from "../../../../../../../generated/prisma";

type FoodWithServingUnits = Prisma.FoodGetPayload<{
    include: {
        foodServingUnit: true
    }
}>

const getFoods = async (filters: FoodFiltersSchema): Promise<PaginatedResult<FoodWithServingUnits>> => {
    return {
        
    }
}