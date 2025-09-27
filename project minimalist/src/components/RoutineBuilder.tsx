import React, { useState } from 'react';
import { ArrowRight, Sun, Moon, Clock } from 'lucide-react';
import { Product } from '../App';

interface RoutineBuilderProps {
  selectedProducts: Product[];
  onComplete: () => void;
}

const RoutineBuilder: React.FC<RoutineBuilderProps> = ({ selectedProducts, onComplete }) => {
  const [routine, setRoutine] = useState<{
    morning: Product[];
    evening: Product[];
  }>({
    morning: [],
    evening: []
  });

  React.useEffect(() => {
    // Auto-organize products based on usage and category
    const morning: Product[] = [];
    const evening: Product[] = [];

    selectedProducts.forEach(product => {
      if (product.usage.includes('AM')) {
        morning.push(product);
      }
      if (product.usage.includes('PM')) {
        evening.push(product);
      }
    });

    // Sort by typical routine order
    const sortOrder = ['Cleanser', 'Serum', 'Treatment', 'Moisturizer', 'Sunscreen'];
    
    morning.sort((a, b) => {
      const aIndex = sortOrder.indexOf(a.category);
      const bIndex = sortOrder.indexOf(b.category);
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    });

    evening.sort((a, b) => {
      const aIndex = sortOrder.indexOf(a.category);
      const bIndex = sortOrder.indexOf(b.category);
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    });

    setRoutine({ morning, evening });
  }, [selectedProducts]);

  const getStepNumber = (index: number) => {
    return `0${index + 1}`;
  };

  const getUsageInstructions = (product: Product) => {
    const instructions = {
      'Cleanser': 'Massage gently for 30 seconds, rinse with lukewarm water',
      'Serum': 'Apply 2-3 drops, pat gently into skin',
      'Treatment': 'Apply a thin layer to affected areas only',
      'Moisturizer': 'Apply evenly, massage until fully absorbed',
      'Sunscreen': 'Apply generously 15 minutes before sun exposure'
    };
    
    return instructions[product.category as keyof typeof instructions] || 'Apply as directed';
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Your Personalized Routine
        </h1>
        <p className="text-gray-600">
          Follow this order for optimal results
        </p>
      </div>

      {/* Routine */}
      <div className="flex-1 px-6 py-6">
        {/* Morning Routine */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Sun className="w-4 h-4 text-yellow-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Morning Routine</h2>
            <div className="flex items-center space-x-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">~5 mins</span>
            </div>
          </div>

          <div className="space-y-4">
            {routine.morning.map((product, index) => (
              <div key={`morning-${product.id}`} className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-xl">
                <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-yellow-800">
                    {getStepNumber(index)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{getUsageInstructions(product)}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    {product.ingredients[0] && (
                      <span className="text-xs text-gray-500">
                        {product.ingredients[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evening Routine */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Moon className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Evening Routine</h2>
            <div className="flex items-center space-x-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">~7 mins</span>
            </div>
          </div>

          <div className="space-y-4">
            {routine.evening.map((product, index) => (
              <div key={`evening-${product.id}`} className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-800">
                    {getStepNumber(index)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{getUsageInstructions(product)}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    {product.ingredients[0] && (
                      <span className="text-xs text-gray-500">
                        {product.ingredients[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">💡 Pro Tips</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Wait 5-10 minutes between applying different serums</li>
            <li>• Start retinol products slowly (2-3 times per week)</li>
            <li>• Always patch test new products</li>
            <li>• Be consistent for 4-6 weeks to see results</li>
          </ul>
        </div>
      </div>

      {/* Complete Button */}
      <div className="px-6 py-6">
        <button
          onClick={onComplete}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
        >
          <span>Complete Setup</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default RoutineBuilder;