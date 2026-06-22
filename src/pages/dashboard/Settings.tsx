import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Globe, Bell, BellOff, Target, School, Plug, Shield, Key, LogOut } from 'lucide-react';
import { useApp } from '../../lib/context';
import { t } from '../../lib/i18n';

export default function Settings() {
  const { lang, setLang, isDark, toggleTheme, setIsLoggedIn } = useApp();
  const [notifications, setNotifications] = useState(true);
  const [carbonTarget, setCarbonTarget] = useState(100);
  const [schoolName, setSchoolName] = useState('Al Faisal School');
  const [location, setLocation] = useState('Riyadh, Saudi Arabia');
  const [buildingCount, setBuildingCount] = useState(5);
  const [studentCount, setStudentCount] = useState(1200);

  const inputClass = "w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-saudi-green focus:border-transparent transition-all";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold font-display">{t('settings', lang)}</h2>

      {/* Language */}
      <div className="card-saudi p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-saudi-green" />
          {t('language', lang)}
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => setLang('en')}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              lang === 'en'
                ? 'bg-saudi-green text-white shadow-lg shadow-saudi-green/20'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang('ar')}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              lang === 'ar'
                ? 'bg-saudi-green text-white shadow-lg shadow-saudi-green/20'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            العربية
          </button>
        </div>
      </div>

      {/* Appearance */}
      <div className="card-saudi p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          {isDark ? <Moon className="w-5 h-5 text-saudi-green" /> : <Sun className="w-5 h-5 text-saudi-green" />}
          {t('appearance', lang)}
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => { if (isDark) toggleTheme(); }}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              !isDark
                ? 'bg-saudi-green text-white shadow-lg shadow-saudi-green/20'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Sun className="w-4 h-4" />
            {t('lightMode', lang)}
          </button>
          <button
            onClick={() => { if (!isDark) toggleTheme(); }}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              isDark
                ? 'bg-saudi-green text-white shadow-lg shadow-saudi-green/20'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Moon className="w-4 h-4" />
            {t('darkMode', lang)}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="card-saudi p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-saudi-green" />
          {t('notifications', lang)}
        </h3>
        <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-3">
            {notifications ? <Bell className="w-5 h-5 text-saudi-green" /> : <BellOff className="w-5 h-5 text-[var(--text-secondary)]" />}
            <span className="text-sm font-medium">
              {notifications ? t('enable', lang) : t('disable', lang)}
            </span>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              notifications ? 'bg-saudi-green' : 'bg-[var(--border-color)]'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                notifications ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Carbon Targets */}
      <div className="card-saudi p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-saudi-green" />
          {t('carbonTargets', lang)}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t('schoolGoals', lang)} (tCO₂/year)</label>
            <input
              type="range"
              min={50}
              max={200}
              value={carbonTarget}
              onChange={(e) => setCarbonTarget(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[var(--bg-secondary)] accent-saudi-green"
            />
            <div className="flex justify-between mt-1 text-xs text-[var(--text-secondary)]">
              <span>50</span>
              <span className="font-bold text-saudi-green">{carbonTarget}</span>
              <span>200</span>
            </div>
          </div>
        </div>
      </div>

      {/* School Information */}
      <div className="card-saudi p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <School className="w-5 h-5 text-saudi-green" />
          {t('schoolInfo', lang)}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t('name', lang)}</label>
            <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('location', lang)}</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('buildings', lang)}</label>
              <input type="number" value={buildingCount} onChange={(e) => setBuildingCount(parseInt(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{lang === 'ar' ? 'الطلاب' : 'Students'}</label>
              <input type="number" value={studentCount} onChange={(e) => setStudentCount(parseInt(e.target.value))} className={inputClass} />
            </div>
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div className="card-saudi p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Plug className="w-5 h-5 text-saudi-green" />
          {t('integrations', lang)}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-secondary)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-500">API</span>
              </div>
              <div>
                <div className="font-medium text-sm">{t('api', lang)}</div>
                <div className="text-xs text-[var(--text-secondary)]">REST API v1.0</div>
              </div>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-palm-100 dark:bg-palm-900/30 text-palm-600 dark:text-palm-400 font-medium">
              {lang === 'ar' ? 'متصل' : 'Connected'}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-secondary)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Plug className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <div className="font-medium text-sm">{t('iotSensors', lang)}</div>
                <div className="text-xs text-[var(--text-secondary)]">12 devices active</div>
              </div>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-palm-100 dark:bg-palm-900/30 text-palm-600 dark:text-palm-400 font-medium">
              {lang === 'ar' ? 'متصل' : 'Connected'}
            </span>
          </div>
        </div>
      </div>

      {/* Account */}
      <div className="card-saudi p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-saudi-green" />
          {t('account', lang)}
        </h3>
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] transition-colors text-left">
            <Key className="w-5 h-5 text-[var(--text-secondary)]" />
            <span className="text-sm font-medium">{t('changePassword', lang)}</span>
          </button>
          <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] transition-colors text-left">
            <Shield className="w-5 h-5 text-[var(--text-secondary)]" />
            <span className="text-sm font-medium">{t('security', lang)}</span>
          </button>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-left text-red-500"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">{t('logout', lang)}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
