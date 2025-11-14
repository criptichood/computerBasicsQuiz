
import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (questionId: number, selectedOption: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedAnswer, onAnswerSelect, questionNumber, totalQuestions }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 w-full">
      <p className="text-sm font-medium text-indigo-600 mb-2">Question {questionNumber} of {totalQuestions}</p>
      <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">{question.questionText}</h2>
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(question.id, option)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center text-slate-700 font-medium
                ${isSelected 
                  ? 'bg-indigo-100 border-indigo-500 ring-2 ring-indigo-300' 
                  : 'bg-slate-50 border-slate-200 hover:bg-indigo-50 hover:border-indigo-300'
                }`}
            >
              {isSelected && <CheckIcon />}
              <span className="flex-1">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
