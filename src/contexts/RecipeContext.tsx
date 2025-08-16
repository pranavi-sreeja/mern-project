import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

interface RecipeContextType {
  recipes: Recipe[];
  favorites: string[];
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt'>) => void;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
  toggleFavorite: (recipeId: string) => void;
  getRecipeById: (id: string) => Recipe | undefined;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    } else {
      // Initialize with sample recipes
      const sampleRecipes: Recipe[] = [
        {
          id: '1',
          title: 'Classic Margherita Pizza',
          description: 'A traditional Italian pizza with fresh tomatoes, mozzarella, and basil.',
          ingredients: [
            '1 pizza dough',
            '1/2 cup tomato sauce',
            '8 oz fresh mozzarella',
            'Fresh basil leaves',
            '2 tbsp olive oil',
            'Salt and pepper'
          ],
          instructions: [
            'Preheat oven to 475°F (245°C)',
            'Roll out pizza dough on floured surface',
            'Spread tomato sauce evenly',
            'Add torn mozzarella pieces',
            'Bake for 12-15 minutes until crust is golden',
            'Top with fresh basil and drizzle with olive oil'
          ],
          cookingTime: 25,
          servings: 4,
          difficulty: 'Easy',
          category: 'Italian',
          imageUrl: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
          authorId: 'sample',
          authorName: 'Chef Mario',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Chocolate Chip Cookies',
          description: 'Soft and chewy chocolate chip cookies that melt in your mouth.',
          ingredients: [
            '2 1/4 cups all-purpose flour',
            '1 tsp baking soda',
            '1 tsp salt',
            '1 cup butter, softened',
            '3/4 cup granulated sugar',
            '3/4 cup brown sugar',
            '2 large eggs',
            '2 tsp vanilla extract',
            '2 cups chocolate chips'
          ],
          instructions: [
            'Preheat oven to 375°F (190°C)',
            'Mix flour, baking soda, and salt in a bowl',
            'Cream together butter and sugars',
            'Beat in eggs and vanilla',
            'Gradually add flour mixture',
            'Stir in chocolate chips',
            'Drop rounded tablespoons onto baking sheet',
            'Bake 9-11 minutes until golden brown'
          ],
          cookingTime: 30,
          servings: 36,
          difficulty: 'Easy',
          category: 'Dessert',
          imageUrl: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg',
          authorId: 'sample',
          authorName: 'Baker Jane',
          createdAt: new Date().toISOString()
        }
      ];
      setRecipes(sampleRecipes);
      localStorage.setItem('recipes', JSON.stringify(sampleRecipes));
    }

    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addRecipe = (recipeData: Omit<Recipe, 'id' | 'createdAt'>) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  const updateRecipe = (id: string, updatedData: Partial<Recipe>) => {
    const updatedRecipes = recipes.map(recipe =>
      recipe.id === id ? { ...recipe, ...updatedData } : recipe
    );
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  const deleteRecipe = (id: string) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  const toggleFavorite = (recipeId: string) => {
    const updatedFavorites = favorites.includes(recipeId)
      ? favorites.filter(id => id !== recipeId)
      : [...favorites, recipeId];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const getRecipeById = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  const value = {
    recipes,
    favorites,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    toggleFavorite,
    getRecipeById
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
};