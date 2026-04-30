import { motion } from 'framer-motion';
import { Shield, Database, Zap } from 'lucide-react';

export default function TrustBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400"
    >
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-emerald-500" />
        <span>AI-powered analysis</span>
      </div>
      <div className="flex items-center gap-2">
        <Database className="w-4 h-4 text-emerald-500" />
        <span>10K+ article knowledge base</span>
      </div>
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-emerald-500" />
        <span>Real-time retrieval</span>
      </div>
    </motion.div>
  );
}
