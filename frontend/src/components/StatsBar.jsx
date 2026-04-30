import { motion } from 'framer-motion';
import { Database, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

export default function StatsBar({ stats }) {
  const items = [
    { icon: Database, label: 'Knowledge Base', value: `${parseInt(stats.knowledge_base_size).toLocaleString()} articles` },
    { icon: CheckCircle, label: 'Real Articles', value: parseInt(stats.real_articles).toLocaleString(), color: 'text-emerald-500' },
    { icon: XCircle, label: 'Fake Articles', value: parseInt(stats.fake_articles).toLocaleString(), color: 'text-orange-500' },
    { icon: TrendingUp, label: 'Model Accuracy', value: stats.model_accuracy, color: 'text-blue-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto"
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          className="glass glass-border rounded-xl p-4 text-center"
        >
          <item.icon className={`w-5 h-5 mx-auto mb-2 ${item.color || 'text-slate-500'}`} />
          <div className={`text-lg font-bold ${item.color || 'text-slate-800 dark:text-slate-100'}`}>
            {item.value}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {item.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
