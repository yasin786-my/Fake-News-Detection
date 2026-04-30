import { motion } from 'framer-motion';
import { Type, Search, GitCompare, ShieldCheck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    { icon: Type, num: '01', title: 'Input News Text', desc: 'Paste any news article, headline, or snippet into the analyzer.' },
    { icon: Search, num: '02', title: 'Vector Search', desc: 'Sentence Transformer encodes text into embeddings, FAISS searches knowledge base for the 5 most similar articles.' },
    { icon: GitCompare, num: '03', title: 'RAG Analysis', desc: 'Retrieved articles are analyzed — their fake/real ratio and similarity scores determine the prediction.' },
    { icon: ShieldCheck, num: '04', title: 'Verdict + Evidence', desc: 'Get a clear verdict with confidence score, reasons, and the actual retrieved reference articles.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="w-full max-w-4xl mx-auto mt-16 mb-8"
    >
      <h2 className="text-3xl font-bold text-center mb-10 text-white" style={{ fontFamily: 'Syne' }}>
        How RAG Works
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass glass-border rounded-xl p-5 relative overflow-hidden group"
          >
            <div className="absolute top-3 right-3 text-5xl font-black text-white/3 select-none" style={{ fontFamily: 'Syne' }}>
              {step.num}
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-900/30 w-fit mb-4 group-hover:bg-emerald-800/30 transition-colors">
              <step.icon className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-bold text-white mb-2 text-sm" style={{ fontFamily: 'Syne' }}>{step.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
