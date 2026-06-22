import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Leaf, Zap, Droplets, Bus, TrendingUp, AlertCircle, AlertTriangle, CheckCircle,
  Plus, Brain, Building2, FlaskConical, FileText
} from 'lucide-react';
import { useApp } from '../../lib/context';
import { t } from '../../lib/i18n';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const carbonData = [
  { month: 'Jan', value: 145 },
  { month: 'Feb', value: 138 },
  { month: 'Mar', value: 142 },
  { month: 'Apr', value: 135 },
  { month: 'May', value: 130 },
  { month: 'Jun', value: 125 },
];

const energyData = [
  { day: 'Mon', value: 520 },
  { day: 'Tue', value: 580 },
  { day: 'Wed', value: 490 },
  { day: 'Thu', value: 610 },
  { day: 'Fri', value: 450 },
  { day: 'Sat', value: 380 },
  { day: 'Sun', value: 410 },
];

const waterData = [
  { day: 'Mon', value: 280 },
  { day: 'Tue', value: 310 },
  { day: 'Wed', value: 260 },
  { day: 'Thu', value: 340 },
  { day: 'Fri', value: 220 },
  { day: 'Sat', value: 180 },
  { day: 'Sun', value: 210 },
];

const transportData = [
  { day: 'Mon', value: 95 },
  { day: 'Tue', value: 88 },
  { day: 'Wed', value: 92 },
  { day: 'Thu', value: 85 },
  { day: 'Fri', value: 78 },
  { day: 'Sat', value: 45 },
  { day: 'Sun', value: 40 },
];

const emissionBreakdown = [
  { name: 'Electricity', value: 62, color: '#c9a84c' },
  { name: 'Transportation', value: 21, color: '#3b82f6' },
  { name: 'Water', value: 10, color: '#06b6d4' },
  { name: 'Waste', value: 7, color: '#165d31' },
];

const statCards = [
  { key: 'carbonFootprint', value: '125 tCO₂', icon: Leaf, color: 'text-saudi-green', bg: 'bg-palm-100 dark:bg-palm-900/30', trend: '-12%' },
  { key: 'electricityUsage', value: '4,200 kWh', icon: Zap, color: 'text-gold', bg: 'bg-gold-light', trend: '-8%' },
  { key: 'waterUsage', value: '1,800 L', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', trend: '-5%' },
  { key: 'transportEmissions', value: '580 kg CO₂', icon: Bus, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30', trend: '-15%' },
  { key: 'sustainabilityScoreNav', value: '89/100', icon: TrendingUp, color: 'text-saudi-green', bg: 'bg-palm-100 dark:bg-palm-900/30', trend: '+4%' },
];

const alerts = [
  { type: 'critical', message: 'highACUsage', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
  { type: 'warning', message: 'possibleWaterLeak', icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
  { type: 'success', message: 'transportImproved', icon: CheckCircle, color: 'text-palm-500', bg: 'bg-palm-50 dark:bg-palm-900/20' },
];

const quickActions = [
  { key: 'addData', icon: Plus, path: '/dashboard/data-collection', color: 'bg-blue-500' },
  { key: 'analyzeWithAI', icon: Brain, path: '/dashboard/ai-insights', color: 'bg-purple-500' },
  { key: 'openDigitalTwin', icon: Building2, path: '/dashboard/digital-twin', color: 'bg-indigo-500' },
  { key: 'runSimulation', icon: FlaskConical, path: '/dashboard/simulation', color: 'bg-pink-500' },
  { key: 'generateReport', icon: FileText, path: '/dashboard/reports', color: 'bg-orange-500' },
];

export default function Dashboard() {
  const { lang } = useApp();

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <motion.div key={card.key} variants={fadeInUp} className="card-saudi stat-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <span className={`text-xs font-medium ${card.trend.startsWith('+') ? 'text-palm-500' : 'text-palm-500'}`}>
                {card.trend}
              </span>
            </div>
            <div className="text-xl font-bold">{card.value}</div>
            <div className="text-xs text-[var(--text-secondary)] mt-1">{t(card.key as any, lang)}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Carbon Trend */}
        <motion.div variants={fadeInUp} className="card-saudi p-5 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">{t('monthlyCarbonTrend', lang)}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={carbonData}>
              <defs>
                <linearGradient id="carbonGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#165d31" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#165d31" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={12} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                }}
              />
              <Area type="monotone" dataKey="value" stroke="#165d31" fillOpacity={1} fill="url(#carbonGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Emission Breakdown */}
        <motion.div variants={fadeInUp} className="card-saudi p-5">
          <h3 className="text-lg font-semibold mb-4">{t('emissionBreakdown', lang)}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={emissionBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {emissionBreakdown.map((entry, index) => (
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
          <div className="space-y-2 mt-2">
            {emissionBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[var(--text-secondary)]">{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Second charts row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div variants={fadeInUp} className="card-saudi p-5">
          <h3 className="text-lg font-semibold mb-4">{t('energyConsumption', lang)}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="day" stroke="var(--text-secondary)" fontSize={12} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                }}
              />
              <Bar dataKey="value" fill="#c9a84c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={fadeInUp} className="card-saudi p-5">
          <h3 className="text-lg font-semibold mb-4">{t('waterUsageChart', lang)}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={waterData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="day" stroke="var(--text-secondary)" fontSize={12} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={fadeInUp} className="card-saudi p-5">
          <h3 className="text-lg font-semibold mb-4">{t('transportEmissionsChart', lang)}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={transportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="day" stroke="var(--text-secondary)" fontSize={12} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                }}
              />
              <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Alerts & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={fadeInUp} className="card-saudi p-5">
          <h3 className="text-lg font-semibold mb-4">{t('liveAlerts', lang)}</h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.message} className={`flex items-center gap-3 p-3 rounded-xl ${alert.bg}`}>
                <alert.icon className={`w-5 h-5 ${alert.color}`} />
                <span className="text-sm font-medium">{t(alert.message as any, lang)}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="card-saudi p-5">
          <h3 className="text-lg font-semibold mb-4">{t('quickActions', lang)}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.key}
                to={action.path}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-center">{t(action.key as any, lang)}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
