import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

type TimerMode = 'work' | 'break';

function App() {
  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const totalTime = mode === 'work' ? WORK_TIME : BREAK_TIME;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGWi78OScTgwNUKzn77hkGgU7k9nzzn0pBSh+zPDdi0MKElyx7O6qWhELSpvh8sFuIwUpgc7y2Yk2CBlou/DknE4MDVCs5++4ZBoFO5PZ887+KAUofszw3YtDChJcsezuqlkRC0qb4fLBbiMFKYHO8tmJNggZaLvw5JxODA1QrOfvuGQaBTuT2fPO/igFKH7M8N2LQwoSXLHs7qpZEQtKm+HywW4jBSmBzvLZiTYIGWi78OScTgwNUKzn77hkGgU7k9nzzn0pBSh+zPDdi0MKElyx7O6qWhELSpvh8sFuIwUpgc7y2Yk2CBlou/DknE4MDVCs5++4ZBoFO5PZ887+KAUofszw3YtDChJcsezuqlkRC0qb4fLBbiMFKYHO8tmJNggZaLvw5JxODA1QrOfvuGQaBTuT2fPO/igFKH7M8N2LQwoSXLHs7qpZEQtKm+HywW4jBSmBzvLZiTYIGWi78OScTgwNUKzn77hkGgU7k9nzzn0pBSh+zPDdi0MKElyx7O6qWhELSpvh8sFuIwUpgc7y2Yk2CBlou/DknE4MDVCs5++4ZBoFO5PZ887+KAUofszw3YtDChJcsezuqlkRC0qb4fLBbiMFKYHO8tmJNggZaLvw5JxODA1QrOfvuGQaBTuT2fPO/igFKH7M8N2LQwoSXLHs7qpZEQtKm+HywW4jBSmBzvLZiTYIGWi78OScTgwNUKzn77hkGgU7k9nzzn0pBSh+zPDdi0MKElyx7O6qWhELSpvh8sFuIwUpgc7y2Yk2CBloo/DknE4MDVCs5++4ZBoFO5PZ887+KAUofszw3YtDChJcsezuqlkRC0qb4fLBbiMFKYHO8tmJNggZaLvw5JxODA1QrOfvuGQaBTuT2fPO');
      audio.play().catch(() => {});
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? WORK_TIME : BREAK_TIME);
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'work' ? WORK_TIME : BREAK_TIME);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">
          Pomodoro Timer
        </h1>

        <div className="flex gap-3 mb-8">
          <button
            onClick={() => switchMode('work')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              mode === 'work'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Work
          </button>
          <button
            onClick={() => switchMode('break')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              mode === 'break'
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Break
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <svg className="transform -rotate-90" width="320" height="320">
              <circle
                cx="160"
                cy="160"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-slate-200"
              />
              <circle
                cx="160"
                cy="160"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className={`transition-all duration-1000 ${
                  mode === 'work' ? 'text-emerald-500' : 'text-blue-500'
                }`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-slate-800 mb-2">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  {mode === 'work' ? 'Focus Time' : 'Break Time'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={toggleTimer}
            className={`p-5 rounded-full transition-all duration-300 shadow-lg ${
              mode === 'work'
                ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200'
                : 'bg-blue-500 hover:bg-blue-600 shadow-blue-200'
            } text-white`}
          >
            {isRunning ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
          </button>
          <button
            onClick={resetTimer}
            className="p-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 transition-all duration-300 shadow-lg"
          >
            <RotateCcw size={28} />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex justify-between text-sm text-slate-600">
            <div className="text-center">
              <div className="font-semibold text-slate-800">25</div>
              <div className="text-xs">Work mins</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-slate-800">5</div>
              <div className="text-xs">Break mins</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-slate-800">
                {Math.ceil(timeLeft / 60)}
              </div>
              <div className="text-xs">Remaining</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
