
import React from 'react';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRetake: () => void;
}

export const Results: React.FC<ResultsProps> = ({ score, totalQuestions, onRetake }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const getFeedback = () => {
    if (percentage === 100) return "Perfect Score! You're a computer whiz!";
    if (percentage >= 80) return "Excellent work! You know your stuff.";
    if (percentage >= 60) return "Good job! A little more practice and you'll be an expert.";
    if (percentage >= 40) return "Not bad! Keep learning.";
    return "Keep trying! Every expert was once a beginner.";
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-lg w-full transform transition-all duration-500 scale-100">
      <h2 className="text-3xl font-bold text-indigo-600 mb-4">Quiz Complete!</h2>
      <p className="text-lg text-slate-700 mb-6">Your final score is:</p>
      <div className="relative flex items-center justify-center h-48 w-48 mx-auto mb-6">
        <svg className="absolute w-full h-full" viewBox="0 0 36 36">
            <path
                className="text-slate-200"
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
            />
            <path
                className="text-indigo-500"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${percentage}, 100`}
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
            />
        </svg>
        <span className="text-5xl font-bold text-slate-800">{percentage}%</span>
      </div>

      <p className="text-2xl font-semibold text-slate-800 mb-2">
        {score} / {totalQuestions}
      </p>
      <p className="text-md text-slate-600 font-medium mb-8">{getFeedback()}</p>

      <button
        onClick={onRetake}
        className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Retake Quiz
      </button>
    </div>
  );
};
