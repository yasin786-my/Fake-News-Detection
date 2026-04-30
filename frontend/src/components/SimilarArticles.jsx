import { motion } from 'framer-motion';
import { Search, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SimilarArticles({ articles, ragVerdict }) {
  if (!articles || articles.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="glass glass-border rounded-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          RAG Retrieved Articles
        </h3>
        <span className="ml-auto text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full font-medium">
          Knowledge Base
        </span>
      </div>

      {/* RAG Verdict */}
      {ragVerdict && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>RAG Analysis:</strong> {ragVerdict}
          </p>
        </div>
      )}

      {/* Similar Articles */}
      <div className="space-y-3">
        {articles.map((article, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-zinc-800/50"
          >
            {/* Label badge */}
            <div className={`flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${
              article.label === 'FAKE'
                ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
            }`}>
              {article.label === 'FAKE'
                ? <AlertTriangle className="w-3 h-3" />
                : <CheckCircle className="w-3 h-3" />
              }
              {article.label}
            </div>

            {/* Article text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                {article.text}
              </p>
            </div>

            {/* Similarity score */}
            <div className="flex-shrink-0 text-right">
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
                {article.similarity}%
              </div>
              <div className="text-xs text-slate-400">similar</div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-3 text-center">
        Retrieved from {articles.length} most similar articles in knowledge base
      </p>
    </motion.div>
  );
}
