import { Recipe } from '../types/recipe';

interface RecipeDetailProps {
  recipe: Recipe;
  onAddToSelected?: (recipe: Recipe) => void;
  isSelected?: boolean;
}


export const RecipeDetail = ({ recipe, onAddToSelected, isSelected = false }: RecipeDetailProps) => {
  const handleAddToSelected = () => {
    if (onAddToSelected) onAddToSelected(recipe);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recipe image and basic info */}
        <div>
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal} 
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <div className="mt-4">
            <h1 className="text-3xl font-bold">{recipe.strMeal}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="badge badge-primary">{recipe.strCategory}</span>
              <span className="badge badge-secondary">{recipe.strArea}</span>
              {recipe.strTags && recipe.strTags.split(',').map(tag => (
                <span key={tag} className="badge badge-outline">{tag.trim()}</span>
              ))}
            </div>
            {onAddToSelected && (
              <button 
                className={`btn mt-4 ${isSelected ? 'btn-error' : 'btn-primary'}`}
                onClick={handleAddToSelected}
              >
                {isSelected ? 'Remove from Selection' : 'Add to Selection'}
              </button>
            )}
            {recipe.strYoutube && (
              <a 
                href={recipe.strYoutube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline mt-4 ml-2"
              >
                Watch on YouTube
              </a>
            )}
          </div>
        </div>

        {/* Recipe details */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-2">
                  <img 
                    src={`https://www.themealdb.com/images/ingredients/${ingredient.name.replace(/ /g, '_')}.png`} 
                    alt={ingredient.name} 
                    className="w-6 h-6 object-cover rounded-sm" 
                  />
                  <span className="font-medium">{ingredient.name}</span>: {ingredient.measure}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
            {recipe.strInstructions.split('\r\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
