import { useParams, useNavigate } from 'react-router-dom';
import { useRecipe } from '../hooks/useRecipeQueries';
import { useSelectedRecipesContext } from '../hooks/useSelectedRecipesContext';
import { RecipeDetail } from '../components/RecipeDetail';


const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Fetch recipe data
  const { data: recipe, isLoading, error } = useRecipe(id || '');

  // Get selected recipes functionality
  const { isSelected, toggleRecipe } = useSelectedRecipesContext();

  // Handle back button click
  const handleBack = () => {
    navigate(-1);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Error state
  if (error || !recipe) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Recipe Not Found</h1>
        <div className="max-w-md mx-auto bg-base-200 p-8 rounded-lg shadow-md">
          <p className="mb-6">The recipe you're looking for doesn't exist or couldn't be loaded.</p>
          <button 
            className="btn btn-primary" 
            onClick={handleBack}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button 
        className="btn btn-ghost mb-4" 
        onClick={handleBack}
      >
        &larr; Back
      </button>
      <RecipeDetail 
        recipe={recipe} 
        onAddToSelected={toggleRecipe} 
        isSelected={isSelected(recipe.idMeal)} 
      />
    </div>
  );
};

export default RecipeDetailPage;
