import { motion } from 'framer-motion';
import { Search, Database, Brain, Shield } from 'lucide-react';

export default function LoadingState() {
  const steps = [
    { icon: Search, text: 'Encoding your text with Sentence Transformer', delay: 0 },
    { icon: Database, text: 'Searching FAISS vector database for similar articles', delay: 0.3 },
    { icon: Brain, text: 'Analyzing retrieved articles with RAG pipeline', delay: 0.6 },
    { icon: Shield, text: 'Computing confidence score and generating reasons', delay: 0.9 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass glass-border rounded-2xl p-8 md:p-12">
        {/* Spinner */}
        <div className="flex justify-center mb-8">
          <div className="relative w-20 h-20">
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-emerald-500/20"
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-3 rounded-full border-4 border-transparent border-t-teal-400"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Database className="w-7 h-7 text-emerald-400" />
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-center mb-2 text-white" style={{ fontFamily: 'Syne' }}>
          RAG Analysis in Progress
        </h3>
        <p className="text-slate-400 text-center mb-8 text-sm">
          Retrieving semantically similar articles from knowledge base...
        </p>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: step.delay }}
              className="flex items-center gap-3 text-slate-400"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ delay: step.delay, duration: 2, repeat: Infinity }}
              >
                <step.icon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              </motion.div>
              <span className="text-sm">{step.text}</span>
              <motion.div className="ml-auto flex gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: step.delay + 0.3 }}>
                {[0,1,2].map(d => (
                  <motion.div key={d} className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ delay: d * 0.2, duration: 1.5, repeat: Infinity }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-8 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 4, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
