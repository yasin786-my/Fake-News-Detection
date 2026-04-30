import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2, X, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { deleteHistoryItem, clearHistory } from '../utils/storage';

export default function HistorySidebar({ history, setHistory, isOpen, onClose }) {
  const handleDelete = (id) => setHistory(deleteHistoryItem(id));
  const handleClear = () => { clearHistory(); setHistory([]); };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-slate-950 border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white" style={{ fontFamily: 'Syne' }}>History</h3>
                <span className="text-xs bg-emerald-900/50 text-emerald-400 px-2 py-0.5 rounded-full">
                  {history.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {history.length > 0 && (
                  <button onClick={handleClear} className="text-xs text-slate-500 hover:text-red-400 transition-colors px-2 py-1">
                    Clear All
                  </button>
                )}
                <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              <AnimatePresence>
                {history.length === 0 ? (
                  <div className="text-center py-16 text-slate-600">
                    <History className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No analyses yet</p>
                    <p className="text-xs mt-1">Your history will appear here</p>
                  </div>
                ) : (
                  history.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="group p-4 glass glass-border rounded-xl hover:border-white/20 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {item.verdict === 'real'
                            ? <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            : <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          }
                          <div className="flex-1 min-w-0">
                            <span className={`text-xs font-bold ${item.verdict === 'real' ? 'text-emerald-400' : 'text-red-400'}`}>
                              {item.verdict === 'real' ? 'REAL' : 'FAKE'} • {item.confidence}%
                            </span>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                              {item.content}
                            </p>
                            <div className="flex items-center gap-1 mt-2 text-slate-600">
                              <Clock className="w-3 h-3" />
                              <span className="text-xs">
                                {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-900/30 text-slate-600 hover:text-red-400 transition-all flex-shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
