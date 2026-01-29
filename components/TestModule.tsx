import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface TestModuleProps {
  onComplete: () => void;
  onClose: () => void;
}

const TEST_QUESTIONS = [
  { id: 1, text: "Cuando cometo un error, siento que soy una mala persona.", category: 'Autojuicio' },
  { id: 2, text: "Siento culpa incluso cuando no he hecho nada malo objetivamente.", category: 'Culpa no adaptativa' },
  { id: 3, text: "Puedo reconocer mis errores y buscar formas de repararlos.", category: 'Responsabilidad consciente' },
  { id: 4, text: "Me critico duramente por cosas que ocurrieron hace mucho tiempo.", category: 'Autojuicio' },
  { id: 6, text: "Entiendo que equivocarme es parte de ser humano.", category: 'Humanización' },
  { id: 19, text: "Siento que merezco castigo cuando las cosas salen mal.", category: 'Autojuicio' },
  { id: 20, text: "Asumo las consecuencias de mis actos sin atacarme.", category: 'Responsabilidad consciente' },
];

export const TestModule: React.FC<TestModuleProps> = ({ onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleAnswer = (val: number) => {
    setAnswers(prev => ({ ...prev, [TEST_QUESTIONS[currentStep].id]: val }));
    if (currentStep < TEST_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 200);
    } else {
      onComplete();
    }
  };

  const progress = ((currentStep + 1) / TEST_QUESTIONS.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold font-sans">Test de Culpa</h2>
            <p className="opacity-90 text-sm">Evaluación de progreso semanal</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold">{currentStep + 1}</span>
            <span className="opacity-75">/{TEST_QUESTIONS.length}</span>
          </div>
        </div>
        
        <div className="h-2 bg-slate-100 w-full">
          <div className="h-full bg-teal-400 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>

        <div className="p-8 md:p-12">
          <h3 className="text-xl md:text-2xl text-slate-800 font-medium mb-8 text-center leading-relaxed">
            {TEST_QUESTIONS[currentStep].text}
          </h3>

          <div className="grid grid-cols-5 gap-2 md:gap-4 mb-8">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                onClick={() => handleAnswer(val)}
                className={`
                  flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200
                  ${answers[TEST_QUESTIONS[currentStep].id] === val 
                    ? 'border-teal-500 bg-teal-50 text-teal-700 scale-105 shadow-md' 
                    : 'border-slate-100 text-slate-400 hover:border-teal-200 hover:bg-slate-50'}
                `}
              >
                <span className="text-2xl font-bold mb-1">{val}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider hidden md:block">
                  {val === 1 ? 'Nunca' : val === 5 ? 'Siempre' : ''}
                </span>
              </button>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-8 text-sm text-slate-400">
            <button onClick={onClose} className="hover:text-slate-600">Cancelar</button>
            <div className="flex gap-2 text-xs">
              <span>1 = Muy en desacuerdo</span>
              <span>5 = Muy de acuerdo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};