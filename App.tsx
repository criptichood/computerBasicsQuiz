
import React, { useState, useCallback } from 'react';
import { QuestionCard } from './components/QuestionCard';
import { Results } from './components/Results';
import { QUESTIONS } from './constants';
import { Question } from './types';

const App: React.FC = () => {
  const [questions] = useState<Question[]>(QUESTIONS);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleAnswerSelect = useCallback((questionId: number, selectedOption: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
  }, []);

  const handleSubmit = useCallback(() => {
    let currentScore = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setSubmitted(true);
  }, [answers, questions]);

  const handleRetakeQuiz = useCallback(() => {
    setAnswers({});
    setScore(0);
    setSubmitted(false);
  }, []);
  
  const allQuestionsAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-100 font-sans">
      <header className="w-full max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">
          Computer Basics <span className="text-indigo-600">Quiz</span>
        </h1>
        <p className="text-lg text-slate-600 mt-2">Test your knowledge with these 20 fundamental questions.</p>
      </header>

      <main className="w-full max-w-2xl mx-auto flex items-center justify-center">
        {!submitted ? (
          <div className="w-full space-y-8">
            <div className="space-y-6">
                {questions.map((q, index) => (
                <QuestionCard
                    key={q.id}
                    question={q}
                    selectedAnswer={answers[q.id] || null}
                    onAnswerSelect={handleAnswerSelect}
                    questionNumber={index + 1}
                    totalQuestions={questions.length}
                />
                ))}
            </div>
            <button
              onClick={handleSubmit}
              disabled={!allQuestionsAnswered}
              className={`w-full py-4 px-6 rounded-lg text-lg font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl
                ${allQuestionsAnswered 
                  ? 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer' 
                  : 'bg-slate-400 cursor-not-allowed'
                }`}
            >
              {allQuestionsAnswered ? 'Submit Answers' : 'Please answer all questions'}
            </button>
          </div>
        ) : (
          <Results score={score} totalQuestions={questions.length} onRetake={handleRetakeQuiz} />
        )}
      </main>
      <footer className="w-full max-w-4xl mx-auto mt-8 text-center text-slate-500 text-sm">
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
