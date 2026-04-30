import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { History } from 'lucide-react';

import HeroSection from './components/HeroSection';
import AnalysisForm from './components/AnalysisForm';
import LoadingState from './components/LoadingState';
import ResultDisplay from './components/ResultDisplay';
import HistorySidebar from './components/HistorySidebar';
import HowItWorks from './components/HowItWorks';
import DarkModeToggle from './components/DarkModeToggle';
import { getHistory, saveToHistory } from './utils/storage';

const API_URL = 'http://localhost:5000';

export default function App() {
  const [phase, setPhase] = useState('input'); // 'input' | 'loading' | 'result'
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(getHistory());
  const [historyOpen, setHistoryOpen] = useState(false);

  const handleAnalyze = async (content) => {
    setPhase('loading');

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Server error');
      }

      const data = await response.json();

      const resultData = {
        verdict: data.prediction === 'REAL' ? 'real' : 'fake',
        confidence: data.confidence,
        reasons: data.reasons || [],
        breakdown: data.breakdown || {},
        retrieved_articles: data.retrieved_articles || [],
        model: data.model || 'RAG',
        content,
      };

      setResult(resultData);
      setPhase('result');

      const saved = saveToHistory(resultData);
      setHistory(saved);

      toast.success(
        data.prediction === 'REAL' ? '✅ Analysis complete — Likely REAL' : '⚠️ Analysis complete — Likely FAKE',
        { duration: 3000 }
      );
    } catch (error) {
      setPhase('input');
      if (error.message.includes('fetch') || error.message.includes('Failed')) {
        toast.error('Cannot connect to Flask server. Is it running on port 5000?', { duration: 5000 });
      } else {
        toast.error(`Error: ${error.message}`, { duration: 4000 });
      }
    }
  };

  const handleReset = () => {
    setPhase('input');
    setResult(null);
  };

  return (
    <div className="min-h-screen mesh-bg">
      <DarkModeToggle />

      {/* History Button */}
      <motion.button
        onClick={() => setHistoryOpen(true)}
        className="fixed top-5 right-16 z-40 flex items-center gap-2 px-3 py-2.5 rounded-full glass glass-border shadow-lg text-slate-300 text-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <History className="w-4 h-4 text-emerald-400" />
        <span className="hidden sm:block">History</span>
        {history.length > 0 && (
          <span className="bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {history.length}
          </span>
        )}
      </motion.button>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Always show hero when in input phase */}
        <AnimatePresence mode="wait">
          {phase === 'input' && (
            <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HeroSection />
              <AnalysisForm onAnalyze={handleAnalyze} isLoading={false} />
              <HowItWorks />
            </motion.div>
          )}

          {phase === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center justify-center min-h-[60vh]"
            >
              <LoadingState />
            </motion.div>
          )}

          {phase === 'result' && result && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ResultDisplay result={result} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-slate-700 text-xs border-t border-white/5">
        <p>Fake News Detector • RAG System • Sentence Transformers + FAISS</p>
        <p className="mt-1">Built with React + Flask • Academic Project</p>
      </footer>

      {/* History Sidebar */}
      <HistorySidebar
        history={history}
        setHistory={setHistory}
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
      />
    </div>
  );
}
