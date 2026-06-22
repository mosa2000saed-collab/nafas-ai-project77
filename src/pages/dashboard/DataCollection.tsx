import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Droplets, Bus, Trash2, Send, CheckCircle } from 'lucide-react';
import { useApp } from '../../lib/context';
import { t } from '../../lib/i18n';

const tabs = [
  { key: 'energy', icon: Zap },
  { key: 'water', icon: Droplets },
  { key: 'transportation', icon: Bus },
  { key: 'waste', icon: Trash2 },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DataCollection() {
  const { lang } = useApp();
  const [activeTab, setActiveTab] = useState('energy');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 2000);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-saudi-green focus:border-transparent transition-all";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <div className="card-saudi p-6">
        <h2 className="text-2xl font-bold mb-6 font-display">{t('dataCollectionNav', lang)}</h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setSubmitted(false); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-saudi-green text-white shadow-lg shadow-saudi-green/20'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {t(tab.key as any, lang)}
            </button>
          ))}
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <CheckCircle className="w-16 h-16 text-palm-500 mb-4" />
            <p className="text-lg font-semibold">{lang === 'ar' ? 'تم إرسال البيانات بنجاح!' : 'Data submitted successfully!'}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {activeTab === 'energy' && (
              <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('building', lang)}</label>
                  <input type="text" className={inputClass} placeholder="Building A" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('classroom', lang)}</label>
                  <input type="text" className={inputClass} placeholder="Room 101" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('acHours', lang)}</label>
                  <input type="number" className={inputClass} placeholder="8" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('electricity', lang)} (kWh)</label>
                  <input type="number" className={inputClass} placeholder="4200" required />
                </div>
              </motion.div>
            )}

            {activeTab === 'water' && (
              <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('waterMeter', lang)}</label>
                  <input type="text" className={inputClass} placeholder="WM-001" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('dailyUsage', lang)} (L)</label>
                  <input type="number" className={inputClass} placeholder="1800" required />
                </div>
              </motion.div>
            )}

            {activeTab === 'transportation' && (
              <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('busCount', lang)}</label>
                  <input type="number" className={inputClass} placeholder="12" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('trips', lang)}</label>
                  <input type="number" className={inputClass} placeholder="48" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('fuelType', lang)}</label>
                  <select className={inputClass} required>
                    <option value="">{lang === 'ar' ? 'اختر نوع الوقود' : 'Select fuel type'}</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </motion.div>
            )}

            {activeTab === 'waste' && (
              <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('plasticWaste', lang)} (kg)</label>
                  <input type="number" className={inputClass} placeholder="45" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('paperWaste', lang)} (kg)</label>
                  <input type="number" className={inputClass} placeholder="120" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('organicWaste', lang)} (kg)</label>
                  <input type="number" className={inputClass} placeholder="80" required />
                </div>
              </motion.div>
            )}

            <button type="submit" className="w-full btn-saudi flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              {t('submitData', lang)}
            </button>
          </form>
        )}
      </div>

      {/* Workflow */}
      <div className="card-saudi p-6">
        <h3 className="text-lg font-semibold mb-4">{lang === 'ar' ? 'سير العمل' : 'Workflow'}</h3>
        <div className="flex flex-wrap items-center gap-3">
          {['Submit', 'Database Update', 'Dashboard Update', 'AI Analysis'].map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-lg bg-palm-100 dark:bg-palm-900/30 text-palm-700 dark:text-palm-300 text-sm font-medium">
                {step}
              </div>
              {i < 3 && (
                <div className="text-[var(--text-secondary)]">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
