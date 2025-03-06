import { useNavigate } from 'react-router-dom';
import { useSelectedRecipesContext } from '../hooks/useSelectedRecipesContext';
import { RecipeCard } from '../components/RecipeCard';


const SelectedRecipesPage = () => {
  const navigate = useNavigate();
  const { 
    selectedRecipes, 
    removeRecipe, 
    clearSelectedRecipes, 
    getCombinedIngredients 
  } = useSelectedRecipesContext();

  // Get combined ingredients
  const combinedIngredients = getCombinedIngredients();

  // Handle recipe click to navigate to detail page
  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipe/${recipeId}`);
  };

  // If no recipes are selected
  if (selectedRecipes.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Selected Recipes</h1>
        <div className="max-w-md mx-auto bg-base-200 p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">No recipes selected</h2>
          <p className="mb-6">Browse recipes and add them to your selection to see them here.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/')}
          >
            Browse Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Selected Recipes</h1>
        <button 
          className="btn btn-error" 
          onClick={clearSelectedRecipes}
        >
          Clear All
        </button>
      </div>

      {/* Selected recipes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recipes list */}
        <div>         
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedRecipes.map((recipe) => (
              <div key={recipe.idMeal} className="relative">
                <RecipeCard 
                  recipe={recipe} 
                  onClick={() => handleRecipeClick(recipe.idMeal)} 
                />
                <button 
                  className="btn btn-sm btn-circle btn-error absolute top-2 right-2"
                  onClick={() => removeRecipe(recipe.idMeal)}
                  aria-label="Remove recipe"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Combined ingredients */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Combined Ingredients</h2>
          <div className="bg-base-200 p-6 rounded-lg shadow-md">
            {combinedIngredients.length > 0 ? (
              <ul className="space-y-2">
                {combinedIngredients.map((item, index) => (
                  <li key={index} className="pb-2 border-b border-base-300 last:border-0">
                    <div className="flex items-center gap-2">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-6 h-6 object-cover rounded-sm" 
                      />
                      <span className="font-medium capitalize">{item.name}</span>
                    </div>
                    <ul className="ml-8 mt-1 text-sm">
                      {item.measures.map((measure, idx) => (
                        <li key={idx}>{measure}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No ingredients found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedRecipesPage;
