import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export default function BreakdownChart({ breakdown }) {
  const labels = Object.keys(breakdown);
  const values = Object.values(breakdown);

  const data = {
    labels,
    datasets: [{
      label: 'Score',
      data: values,
      backgroundColor: values.map(v => v >= 75 ? 'rgba(16,185,129,0.7)' : v >= 50 ? 'rgba(245,158,11,0.7)' : 'rgba(239,68,68,0.7)'),
      borderColor: values.map(v => v >= 75 ? '#10b981' : v >= 50 ? '#f59e0b' : '#ef4444'),
      borderWidth: 2,
      borderRadius: 6,
    }],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(2,8,23,0.95)',
        titleColor: '#f8fafc',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: { label: (ctx) => `Score: ${ctx.parsed.x}%` },
      },
    },
    scales: {
      x: {
        min: 0, max: 100,
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#64748b', callback: (v) => v + '%' },
      },
      y: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { size: 12, weight: '500' } },
      },
    },
    animation: { duration: 1500, easing: 'easeOutQuart' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass glass-border rounded-xl p-6"
    >
      <h3 className="text-base font-semibold mb-4 text-slate-200" style={{ fontFamily: 'Syne' }}>
        Analysis Breakdown
      </h3>
      <div className="h-52">
        <Bar data={data} options={options} />
      </div>
    </motion.div>
  );
}
