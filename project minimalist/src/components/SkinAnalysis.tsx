import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SkinData } from '../App';

interface SkinAnalysisProps {
  onComplete: (data: SkinData) => void;
}

const questions = [
  {
    id: 'skinType',
    title: 'What best describes your skin type?',
    options: [
      { value: 'oily', label: 'Oily', description: 'Shiny, enlarged pores, frequent breakouts' },
      { value: 'dry', label: 'Dry', description: 'Tight feeling, flaky, rough texture' },
      { value: 'combination', label: 'Combination', description: 'Oily T-zone, normal to dry cheeks' },
      { value: 'normal', label: 'Normal', description: 'Balanced, minimal issues' },
      { value: 'sensitive', label: 'Sensitive', description: 'Easily irritated, reactive to products' }
    ]
  },
  {
    id: 'concerns',
    title: 'What are your main skin concerns?',
    multiple: true,
    options: [
      { value: 'acne', label: 'Acne & Breakouts' },
      { value: 'aging', label: 'Anti-aging' },
      { value: 'pigmentation', label: 'Dark spots & Pigmentation' },
      { value: 'dullness', label: 'Dullness & Uneven tone' },
      { value: 'pores', label: 'Large pores' },
      { value: 'dryness', label: 'Dryness & Dehydration' }
    ]
  },
  {
    id: 'age',
    title: 'What\'s your age group?',
    options: [
      { value: '18-21', label: '18-21 years' },
      { value: '22-25', label: '22-25 years' },
      { value: '26-30', label: '26-30 years' },
      { value: '30+', label: '30+ years' }
    ]
  },
  {
    id: 'lifestyle',
    title: 'Which describes your lifestyle?',
    options: [
      { value: 'active', label: 'Very Active', description: 'Regular workouts, outdoor activities' },
      { value: 'moderate', label: 'Moderately Active', description: 'Some exercise, mixed indoor/outdoor' },
      { value: 'sedentary', label: 'Mostly Indoors', description: 'Office work, limited outdoor time' },
      { value: 'variable', label: 'Variable', description: 'Changes frequently' }
    ]
  },
  {
    id: 'currentRoutine',
    title: 'Current skincare routine?',
    options: [
      { value: 'minimal', label: 'Minimal', description: 'Just cleanser or moisturizer' },
      { value: 'basic', label: 'Basic', description: 'Cleanser, moisturizer, sunscreen' },
      { value: 'extensive', label: 'Extensive', description: 'Multi-step routine with actives' },
      { value: 'none', label: 'None', description: 'No regular routine' }
    ]
  },
  {
    id: 'sensitivity',
    title: 'How sensitive is your skin?',
    options: [
      { value: 'high', label: 'Highly Sensitive', description: 'Reacts to most new products' },
      { value: 'moderate', label: 'Moderately Sensitive', description: 'Occasional reactions' },
      { value: 'low', label: 'Low Sensitivity', description: 'Rarely reacts to products' },
      { value: 'none', label: 'Not Sensitive', description: 'Can use most products without issues' }
    ]
  }
];

const SkinAnalysis: React.FC<SkinAnalysisProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<SkinData>>({});

  const handleAnswer = (questionId: string, value: string) => {
    const question = questions[currentQuestion];
    
    if (question.multiple) {
      const currentAnswers = (answers[questionId as keyof SkinData] as string[]) || [];
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter(a => a !== value)
        : [...currentAnswers, value];
      
      setAnswers(prev => ({ ...prev, [questionId]: newAnswers }));
    } else {
      setAnswers(prev => ({ ...prev, [questionId]: value }));
    }
  };

  const canProceed = () => {
    const question = questions[currentQuestion];
    const answer = answers[question.id as keyof SkinData];
    
    if (question.multiple) {
      return Array.isArray(answer) && answer.length > 0;
    }
    return answer !== undefined;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(answers as SkinData);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="p-2 disabled:opacity-30"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-sm text-gray-500">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-black h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
          {question.title}
        </h2>

        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = question.multiple
              ? ((answers[question.id as keyof SkinData] as string[]) || []).includes(option.value)
              : answers[question.id as keyof SkinData] === option.value;

            return (
              <button
                key={option.value}
                onClick={() => handleAnswer(question.id, option.value)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900 mb-1">
                  {option.label}
                </div>
                {option.description && (
                  <div className="text-sm text-gray-600">
                    {option.description}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Next Button */}
      <div className="px-6 py-6">
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
        >
          <span>{currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SkinAnalysis;