import { motion } from 'framer-motion';
import { Brain, Lightbulb, TrendingDown, AlertTriangle, Building2, Bus, Zap, Droplets } from 'lucide-react';
import { useApp } from '../../lib/context';
import { t } from '../../lib/i18n';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const emissionData = [
  { name: 'Electricity', value: 62, color: '#c9a84c' },
  { name: 'Transportation', value: 21, color: '#3b82f6' },
  { name: 'Water', value: 10, color: '#06b6d4' },
  { name: 'Waste', value: 7, color: '#165d31' },
];

const findings = [
  { icon: Building2, title: 'Science Building', desc: 'High Energy Usage', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' },
  { icon: Zap, title: 'Building A', desc: 'Abnormal Consumption', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { icon: Bus, title: 'Transportation', desc: 'Above Average', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
];

const recommendations = [
  { icon: Lightbulb, text: 'reduceACHours', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { icon: Zap, text: 'installSmartSensors', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  { icon: Building2, text: 'improveInsulation', color: 'text-palm-500', bg: 'bg-palm-100 dark:bg-palm-900/30' },
  { icon: Droplets, text: 'increaseRecycling', color: 'text-saudi-green', bg: 'bg-palm-100 dark:bg-palm-900/30' },
];

export default function AIInsights() {
  const { lang } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-display">{t('aiInsights', lang)}</h2>
        <button className="btn-saudi flex items-center gap-2">
          <Brain className="w-4 h-4" />
          {t('analyzeWithAI', lang)}
        </button>
      </div>

      {/* Emission Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-saudi p-6">
          <h3 className="text-lg font-semibold mb-4">{t('emissionBreakdown', lang)}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={emissionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {emissionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {emissionData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-[var(--text-secondary)]">{item.name}</span>
                <span className="text-sm font-medium ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Findings */}
        <div className="card-saudi p-6">
          <h3 className="text-lg font-semibold mb-4">{t('findings', lang)}</h3>
          <div className="space-y-4">
            {findings.map((item) => (
              <div key={item.title} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-secondary)]">
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-[var(--text-secondary)]">{item.desc}</div>
                </div>
                <AlertTriangle className={`w-5 h-5 ${item.color} ml-auto`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card-saudi p-6">
        <h3 className="text-lg font-semibold mb-4">{t('recommendations', lang)}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.text} className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-secondary)]">
              <div className={`w-10 h-10 rounded-xl ${rec.bg} flex items-center justify-center`}>
                <rec.icon className={`w-5 h-5 ${rec.color}`} />
              </div>
              <span className="text-sm font-medium">{t(rec.text as any, lang)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prediction */}
      <div className="card-saudi p-6">
        <h3 className="text-lg font-semibold mb-4">{t('prediction', lang)}</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-xl bg-[var(--bg-secondary)]">
            <div className="text-sm text-[var(--text-secondary)] mb-2">{t('nextMonth', lang)}</div>
            <div className="text-3xl font-bold text-[var(--text-primary)]">112 tCO₂</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-palm-50 dark:bg-palm-900/20">
            <div className="text-sm text-palm-600 dark:text-palm-400 mb-2">{t('reductionPercent', lang)}</div>
            <div className="text-3xl font-bold text-palm-600 dark:text-palm-400 flex items-center justify-center gap-2">
              <TrendingDown className="w-6 h-6" />
              13%
            </div>
          </div>
          <div className="text-center p-6 rounded-xl bg-[var(--bg-secondary)]">
            <div className="text-sm text-[var(--text-secondary)] mb-2">{t('sustainabilityScoreNav', lang)}</div>
            <div className="text-3xl font-bold text-saudi-green">92/100</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
