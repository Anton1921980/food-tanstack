import axios from 'axios';
import { Recipe, RecipeResponse, CategoryResponse, RecipeApiResponse, Ingredient } from '../types/recipe';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Transform the API response to our Recipe type
const transformRecipe = (meal: RecipeApiResponse): Recipe => {
  // Extract ingredients and measures
  const ingredients: Ingredient[] = [];
  
  // Loop through all possible ingredients (1-20)
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof RecipeApiResponse;
    const measureKey = `strMeasure${i}` as keyof RecipeApiResponse;
    
    const ingredientName = meal[ingredientKey];
    const measure = meal[measureKey];
    
    // Only add if both ingredient and measure exist and are not empty
    if (ingredientName && measure && ingredientName.trim() !== '' && measure.trim() !== '') {
      ingredients.push({
        name: ingredientName,
        measure: measure,
      });
    }
  }
  
  return {
    idMeal: meal.idMeal,
    strMeal: meal.strMeal,
    strCategory: meal.strCategory,
    strArea: meal.strArea,
    strInstructions: meal.strInstructions,
    strMealThumb: meal.strMealThumb,
    strTags: meal.strTags || undefined,
    strYoutube: meal.strYoutube || undefined,
    ingredients,
  };
};

// Generate an array of letters from a to z
const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));

// API functions
export const mealApi = {
  // Search meals by name
  searchMeals: async (query: string): Promise<Recipe[]> => {
    console.log('Searching meals with query:', query);
    const response = await api.get<RecipeResponse>(`/search.php?s=${query}`);
    console.log('Search response:', response.data);
    if (!response.data.meals) return [];
    return response.data.meals.map(transformRecipe);
  },
  
  // Get meal by ID
  getMealById: async (id: string): Promise<Recipe | null> => {
    console.log('Getting meal with ID:', id);
    const response = await api.get<RecipeResponse>(`/lookup.php?i=${id}`);
    console.log('Meal details response:', response.data);
    if (!response.data.meals || response.data.meals.length === 0) return null;
    return transformRecipe(response.data.meals[0]);
  },
  
  // Get all categories
  getCategories: async () => {
    console.log('Getting all categories');
    const response = await api.get<CategoryResponse>('/categories.php');
    console.log('Categories response:', response.data);
    return response.data.categories;
  },
  
  // Get random meal
  getRandomMeal: async (): Promise<Recipe | null> => {
    console.log('Getting random meal');
    const response = await api.get<RecipeResponse>('/random.php');
    console.log('Random meal response:', response.data);
    if (!response.data.meals || response.data.meals.length === 0) return null;
    return transformRecipe(response.data.meals[0]);
  },
  
  // Get all meals by fetching from A to Z
  getAllMeals: async (): Promise<Recipe[]> => {
    console.log('Getting all meals from A to Z');
    
    // Fetch meals for each letter in parallel
    const letterMealsPromises = alphabet.map(letter => 
      api.get<RecipeResponse>(`/search.php?f=${letter}`)
        .then(response => response.data.meals || [])
    );
    
    // Wait for all requests to complete
    const letterMealsResults = await Promise.all(letterMealsPromises);
    
    // Flatten the array and transform each meal
    const allMeals = letterMealsResults.flat();
    return allMeals.map(transformRecipe);
  },
  
  // Filter meals by category (client-side)
  getMealsByCategory: async (category: string): Promise<Recipe[]> => {
    console.log('Filtering meals by category:', category);
    
    // Get all meals and filter by category
    const allMeals = await mealApi.getAllMeals();
    return allMeals.filter(meal => meal.strCategory === category);
  },
};
