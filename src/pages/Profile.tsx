import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRecipes } from '../contexts/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import { User, ChefHat, Heart } from 'lucide-react';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const { recipes, favorites, deleteRecipe } = useRecipes();

  if (!currentUser) return null;

  const userRecipes = recipes.filter(recipe => recipe.authorId === currentUser.id);
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center space-x-6">
          <div className="bg-orange-100 p-4 rounded-full">
            <User className="h-12 w-12 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{currentUser.name}</h1>
            <p className="text-gray-600">{currentUser.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <ChefHat className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{userRecipes.length}</div>
            <div className="text-sm text-gray-600">Recipes Created</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{favoriteRecipes.length}</div>
            <div className="text-sm text-gray-600">Favorite Recipes</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <User className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {new Date(currentUser.id).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-600">Member Since</div>
          </div>
        </div>
      </div>

      {/* My Recipes */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Recipes</h2>
        {userRecipes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <ChefHat className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">No recipes yet</h3>
            <p className="text-gray-400 mb-6">Share your culinary creations with the world!</p>
            <a
              href="/add-recipe"
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors duration-200"
            >
              Add Your First Recipe
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onDelete={deleteRecipe}
              />
            ))}
          </div>
        )}
      </div>

      {/* Favorite Recipes */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Favorite Recipes</h2>
        {favoriteRecipes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">No favorites yet</h3>
            <p className="text-gray-400">Start exploring and save recipes you love!</p>
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
    </div>
  );
};

export default Profile;