
import { createStore } from "@/lib/createStore";
import { mealFiltersDefaultValues, MealFiltersSchema } from "../types/mealFilterSchema";

type State = {
  selectedMealId: number | null;
  mealDialogOpen: boolean;
  mealFilters: MealFiltersSchema;
};

type Actions = {
  updateSelectedMealId: (id: State["selectedMealId"]) => void;
  updateMealDialogOpen: (is: State["mealDialogOpen"]) => void;
  updateMealFilters: (filters: State["mealFilters"]) => void;
};

type Store = State & Actions;

const useMealsStore = createStore<Store>(
  (set) => ({
    selectedMealId: null,
    updateSelectedMealId: (id) =>
      set((state) => {
        state.selectedMealId = id;
      }),
    mealDialogOpen: false,
    updateMealDialogOpen: (is) =>
      set((state) => {
        state.mealDialogOpen = is;
      }),
    mealFilters: mealFiltersDefaultValues,
    updateMealFilters: (filters) =>
      set((state) => {
        state.mealFilters = filters;
      }),
  }),
  {
    name: "meals-store",
  }
);

export { useMealsStore };
