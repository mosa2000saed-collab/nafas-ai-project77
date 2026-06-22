import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Share2, Calendar, ChevronDown } from 'lucide-react';
import { useApp } from '../../lib/context';
import { t } from '../../lib/i18n';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const carbonTrend = [
  { month: 'Jan', value: 145 },
  { month: 'Feb', value: 138 },
  { month: 'Mar', value: 142 },
  { month: 'Apr', value: 135 },
  { month: 'May', value: 130 },
  { month: 'Jun', value: 125 },
];

const energyTrend = [
  { month: 'Jan', value: 4800 },
  { month: 'Feb', value: 4600 },
  { month: 'Mar', value: 4700 },
  { month: 'Apr', value: 4500 },
  { month: 'May', value: 4350 },
  { month: 'Jun', value: 4200 },
];

const waterTrend = [
  { month: 'Jan', value: 2100 },
  { month: 'Feb', value: 2000 },
  { month: 'Mar', value: 2050 },
  { month: 'Apr', value: 1950 },
  { month: 'May', value: 1880 },
  { month: 'Jun', value: 1800 },
];

const deptComparison = [
  { name: 'Science', value: 85 },
  { name: 'Admin', value: 45 },
  { name: 'Library', value: 32 },
  { name: 'Cafeteria', value: 78 },
  { name: 'Sports', value: 55 },
];

export default function Reports() {
  const { lang } = useApp();
  const [period, setPeriod] = useState('monthly');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const periods = [
    { key: 'monthly', label: t('monthlyReports', lang) },
    { key: 'quarterly', label: t('quarterlyReports', lang) },
    { key: 'yearly', label: t('yearlyReports', lang) },
  ];

  const currentPeriod = periods.find((p) => p.key === period) || periods[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold font-display">{t('reports', lang)}</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm font-medium"
            >
              <Calendar className="w-4 h-4" />
              {currentPeriod.label}
              <ChevronDown className="w-4 h-4" />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full mt-1 right-0 w-48 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-lg z-10 overflow-hidden">
                {periods.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => { setPeriod(p.key); setDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[var(--bg-secondary)] transition-colors ${
                      period === p.key ? 'text-saudi-green font-medium' : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="btn-outline flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" />
            {t('downloadPDF', lang)}
          </button>
          <button className="btn-outline flex items-center gap-2 text-sm">
            <FileText className="w-4 h-4" />
            {t('exportExcel', lang)}
          </button>
          <button className="btn-outline flex items-center gap-2 text-sm">
            <Share2 className="w-4 h-4" />
            {t('shareReport', lang)}
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-saudi p-5">
          <h3 className="text-lg font-semibold mb-4">{lang === 'ar' ? 'اتجاه الكربون' : 'Carbon Trend'}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={carbonTrend}>
              <defs>
                <linearGradient id="repCarbonGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#165d31" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#165d31" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={12} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="value" stroke="#165d31" fill="url(#repCarbonGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card-saudi p-5">
          <h3 className="text-lg font-semibold mb-4">{lang === 'ar' ? 'اتجاه الطاقة' : 'Energy Trend'}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={energyTrend}>
              <defs>
                <linearGradient id="repEnergyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={12} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="value" stroke="#c9a84c" fill="url(#repEnergyGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card-saudi p-5">
          <h3 className="text-lg font-semibold mb-4">{lang === 'ar' ? 'اتجاه المياه' : 'Water Trend'}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={waterTrend}>
              <defs>
                <linearGradient id="repWaterGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={12} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#repWaterGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card-saudi p-5">
          <h3 className="text-lg font-semibold mb-4">{lang === 'ar' ? 'مقارنة الأقسام' : 'Department Comparison'}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={deptComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }} />
              <Bar dataKey="value" fill="#c9a84c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
