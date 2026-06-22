import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, CheckCircle, Check, EyeOff, Clock } from 'lucide-react';
import { useApp } from '../../lib/context';
import { t } from '../../lib/i18n';

interface AlertItem {
  id: string;
  title: string;
  description: string;
  type: 'critical' | 'warning' | 'resolved';
  time: string;
  building?: string;
}

const initialAlerts: AlertItem[] = [
  { id: '1', title: 'High Energy Consumption', description: 'Building A energy usage exceeded threshold by 22%', type: 'critical', time: '2 min ago', building: 'Building A' },
  { id: '2', title: 'Water Leakage Detected', description: 'Possible leak in cafeteria water line', type: 'critical', time: '15 min ago', building: 'Cafeteria' },
  { id: '3', title: 'Overheating in Lab 3', description: 'Temperature reached 29°C, AC not responding', type: 'critical', time: '32 min ago', building: 'Lab 3' },
  { id: '4', title: 'Abnormal Usage Pattern', description: 'Science building shows unusual evening consumption', type: 'warning', time: '1 hour ago', building: 'Science' },
  { id: '5', title: 'High Water Consumption', description: 'Daily usage 15% above average', type: 'warning', time: '2 hours ago', building: 'Main' },
  { id: '6', title: 'Transportation Optimized', description: 'Bus route efficiency improved by 12%', type: 'resolved', time: '3 hours ago' },
  { id: '7', title: 'Recycling Target Met', description: 'Weekly recycling goal achieved', type: 'resolved', time: '5 hours ago' },
  { id: '8', title: 'AC Maintenance Complete', description: 'Building B AC system serviced', type: 'resolved', time: '1 day ago', building: 'Building B' },
];

export default function Alerts() {
  const { lang } = useApp();
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'resolved'>('all');

  const filtered = filter === 'all' ? alerts : alerts.filter((a) => a.type === filter);

  const handleResolve = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, type: 'resolved' as const } : a))
    );
  };

  const handleIgnore = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const typeConfig = {
    critical: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-900/50' },
    warning: { icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-900/50' },
    resolved: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-900/50' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">{t('alerts', lang)}</h2>
        <div className="flex gap-2">
          {(['all', 'critical', 'warning', 'resolved'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {f === 'all' ? (lang === 'ar' ? 'الكل' : 'All') : t(f === 'critical' ? 'criticalAlerts' : f === 'warning' ? 'warningAlerts' : 'resolvedAlerts', lang)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="card p-12 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-medium">{lang === 'ar' ? 'لا توجد تنبيهات' : 'No alerts'}</p>
          </div>
        )}
        {filtered.map((alert) => {
          const config = typeConfig[alert.type];
          const Icon = config.icon;
          return (
            <motion.div
              key={alert.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`card p-5 border-l-4 ${config.border} ${config.bg}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{alert.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color} font-medium`}>
                      {alert.type}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">{alert.description}</p>
                  <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {alert.time}
                    </span>
                    {alert.building && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-primary-500" />
                        {alert.building}
                      </span>
                    )}
                  </div>
                </div>
                {alert.type !== 'resolved' && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      {t('resolve', lang)}
                    </button>
                    <button
                      onClick={() => handleIgnore(alert.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-sm font-medium hover:bg-[var(--border-color)] transition-colors"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                      {t('ignore', lang)}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
