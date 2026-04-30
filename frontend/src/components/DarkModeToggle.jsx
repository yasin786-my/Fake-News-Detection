import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  return (
    <motion.button
      onClick={() => setDark(!dark)}
      className="fixed top-5 right-5 z-50 p-3 rounded-full glass glass-border shadow-lg"
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <motion.div animate={{ rotate: dark ? 0 : 180 }} transition={{ duration: 0.3 }}>
        {dark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
      </motion.div>
    </motion.button>
  );
}
