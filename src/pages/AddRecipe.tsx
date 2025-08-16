import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useRecipes } from '../contexts/RecipeContext';
import { Plus, Minus, Save } from 'lucide-react';

const AddRecipe: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addRecipe } = useRecipes();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    instructions: [''],
    cookingTime: 30,
    servings: 4,
    difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard',
    category: '',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cookingTime' || name === 'servings' ? parseInt(value) || 0 : value
    }));
  };

  const handleArrayChange = (index: number, value: string, field: 'ingredients' | 'instructions') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'ingredients' | 'instructions') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index: number, field: 'ingredients' | 'instructions') => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;

    const recipe = {
      ...formData,
      ingredients: formData.ingredients.filter(ing => ing.trim() !== ''),
      instructions: formData.instructions.filter(inst => inst.trim() !== ''),
      authorId: currentUser.id,
      authorName: currentUser.name
    };

    addRecipe(recipe);
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Recipe</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Recipe Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter recipe title"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <input
                type="text"
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Italian, Dessert, Breakfast"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Describe your recipe"
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="cookingTime" className="block text-sm font-medium text-gray-700 mb-2">
                Cooking Time (minutes) *
              </label>
              <input
                type="number"
                id="cookingTime"
                name="cookingTime"
                required
                min="1"
                value={formData.cookingTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-2">
                Servings *
              </label>
              <input
                type="number"
                id="servings"
                name="servings"
                required
                min="1"
                value={formData.servings}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty *
              </label>
              <select
                id="difficulty"
                name="difficulty"
                required
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingredients *
            </label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'ingredients')}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder={`Ingredient ${index + 1}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, 'ingredients')}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  disabled={formData.ingredients.length === 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('ingredients')}
              className="flex items-center space-x-1 text-orange-600 hover:text-orange-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Ingredient</span>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructions *
            </label>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="flex items-start space-x-2 mb-2">
                <span className="bg-orange-100 text-orange-600 text-sm font-medium px-2 py-1 rounded-full mt-1">
                  {index + 1}
                </span>
                <textarea
                  value={instruction}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'instructions')}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder={`Step ${index + 1}`}
                  rows={2}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, 'instructions')}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md mt-1"
                  disabled={formData.instructions.length === 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('instructions')}
              className="flex items-center space-x-1 text-orange-600 hover:text-orange-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Step</span>
            </button>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Recipe</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;