import React, { useState } from 'react';
import { ArrowRight, Plus, Check, Beaker } from 'lucide-react';
import { SkinData, Product } from '../App';

interface ProductRecommendationsProps {
  skinData: SkinData;
  onProductsSelected: (products: Product[]) => void;
}

const getRecommendedProducts = (skinData: SkinData): Product[] => {
  const baseProducts: Product[] = [
    {
      id: 'cleanser-1',
      name: 'Salicylic Acid Cleanser',
      category: 'Cleanser',
      ingredients: ['Salicylic Acid 2%', 'Sodium Hyaluronate'],
      price: 299,
      description: 'Gentle daily cleanser that unclogs pores and removes excess oil',
      usage: 'AM & PM'
    },
    {
      id: 'serum-1',
      name: 'Niacinamide Serum 10%',
      category: 'Serum',
      ingredients: ['Niacinamide 10%', 'Zinc PCA'],
      price: 449,
      description: 'Controls oil production and minimizes pore appearance',
      usage: 'AM & PM'
    },
    {
      id: 'moisturizer-1',
      name: 'Lightweight Moisturizer',
      category: 'Moisturizer',
      ingredients: ['Hyaluronic Acid', 'Ceramides', 'Glycerin'],
      price: 349,
      description: 'Non-comedogenic moisturizer for balanced hydration',
      usage: 'AM & PM'
    },
    {
      id: 'sunscreen-1',
      name: 'SPF 50 Sunscreen',
      category: 'Sunscreen',
      ingredients: ['Zinc Oxide', 'Titanium Dioxide'],
      price: 399,
      description: 'Broad-spectrum protection without white cast',
      usage: 'AM'
    }
  ];

  // Add concern-specific products
  const concernProducts: Product[] = [];

  if (skinData.concerns.includes('acne')) {
    concernProducts.push({
      id: 'treatment-1',
      name: 'Salicylic Acid Serum 2%',
      category: 'Treatment',
      ingredients: ['Salicylic Acid 2%', 'Niacinamide'],
      price: 499,
      description: 'Targeted treatment for active breakouts',
      usage: 'PM (alternate nights)'
    });
  }

  if (skinData.concerns.includes('aging')) {
    concernProducts.push({
      id: 'serum-2',
      name: 'Retinol Serum 0.5%',
      category: 'Serum',
      ingredients: ['Retinol 0.5%', 'Squalane', 'Vitamin E'],
      price: 699,
      description: 'Anti-aging serum for fine lines and texture',
      usage: 'PM (start 2x/week)'
    });
  }

  if (skinData.concerns.includes('pigmentation')) {
    concernProducts.push({
      id: 'serum-3',
      name: 'Vitamin C Serum 15%',
      category: 'Serum',
      ingredients: ['L-Ascorbic Acid 15%', 'Vitamin E', 'Ferulic Acid'],
      price: 599,
      description: 'Brightening serum for dark spots and uneven tone',
      usage: 'AM'
    });
  }

  return [...baseProducts, ...concernProducts];
};

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ 
  skinData, 
  onProductsSelected 
}) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const recommendedProducts = getRecommendedProducts(skinData);

  const handleProductToggle = (product: Product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.some(p => p.id === product.id);
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isSelected = (productId: string) => {
    return selectedProducts.some(p => p.id === productId);
  };

  const totalPrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Recommended for You
        </h1>
        <p className="text-gray-600">
          Science-backed products tailored to your {skinData.skinType} skin
        </p>
      </div>

      {/* Products */}
      <div className="flex-1 px-6 py-6">
        <div className="space-y-4">
          {recommendedProducts.map((product) => (
            <div
              key={product.id}
              className={`border-2 rounded-xl p-4 transition-all ${
                isSelected(product.id)
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full font-medium">
                      {product.category}
                    </span>
                    <span className="text-xs text-gray-500">{product.usage}</span>
                  </div>
                  <h3 className="font-bold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                </div>
                <button
                  onClick={() => handleProductToggle(product)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ml-4 ${
                    isSelected(product.id)
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300'
                  }`}
                >
                  {isSelected(product.id) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Ingredients */}
              <div className="flex items-center space-x-2 mb-3">
                <Beaker className="w-4 h-4 text-gray-500" />
                <div className="flex flex-wrap gap-1">
                  {product.ingredients.slice(0, 2).map((ingredient, index) => (
                    <span key={index} className="text-xs text-gray-600">
                      {ingredient}{index < Math.min(product.ingredients.length, 2) - 1 ? ',' : ''}
                    </span>
                  ))}
                  {product.ingredients.length > 2 && (
                    <span className="text-xs text-gray-500">
                      +{product.ingredients.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">₹{product.price}</span>
                <span className="text-sm text-gray-500">30ml</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary & Continue */}
      {selectedProducts.length > 0 && (
        <div className="px-6 py-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm text-gray-600">
                {selectedProducts.length} products selected
              </span>
              <div className="font-bold text-xl">₹{totalPrice}</div>
            </div>
          </div>
          
          <button
            onClick={() => onProductsSelected(selectedProducts)}
            className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
          >
            <span>Build Your Routine</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {selectedProducts.length === 0 && (
        <div className="px-6 py-6">
          <p className="text-center text-gray-500 mb-4">
            Select products to continue building your routine
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductRecommendations;