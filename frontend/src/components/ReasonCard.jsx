import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export default function ReasonCard({ reason, index, verdict }) {
  const Icon = verdict === 'real' ? CheckCircle2 : verdict === 'fake' ? AlertTriangle : Info;
  const color = verdict === 'real' ? 'text-emerald-500' : verdict === 'fake' ? 'text-orange-500' : 'text-amber-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.4 + index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="glass glass-border rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start gap-3">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}>
          <Icon className={`w-5 h-5 ${color} flex-shrink-0 mt-0.5`} />
        </motion.div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{reason}</p>
      </div>
    </motion.div>
  );
}
