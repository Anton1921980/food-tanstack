import { useQuery} from '@tanstack/react-query';
import { mealApi } from '../api/mealApi';
import { Recipe } from '../types/recipe';

// Query keys
export const queryKeys = {
  recipes: 'recipes',
  recipe: 'recipe',
  categories: 'categories',
  search: 'search',
  category: 'category',
};


export const useRecipes = () => {
  return useQuery({
    queryKey: [queryKeys.recipes],
    queryFn: mealApi.getAllMeals,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch a single recipe by ID
 */
export const useRecipe = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.recipe, id],
    queryFn: () => mealApi.getMealById(id),
    enabled: !!id, // Only run the query if we have an ID
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch all categories
 */
export const useCategories = () => {
  return useQuery({
    queryKey: [queryKeys.categories],
    queryFn: mealApi.getCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to search recipes by name
 */
export const useSearchRecipes = (query: string) => {
  return useQuery({
    queryKey: [queryKeys.search, query],
    queryFn: () => mealApi.searchMeals(query),
    enabled: query.length > 0, // Only run the query if we have a search term
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook to filter recipes by category (client-side)
 */
export const useFilterByCategory = (recipes: Recipe[], category: string | null) => {
  if (!category) return recipes;
  return recipes.filter(recipe => recipe.strCategory === category);
};
