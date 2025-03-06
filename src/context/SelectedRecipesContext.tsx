import { createContext,  ReactNode } from 'react';
import { useSelectedRecipes } from '../hooks/useSelectedRecipes';

// Define the context type
export type SelectedRecipesContextType = ReturnType<typeof useSelectedRecipes>;

// Create the context with a default value
export const SelectedRecipesContext = createContext<SelectedRecipesContextType | undefined>(undefined);

// Provider component
export const SelectedRecipesProvider = ({ children }: { children: ReactNode }) => {
  const selectedRecipesUtils = useSelectedRecipes();

  return (
    <SelectedRecipesContext.Provider value={selectedRecipesUtils}>
      {children}
    </SelectedRecipesContext.Provider>
  );
};
