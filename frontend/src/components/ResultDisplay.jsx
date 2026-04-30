import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, HelpCircle, TrendingUp, RotateCcw } from 'lucide-react';
import ConfidenceCircle from './ConfidenceCircle';
import BreakdownChart from './BreakdownChart';
import RetrievedArticles from './RetrievedArticles';

export default function ResultDisplay({ result, onReset }) {
  const getConfig = () => {
    if (result.verdict === 'real') return {
      icon: CheckCircle,
      color: 'text-emerald-400',
      bg: 'from-emerald-950/50 to-teal-950/50',
      border: 'border-emerald-800/50',
      glow: 'glow-green',
      title: 'Likely REAL News',
      subtitle: 'RAG analysis found strong similarity with verified articles',
      dot: 'bg-emerald-400',
    };
    if (result.verdict === 'fake') return {
      icon: AlertTriangle,
      color: 'text-red-400',
      bg: 'from-red-950/50 to-rose-950/50',
      border: 'border-red-800/50',
      glow: 'glow-red',
      title: 'Likely FAKE News',
      subtitle: 'RAG analysis found strong similarity with misinformation patterns',
      dot: 'bg-red-400',
    };
    return {
      icon: HelpCircle,
      color: 'text-amber-400',
      bg: 'from-amber-950/50 to-yellow-950/50',
      border: 'border-amber-800/50',
      glow: '',
      title: 'Uncertain / Mixed',
      subtitle: 'RAG analysis found mixed signals in retrieved articles',
      dot: 'bg-amber-400',
    };
  };

  const cfg = getConfig();
  const VerdictIcon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-5xl mx-auto space-y-5"
    >
      {/* Verdict Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-r ${cfg.bg} border ${cfg.border} rounded-2xl p-8 ${cfg.glow}`}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-5">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <VerdictIcon className={`w-14 h-14 ${cfg.color}`} />
          </motion.div>
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center md:justify-start gap-2 mb-1"
            >
              <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              <span className="text-xs text-slate-400 uppercase tracking-widest">RAG Analysis Complete</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-4xl md:text-5xl font-bold ${cfg.color}`}
              style={{ fontFamily: 'Syne' }}
            >
              {cfg.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 mt-2"
            >
              {cfg.subtitle}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Confidence Circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="glass glass-border rounded-2xl p-8"
      >
        <ConfidenceCircle confidence={result.confidence} verdict={result.verdict} />
      </motion.div>

      {/* Key Reasons */}
      {result.reasons && result.reasons.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass glass-border rounded-xl p-6"
        >
          <h3 className="text-base font-semibold mb-4 text-slate-200 flex items-center gap-2" style={{ fontFamily: 'Syne' }}>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            RAG Analysis Findings
          </h3>
          <div className="space-y-3">
            {result.reasons.map((reason, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/50"
              >
                <span className="text-emerald-400 font-bold text-sm flex-shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-slate-300 text-sm leading-relaxed">{reason}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-5">
        {result.breakdown && <BreakdownChart breakdown={result.breakdown} />}
        {result.retrieved_articles && (
          <RetrievedArticles articles={result.retrieved_articles} />
        )}
      </div>

      {/* Reset Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="flex justify-center pt-4"
      >
        <motion.button
          onClick={onReset}
          className="px-8 py-3 glass glass-border text-slate-200 font-semibold rounded-xl flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4" />
          Analyze Another Article
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
