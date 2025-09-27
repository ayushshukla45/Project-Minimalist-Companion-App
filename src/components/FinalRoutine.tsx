import React from 'react';
import { CheckCircle, Download, Share2, ShoppingBag, RotateCcw } from 'lucide-react';
import { Product, SkinData } from '../App';

interface FinalRoutineProps {
  selectedProducts: Product[];
  skinData: SkinData | null;
  onRestart: () => void;
}

const FinalRoutine: React.FC<FinalRoutineProps> = ({ 
  selectedProducts, 
  skinData, 
  onRestart 
}) => {
  const totalPrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert('Routine guide will be downloaded!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Minimalist Skincare Routine',
        text: 'Check out my personalized skincare routine from Minimalist!',
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleShop = () => {
    // In a real app, this would redirect to the shopping cart
    alert('Redirecting to shopping cart...');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Success Header */}
      <div className="px-6 py-8 text-center bg-gradient-to-b from-green-50 to-white">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Routine Ready!
        </h1>
        <p className="text-gray-600 text-lg">
          Your personalized skincare journey starts now
        </p>
      </div>

      {/* Summary */}
      <div className="flex-1 px-6">
        {/* Products Summary */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Selected Products</h2>
          <div className="space-y-3">
            {selectedProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between py-2">
                <div>
                  <div className="font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-600">{product.category}</div>
                </div>
                <div className="font-semibold">₹{product.price}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">Total</span>
              <span className="text-xl font-bold">₹{totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Skin Profile */}
        {skinData && (
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Your Skin Profile</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Type:</span>
                <div className="font-medium capitalize">{skinData.skinType}</div>
              </div>
              <div>
                <span className="text-gray-600">Age:</span>
                <div className="font-medium">{skinData.age}</div>
              </div>
              <div>
                <span className="text-gray-600">Concerns:</span>
                <div className="font-medium">{skinData.concerns.length} identified</div>
              </div>
              <div>
                <span className="text-gray-600">Sensitivity:</span>
                <div className="font-medium capitalize">{skinData.sensitivity}</div>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-yellow-50 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-3">🎯 What's Next?</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div>• Start with your basic routine for 2 weeks</div>
            <div>• Introduce actives gradually (alternate nights)</div>
            <div>• Track your progress with photos</div>
            <div>• Reassess after 6-8 weeks</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-6 space-y-3">
        <button
          onClick={handleShop}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Shop Now - ₹{totalPrice}</span>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleDownload}
            className="bg-gray-100 text-gray-900 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-gray-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
          
          <button
            onClick={handleShare}
            className="bg-gray-100 text-gray-900 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-gray-200 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        <button
          onClick={onRestart}
          className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:border-gray-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start New Analysis</span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 text-center">
        <p className="text-xs text-gray-500">
          Questions? Contact our skincare experts for personalized support
        </p>
      </div>
    </div>
  );
};

export default FinalRoutine;