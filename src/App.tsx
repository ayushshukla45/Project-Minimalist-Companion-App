import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import SkinAnalysis from './components/SkinAnalysis';
import ResultsScreen from './components/ResultsScreen';
import ProductRecommendations from './components/ProductRecommendations';
import RoutineBuilder from './components/RoutineBuilder';
import FinalRoutine from './components/FinalRoutine';

export type SkinData = {
  skinType: string;
  concerns: string[];
  age: string;
  lifestyle: string;
  currentRoutine: string;
  sensitivity: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  ingredients: string[];
  price: number;
  description: string;
  usage: string;
};

function App() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'analysis' | 'results' | 'recommendations' | 'routine' | 'final'>('welcome');
  const [skinData, setSkinData] = useState<SkinData | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleAnalysisComplete = (data: SkinData) => {
    setSkinData(data);
    setCurrentStep('results');
  };

  const handleProductsSelected = (products: Product[]) => {
    setSelectedProducts(products);
    setCurrentStep('routine');
  };

  const handleRoutineComplete = () => {
    setCurrentStep('final');
  };

  const resetApp = () => {
    setCurrentStep('welcome');
    setSkinData(null);
    setSelectedProducts([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep === 'welcome' && (
        <WelcomeScreen onStart={() => setCurrentStep('analysis')} />
      )}
      
      {currentStep === 'analysis' && (
        <SkinAnalysis onComplete={handleAnalysisComplete} />
      )}
      
      {currentStep === 'results' && skinData && (
        <ResultsScreen 
          skinData={skinData} 
          onContinue={() => setCurrentStep('recommendations')} 
        />
      )}
      
      {currentStep === 'recommendations' && skinData && (
        <ProductRecommendations 
          skinData={skinData}
          onProductsSelected={handleProductsSelected}
        />
      )}
      
      {currentStep === 'routine' && (
        <RoutineBuilder 
          selectedProducts={selectedProducts}
          onComplete={handleRoutineComplete}
        />
      )}
      
      {currentStep === 'final' && (
        <FinalRoutine 
          selectedProducts={selectedProducts}
          skinData={skinData}
          onRestart={resetApp}
        />
      )}
    </div>
  );
}

export default App;