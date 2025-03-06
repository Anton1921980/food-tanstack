import { useContext } from 'react';
import { SelectedRecipesContext } from '../context/SelectedRecipesContext';
import { useSelectedRecipes } from './useSelectedRecipes';

// Define the context type
type SelectedRecipesContextType = ReturnType<typeof useSelectedRecipes>;

// Custom hook to use the context
export const useSelectedRecipesContext = (): SelectedRecipesContextType => {
  const context = useContext(SelectedRecipesContext);
  if (context === undefined) {
    throw new Error('useSelectedRecipesContext must be used within a SelectedRecipesProvider');
  }
  return context;
};
