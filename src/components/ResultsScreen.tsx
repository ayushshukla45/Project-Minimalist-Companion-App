import React from 'react';
import { ArrowRight, CheckCircle, Info } from 'lucide-react';
import { SkinData } from '../App';

interface ResultsScreenProps {
  skinData: SkinData;
  onContinue: () => void;
}

const getSkinTypeDescription = (skinType: string) => {
  const descriptions = {
    oily: {
      title: 'Oily Skin',
      description: 'Your skin produces excess sebum, leading to shine and enlarged pores.',
      tips: ['Use gentle, non-comedogenic products', 'Include salicylic acid for pore care', 'Don\'t skip moisturizer']
    },
    dry: {
      title: 'Dry Skin',
      description: 'Your skin lacks moisture and may feel tight or appear flaky.',
      tips: ['Focus on hydrating ingredients', 'Use cream-based moisturizers', 'Avoid harsh cleansers']
    },
    combination: {
      title: 'Combination Skin',
      description: 'Your T-zone is oily while other areas are normal to dry.',
      tips: ['Use different products for different areas', 'Balance oil control and hydration', 'Gentle exfoliation']
    },
    normal: {
      title: 'Normal Skin',
      description: 'Your skin is well-balanced with minimal concerns.',
      tips: ['Maintain with gentle, consistent routine', 'Focus on prevention', 'Use antioxidants']
    },
    sensitive: {
      title: 'Sensitive Skin',
      description: 'Your skin reacts easily to products and environmental factors.',
      tips: ['Patch test new products', 'Use fragrance-free formulas', 'Introduce actives slowly']
    }
  };

  return descriptions[skinType as keyof typeof descriptions] || descriptions.normal;
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({ skinData, onContinue }) => {
  const skinTypeInfo = getSkinTypeDescription(skinData.skinType);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analysis Complete!</h1>
        <p className="text-gray-600">Here's what we discovered about your skin</p>
      </div>

      {/* Results */}
      <div className="flex-1 px-6">
        {/* Skin Type */}
        <div className="bg-blue-50 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Your Skin Type: {skinTypeInfo.title}
          </h2>
          <p className="text-gray-700 mb-4">{skinTypeInfo.description}</p>
          
          <div className="space-y-2">
            {skinTypeInfo.tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Concerns */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-3">Primary Concerns</h3>
          <div className="flex flex-wrap gap-2">
            {skinData.concerns.map((concern) => (
              <span
                key={concern}
                className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border"
              >
                {concern.charAt(0).toUpperCase() + concern.slice(1)}
              </span>
            ))}
          </div>
        </div>

        {/* Profile Summary */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-gray-600">Age Group</span>
            <span className="font-medium">{skinData.age} years</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-gray-600">Lifestyle</span>
            <span className="font-medium capitalize">{skinData.lifestyle}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-gray-600">Current Routine</span>
            <span className="font-medium capitalize">{skinData.currentRoutine}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-gray-600">Sensitivity Level</span>
            <span className="font-medium capitalize">{skinData.sensitivity}</span>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="px-6 py-6">
        <button
          onClick={onContinue}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
        >
          <span>Get Personalized Products</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;