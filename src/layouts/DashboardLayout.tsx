import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, Home, Database, Brain, Building2, FlaskConical,
  FileText, Trophy, Bot, Bell, Settings, LogOut, Menu, X,
  Sun, Moon, Globe, ChevronRight, ChevronLeft
} from 'lucide-react';
import { useApp } from '../lib/context';
import { t } from '../lib/i18n';
import type { Language } from '../lib/i18n';

const sidebarItems = [
  { key: 'dashboard', icon: Home, path: '/dashboard' },
  { key: 'dataCollectionNav', icon: Database, path: '/dashboard/data-collection' },
  { key: 'aiInsights', icon: Brain, path: '/dashboard/ai-insights' },
  { key: 'digitalTwinNav', icon: Building2, path: '/dashboard/digital-twin' },
  { key: 'simulation', icon: FlaskConical, path: '/dashboard/simulation' },
  { key: 'reports', icon: FileText, path: '/dashboard/reports' },
  { key: 'gamificationNav', icon: Trophy, path: '/dashboard/gamification' },
  { key: 'aiAssistant', icon: Bot, path: '/dashboard/ai-assistant' },
  { key: 'alerts', icon: Bell, path: '/dashboard/alerts' },
  { key: 'settings', icon: Settings, path: '/dashboard/settings' },
];

export default function DashboardLayout() {
  const { lang, setLang, isDark, toggleTheme, setIsLoggedIn } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isRTL = lang === 'ar';

  const toggleLang = () => setLang((lang === 'ar' ? 'en' : 'ar') as Language);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] text-[var(--text-primary)] flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:static inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-50 bg-[var(--bg-card)] border-${isRTL ? 'l' : 'r'} border-[var(--border-color)] flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } ${mobileOpen ? 'translate-x-0' : isRTL ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border-color)]">
          <Link to="/dashboard" className="flex items-center gap-2 overflow-hidden">
            <Leaf className="w-8 h-8 text-primary-500 flex-shrink-0" />
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold gradient-text whitespace-nowrap"
              >
                Nafas
              </motion.span>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex p-1 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
          >
            <ChevronIcon className={`w-4 h-4 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 text-[var(--text-secondary)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {sidebarItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.key}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  active
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
                }`}
                title={!sidebarOpen ? t(item.key as any, lang) : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {t(item.key as any, lang)}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-[var(--border-color)] space-y-1">
          <button
            onClick={toggleLang}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
            title={!sidebarOpen ? (lang === 'ar' ? 'English' : 'العربية') : undefined}
          >
            <Globe className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && (
              <span className="text-sm font-medium">{lang === 'ar' ? 'English' : 'العربية'}</span>
            )}
          </button>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
            title={!sidebarOpen ? (isDark ? 'Light' : 'Dark') : undefined}
          >
            {isDark ? <Sun className="w-5 h-5 flex-shrink-0" /> : <Moon className="w-5 h-5 flex-shrink-0" />}
            {sidebarOpen && (
              <span className="text-sm font-medium">{isDark ? t('lightMode', lang) : t('darkMode', lang)}</span>
            )}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title={!sidebarOpen ? t('logout', lang) : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && (
              <span className="text-sm font-medium">{t('logout', lang)}</span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-[var(--bg-card)] border-b border-[var(--border-color)] flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">
              {t('dashboard', lang)}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard/alerts" className="relative p-2 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Link>
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">A</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
