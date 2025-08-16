import React from 'react';
import { useRecipes } from '../contexts/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import { Heart } from 'lucide-react';

const Favorites: React.FC = () => {
  const { recipes, favorites, deleteRecipe } = useRecipes();

  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Heart className="h-8 w-8 text-red-500" fill="currentColor" />
          <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
        </div>
        <p className="text-gray-600">Your collection of favorite recipes</p>
      </div>

      {favoriteRecipes.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">No favorites yet</h3>
          <p className="text-gray-400 mb-6">
            Start exploring recipes and add them to your favorites!
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors duration-200"
          >
            Browse Recipes
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onDelete={deleteRecipe}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;