import { motion, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ConfidenceCircle({ confidence, verdict }) {
  const [count, setCount] = useState(0);
  const circumference = 2 * Math.PI * 80;

  useEffect(() => {
    const controls = animate(0, confidence, {
      duration: 2, ease: 'easeOut',
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return controls.stop;
  }, [confidence]);

  const color = verdict === 'real' ? '#10b981' : verdict === 'fake' ? '#ef4444' : '#f59e0b';
  const offset = circumference - (count / 100) * circumference;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
        <motion.circle
          cx="100" cy="100" r="80" fill="none"
          stroke={color} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          className="text-center"
        >
          <div className="text-4xl font-bold" style={{ color, fontFamily: 'Syne' }}>{count}%</div>
          <div className="text-xs text-slate-500 mt-1">Confidence</div>
        </motion.div>
      </div>
    </div>
  );
}
