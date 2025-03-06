import { useState } from 'react';
import { Recipe } from '../types/recipe';
import { useLocation } from 'react-router-dom';

interface RecipeCardProps {
  recipe: Recipe;
  isSelected?: boolean;
  onToggleSelect?: (recipe: Recipe) => void;
  onClick?: (recipe: Recipe) => void;
}


export const RecipeCard = ({ recipe, isSelected = false, onToggleSelect, onClick }: RecipeCardProps) => {
  const [showFullInstructions, setShowFullInstructions] = useState(false);
  const location = useLocation();
  
  // Only show instructions on the selected recipes page
  const showInstructions = location.pathname === '/selected';
  
  const handleClick = () => {
    if (onClick) onClick(recipe);
  };

  const handleToggleSelect = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when toggling selection
    if (onToggleSelect) onToggleSelect(recipe);
  };
  
  const handleInstructionsClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when toggling instructions
    setShowFullInstructions(!showFullInstructions);
  };
  
  // Truncate instructions to 50 characters
  const truncatedInstructions = recipe.strInstructions.slice(0, 50) + (recipe.strInstructions.length > 50 ? '...' : '');

  return (
    <div 
      className={`card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer ${isSelected ? 'ring-2 ring-primary' : ''}`}
      onClick={handleClick}
    >
      <figure className="relative">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          className="w-full h-48 object-cover"
        />
        {onToggleSelect && (
          <button 
            className={`absolute top-2 right-2 btn btn-circle btn-sm ${isSelected ? 'btn-primary' : 'btn-ghost bg-base-100/80'}`}
            onClick={handleToggleSelect}
            aria-label={isSelected ? 'Remove from selection' : 'Add to selection'}
          >
            {isSelected ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
          </button>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{recipe.strMeal}</h2>
        <div className="flex flex-wrap gap-2">
          <span className="badge badge-primary">{recipe.strCategory}</span>
          <span className="badge badge-secondary">{recipe.strArea}</span>
        </div>
        
        {showInstructions && (
          <div className="mt-2">
            <div className="text-sm font-medium">Instructions:</div>
            <p className="text-sm">
              {showFullInstructions ? recipe.strInstructions : truncatedInstructions}
              <button 
                className="text-primary ml-1 font-medium"
                onClick={handleInstructionsClick}
              >
                {showFullInstructions ? 'Show less' : 'Show more'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
