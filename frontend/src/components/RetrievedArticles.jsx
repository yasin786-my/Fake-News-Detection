import { motion } from 'framer-motion';
import { Link2, CheckCircle, XCircle } from 'lucide-react';

export default function RetrievedArticles({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="glass glass-border rounded-xl p-6"
    >
      <h3 className="text-base font-semibold mb-4 text-slate-200 flex items-center gap-2" style={{ fontFamily: 'Syne' }}>
        <Link2 className="w-4 h-4 text-emerald-400" />
        Retrieved Similar Articles (RAG)
      </h3>
      <p className="text-xs text-slate-500 mb-4">
        These are the most semantically similar articles found in our knowledge base used for prediction:
      </p>
      <div className="space-y-3">
        {articles.map((article, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800"
          >
            {article.label === 'REAL' ? (
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                  article.label === 'REAL'
                    ? 'bg-emerald-900/50 text-emerald-400'
                    : 'bg-red-900/50 text-red-400'
                }`}>
                  {article.label}
                </span>
                <span className="text-xs text-slate-500">
                  {article.similarity}% similarity
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                {article.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
