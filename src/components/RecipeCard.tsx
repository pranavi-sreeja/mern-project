import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Users, Edit, Trash2 } from 'lucide-react';
import { Recipe } from '../contexts/RecipeContext';
import { useAuth } from '../contexts/AuthContext';
import { useRecipes } from '../contexts/RecipeContext';

interface RecipeCardProps {
  recipe: Recipe;
  onDelete?: (id: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onDelete }) => {
  const { currentUser } = useAuth();
  const { favorites, toggleFavorite } = useRecipes();

  const isFavorite = favorites.includes(recipe.id);
  const isOwner = currentUser?.id === recipe.authorId;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentUser) {
      toggleFavorite(recipe.id);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onDelete && window.confirm('Are you sure you want to delete this recipe?')) {
      onDelete(recipe.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/recipe/${recipe.id}`} className="block">
        <div className="relative">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 flex space-x-2">
            {currentUser && (
              <button
                onClick={handleFavoriteClick}
                className={`p-2 rounded-full ${
                  isFavorite
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                } transition-colors duration-200`}
              >
                <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            )}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
            {recipe.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {recipe.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.cookingTime} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} servings</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {recipe.difficulty}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">by {recipe.authorName}</p>
              <p className="text-xs text-gray-400">{recipe.category}</p>
            </div>
            
            {isOwner && (
              <div className="flex space-x-2">
                <Link
                  to={`/edit-recipe/${recipe.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                >
                  <Edit className="h-4 w-4" />
                </Link>
                <button
                  onClick={handleDeleteClick}
                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;