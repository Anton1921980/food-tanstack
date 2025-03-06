import { useState, useCallback } from 'react';
import { Recipe, Ingredient } from '../types/recipe';


export const useSelectedRecipes = () => {
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);

  // Add a recipe to the selected list
  const addRecipe = useCallback((recipe: Recipe) => {
    setSelectedRecipes(prev => {
      // Check if recipe is already in the list
      if (prev.some(r => r.idMeal === recipe.idMeal)) {
        return prev; // Recipe already exists, don't add it again
      }
      return [...prev, recipe];
    });
  }, []);

  // Remove a recipe from the selected list
  const removeRecipe = useCallback((recipeId: string) => {
    setSelectedRecipes(prev => prev.filter(recipe => recipe.idMeal !== recipeId));
  }, []);

  // Check if a recipe is selected
  const isSelected = useCallback(
    (recipeId: string) => selectedRecipes.some(recipe => recipe.idMeal === recipeId),
    [selectedRecipes]
  );

  // Toggle a recipe selection
  const toggleRecipe = useCallback(
    (recipe: Recipe) => {
      if (isSelected(recipe.idMeal)) {
        removeRecipe(recipe.idMeal);
      } else {
        addRecipe(recipe);
      }
    },
    [isSelected, removeRecipe, addRecipe]
  );

  // Clear all selected recipes
  const clearSelectedRecipes = useCallback(() => {
    setSelectedRecipes([]);
  }, []);

  // Get combined ingredients from all selected recipes
  const getCombinedIngredients = useCallback(() => {
    // Create a map to store combined ingredients
    const ingredientMap = new Map<string, { ingredient: Ingredient, recipeName: string }[]>();

    // Process each recipe's ingredients
    selectedRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        const key = ingredient.name.toLowerCase().trim();
        if (!ingredientMap.has(key)) {
          ingredientMap.set(key, []);
        }
        ingredientMap.get(key)?.push({ 
          ingredient, 
          recipeName: recipe.strMeal 
        });
      });
    });

    // Convert the map to an array of combined ingredients
    return Array.from(ingredientMap.entries()).map(([name, items]) => {
      return {
        name: name,
        // Create the image URL for the ingredient
        imageUrl: `https://www.themealdb.com/images/ingredients/${name.replace(/ /g, '_')}.png`,
        measures: items.map(item => `${item.ingredient.measure} (${item.recipeName})`)
      };
    });
  }, [selectedRecipes]);

  return {
    selectedRecipes,
    addRecipe,
    removeRecipe,
    isSelected,
    toggleRecipe,
    clearSelectedRecipes,
    getCombinedIngredients,
  };
};
