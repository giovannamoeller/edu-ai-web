'use client';

import { Brain, ArrowRight, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import QuizStart from './QuizStart';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';

export default function Quiz() {
  const [quizState, setQuizState] = useState('start');
  const [quizData, setQuizData] = useState<{
      question: string;
      alternatives: string[];
      answer: number;
    }[] | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  async function startQuiz(subject: string) {
    // TODO: Implement API call to fetch quiz questions
    const mockQuizData = [
      {
        question: 'What is the capital of France?',
        alternatives: ['London', 'Berlin', 'Paris', 'Madrid'],
        answer: 2
      },
      {
        question: 'Which planet is closest to the Sun?',
        alternatives: ['Venus', 'Mercury', 'Mars', 'Earth'],
        answer: 1
      }
    ];

    setQuizData(mockQuizData);
    setQuizState('quiz');
    setCurrentQuestion(0);
    setAnswers([]);
  }

  function handleUserAnswer(answerIndex: number) {
    setAnswers([...answers, answerIndex]);
    
    if (quizData && currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizState('results');
    };
  };

  function resetQuiz() {
    setQuizState('start');
    setQuizData(null);
    setCurrentQuestion(0);
    setAnswers([]);
  }

  function renderContent() {
    switch (quizState) {
      case 'start':
        return <QuizStart onStart={startQuiz} />;
      case 'quiz':
        return (
          quizData && (
            <QuizQuestion
              question={quizData[currentQuestion]}
              questionNumber={currentQuestion + 1}
              totalQuestions={quizData.length}
              onAnswer={handleUserAnswer}
            />
          )
        );
      case 'results':
        return (
          quizData && (
            <QuizResults
              questions={quizData}
              answers={answers}
              onReset={resetQuiz}
            />
          )
        );
      default:
        return null;
    }
  }

  return (
    <div className="px-4 py-6">
      {renderContent()}
    </div>
  );
}