import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function AnalysisForm({ onAnalyze, isLoading }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() && !isLoading) onAnalyze(content);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="glass glass-border rounded-2xl p-6 md:p-8 shadow-2xl">
        <label htmlFor="news-content" className="block text-sm font-semibold text-slate-300 mb-3">
          Paste News Article or Headline
        </label>

        <textarea
          id="news-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your news article here...

Example: 'The Federal Reserve announced today that interest rates will remain stable following the monthly policy meeting...'"
          rows="8"
          disabled={isLoading}
          className="w-full px-5 py-4 text-base bg-slate-900/80 border-2 border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none disabled:opacity-50 text-slate-200 placeholder-slate-600 transition-all"
        />

        <div className="flex items-center justify-between mt-3 mb-5 text-xs text-slate-600">
          <span>{content.length} characters</span>
          <span>RAG retrieves 5 most similar articles</span>
        </div>

        <motion.button
          type="submit"
          disabled={isLoading || content.trim().length < 10}
          className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-lg rounded-xl shadow-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 mx-auto min-w-[220px]"
          whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(16,185,129,0.4)' }}
          whileTap={{ scale: 0.97 }}
        >
          {isLoading ? (
            <>
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <span>Retrieving & Analyzing...</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Analyze News</span>
              <Sparkles className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}
