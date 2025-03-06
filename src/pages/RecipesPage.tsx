import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types/recipe';
import { useRecipes, useCategories, useSearchRecipes, useFilterByCategory } from '../hooks/useRecipeQueries';
import { useSelectedRecipesContext } from '../hooks/useSelectedRecipesContext';
import { usePagination } from '../hooks/usePagination';
import { RecipeCard } from '../components/RecipeCard';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { Pagination } from '../components/Pagination';


const RecipesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch recipes data
  const { data: allRecipes = [], isLoading: isLoadingRecipes, error: recipesError } = useRecipes();
  const { data: searchResults = [], isLoading: isLoadingSearch } = useSearchRecipes(searchQuery);
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();

  // Get selected recipes functionality
  const { isSelected, toggleRecipe } = useSelectedRecipesContext();

  // Determine which recipes to display based on search query
  const displayRecipes = useMemo(() => {
    return searchQuery ? searchResults : allRecipes;
  }, [searchQuery, searchResults, allRecipes]);

  // Filter recipes by category (client-side)
  const filteredRecipes = useFilterByCategory(displayRecipes, selectedCategory);

  // Setup pagination
  const ITEMS_PER_PAGE = 12;
  const {
    currentPage,
    totalPages,
    pageNumbers,
    paginatedItems: { startIndex, endIndex },
    goToPage,
  } = usePagination({
    totalItems: filteredRecipes.length,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  // Get current page recipes
  const currentRecipes = useMemo(() => {
    return filteredRecipes.slice(startIndex, endIndex);
  }, [filteredRecipes, startIndex, endIndex]);

  // Handle recipe click to navigate to detail page
  const handleRecipeClick = (recipe: Recipe) => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle category selection
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  // Loading state
  if (isLoadingRecipes || isLoadingCategories) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Error state
  if (recipesError) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error loading recipes. Please try again later.</span>
      </div>
    );
  }

  return (
    <div>  

      {/* Search and filters */}
      <div className="mb-8">
        <div className="mb-4">
          <SearchBar onSearch={handleSearch} />
          {isLoadingSearch && (
            <div className="mt-2 text-center">
              <span className="loading loading-spinner loading-sm"></span>
              <span className="ml-2">Searching...</span>
            </div>
          )}
        </div>

        {/* Category filter */}
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelectCategory={handleCategorySelect} 
        />
      </div>

      {/* Recipe grid */}
      {currentRecipes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                isSelected={isSelected(recipe.idMeal)}
                onToggleSelect={toggleRecipe}
                onClick={handleRecipeClick}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            onPageChange={goToPage}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">No recipes found</h2>
          <p className="mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
