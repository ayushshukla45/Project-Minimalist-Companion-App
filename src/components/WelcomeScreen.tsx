import React from "react";
import { ArrowRight, Sparkles, Shield, Users } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-8 text-center">
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">minimalist.</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your Science-First Skincare Companion
        </p>
      </div>

      {/* Features */}
      <div className="flex-1 px-6">
        <div className="space-y-6 mb-8">
          <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Science-Backed Analysis</h3>
              <p className="text-gray-600 text-sm">
                Get personalized recommendations based on dermatological research and your unique skin profile
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Ingredient Transparency</h3>
              <p className="text-gray-600 text-sm">
                Complete ingredient disclosure with concentrations and scientific explanations for every product
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Personalized Routines</h3>
              <p className="text-gray-600 text-sm">
                Custom morning and evening routines tailored to your skin type, concerns, and lifestyle
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">2M+</div>
              <div className="text-sm text-gray-600">Happy Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">How It Works</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <span className="text-gray-700">Answer questions about your skin</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <span className="text-gray-700">Get personalized product recommendations</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <span className="text-gray-700">Build your custom skincare routine</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-6 py-6">
        <button
          onClick={onStart}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
        >
          <span>Start Your Skin Analysis</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Takes only 2 minutes • Completely free
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
