import { motion } from 'framer-motion';
import { ShieldCheck, Brain, Database, Zap, Target } from 'lucide-react';

export default function HeroSection() {
  const stats = [
    { icon: Brain, label: 'Model', value: 'RAG System' },
    { icon: Database, label: 'Knowledge Base', value: '2K Articles' },
    { icon: Zap, label: 'Method', value: 'FAISS + NLP' },
    { icon: Target, label: 'Retrieval', value: 'Top-5 Match' },
  ];

  return (
    <div className="text-center mb-12">
      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-2xl glow-green"
      >
        <ShieldCheck className="w-12 h-12 text-white" />
      </motion.div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glass-border mb-6 text-sm text-emerald-400"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        RAG-Powered • Retrieval Augmented Generation
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-tight"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        <span className="text-white">Reveal the</span>
        <br />
        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Truth Behind
        </span>
        <br />
        <span className="text-white">Any News</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-light"
      >
        AI retrieves semantically similar verified articles and uses them
        to determine authenticity — no black-box decisions.
      </motion.p>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="glass glass-border rounded-xl p-4 text-center"
          >
            <stat.icon className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white" style={{ fontFamily: 'Syne' }}>
              {stat.value}
            </div>
            <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
