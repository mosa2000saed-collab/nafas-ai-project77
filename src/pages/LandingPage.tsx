import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Menu, X, Sun, Moon, Globe, ArrowRight, ArrowLeft, Play,
  Brain, Building2, TrendingUp, Leaf, Zap, Droplets, Bus, Trash2,
  Database, CloudSun, Building, Wifi, Check, XIcon, ChevronDown,
  Users, Award, BookOpen
} from 'lucide-react';
import { useApp } from '../lib/context';
import { t } from '../lib/i18n';
import type { Language } from '../lib/i18n';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function LandingPage() {
  const { lang, setLang, isDark, toggleTheme } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isRTL = lang === 'ar';

  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'features', href: '#solution' },
    { key: 'howItWorks', href: '#how-it-works' },
    { key: 'whyUs', href: '#why-nafas' },
    { key: 'team', href: '#team' },
    { key: 'contact', href: '#footer' },
  ];

  const toggleLang = () => setLang((lang === 'ar' ? 'en' : 'ar') as Language);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-saudi">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-saudi-green to-palm-600 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text-saudi font-display">Nafas | نفس</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-sm font-medium text-[var(--text-secondary)] hover:text-saudi-green dark:hover:text-palm-400 transition-colors"
                >
                  {t(item.key as any, lang)}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <Globe className="w-4 h-4" />
                {lang === 'ar' ? 'English' : 'العربية'}
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:text-saudi-green transition-colors"
              >
                {t('login', lang)}
              </Link>
              <Link to="/login" className="btn-saudi text-sm">
                {t('getStarted', lang)}
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-[var(--text-primary)]"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-primary)]"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-[var(--text-secondary)] hover:text-saudi-green"
                >
                  {t(item.key as any, lang)}
                </a>
              ))}
              <div className="pt-3 border-t border-[var(--border-color)] flex items-center gap-3">
                <button onClick={toggleLang} className="flex items-center gap-1 text-sm">
                  <Globe className="w-4 h-4" />
                  {lang === 'ar' ? 'English' : 'العربية'}
                </button>
                <button onClick={toggleTheme}>
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
              <Link to="/login" className="block btn-saudi text-center" onClick={() => setMobileOpen(false)}>
                {t('getStarted', lang)}
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden pattern-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-palm-50/40 to-transparent dark:from-palm-900/5 dark:to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp} className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saudi-green/10 dark:bg-palm-500/10 text-saudi-green dark:text-palm-400 text-sm font-medium border border-saudi-green/20">
                <Award className="w-4 h-4" />
                {t('builtFor', lang)}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-balance font-display">
                {t('heroTitle', lang)}
              </h1>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                {t('heroSubtitle', lang)}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login" className="btn-saudi flex items-center gap-2">
                  {t('explorePlatform', lang)}
                  <ArrowIcon className="w-4 h-4" />
                </Link>
                <button className="btn-outline flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  {t('watchDemo', lang)}
                </button>
              </div>
              <div className="flex flex-wrap gap-6 pt-4">
                {[
                  { icon: Zap, label: lang === 'ar' ? 'ألواح شمسية' : 'Solar Panels' },
                  { icon: Brain, label: lang === 'ar' ? 'أنظمة ذكاء' : 'AI Systems' },
                  { icon: Leaf, label: lang === 'ar' ? 'مراقبة كربون' : 'Carbon Monitor' },
                  { icon: Droplets, label: lang === 'ar' ? 'مراقبة مياه' : 'Water Monitor' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Icon className="w-4 h-4 text-saudi-green" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-sand-200 to-sand-400 rounded-3xl opacity-15 animate-pulse-slow" />
                <div className="relative bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] shadow-xl p-6 animate-float-slow">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <Leaf className="w-5 h-5 text-saudi-green" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="card-saudi p-4">
                        <Leaf className="w-6 h-6 text-saudi-green mb-2" />
                        <div className="text-2xl font-bold">125</div>
                        <div className="text-xs text-[var(--text-secondary)]">tCO₂</div>
                      </div>
                      <div className="card-saudi p-4">
                        <Zap className="w-6 h-6 text-gold mb-2" />
                        <div className="text-2xl font-bold">4,200</div>
                        <div className="text-xs text-[var(--text-secondary)]">kWh</div>
                      </div>
                      <div className="card-saudi p-4">
                        <Droplets className="w-6 h-6 text-blue-500 mb-2" />
                        <div className="text-2xl font-bold">1,800</div>
                        <div className="text-xs text-[var(--text-secondary)]">L</div>
                      </div>
                      <div className="card-saudi p-4">
                        <TrendingUp className="w-6 h-6 text-palm-500 mb-2" />
                        <div className="text-2xl font-bold">89</div>
                        <div className="text-xs text-[var(--text-secondary)]">Score</div>
                      </div>
                    </div>
                    <div className="card-saudi p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{lang === 'ar' ? 'اتجاه الكربون' : 'Carbon Trend'}</span>
                        <span className="text-xs text-palm-500">-12%</span>
                      </div>
                      <div className="flex items-end gap-1 h-16">
                        {[40, 55, 45, 60, 50, 35, 30].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-saudi-green rounded-t"
                            style={{ height: `${h}%`, opacity: 0.3 + (i * 0.1) }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 font-display">{t('problemTitle', lang)}</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-saudi-green to-gold mx-auto rounded-full" />
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {['problem1', 'problem2', 'problem3', 'problem4', 'problem5'].map((key) => (
              <motion.div
                key={key}
                variants={fadeInUp}
                className="card-saudi p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                  <XIcon className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-[var(--text-secondary)]">{t(key as any, lang)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 gradient-text-saudi font-display">{t('meetNafas', lang)}</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-saudi-green to-gold mx-auto rounded-full" />
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Brain, title: 'aiAnalytics', desc: 'aiAnalyticsDesc', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
              { icon: Building2, title: 'digitalTwin', desc: 'digitalTwinDesc', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
              { icon: TrendingUp, title: 'predictionEngine', desc: 'predictionEngineDesc', color: 'text-palm-500', bg: 'bg-palm-100 dark:bg-palm-900/30' },
              { icon: Leaf, title: 'sustainabilityScore', desc: 'sustainabilityScoreDesc', color: 'text-saudi-green', bg: 'bg-palm-100 dark:bg-palm-900/30' },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeInUp} className="card-saudi p-8 text-center">
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t(item.title as any, lang)}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{t(item.desc as any, lang)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 font-display">{t('howNafasWorks', lang)}</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-saudi-green to-gold mx-auto rounded-full" />
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { num: '1', icon: Database, title: 'dataCollection', desc: 'dataCollectionDesc' },
              { num: '2', icon: Brain, title: 'aiProcessing', desc: 'aiProcessingDesc' },
              { num: '3', icon: Building2, title: 'digitalTwinStep', desc: 'digitalTwinStepDesc' },
              { num: '4', icon: TrendingUp, title: 'optimization', desc: 'optimizationDesc' },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeInUp} className="relative">
                <div className="card-saudi p-6 h-full">
                  <div className="text-4xl font-bold gradient-text-saudi mb-4 font-display">{item.num}</div>
                  <item.icon className="w-8 h-8 text-saudi-green mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{t(item.title as any, lang)}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{t(item.desc as any, lang)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 font-display">{t('dataSources', lang)}</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-saudi-green to-gold mx-auto rounded-full" />
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: Zap, key: 'electricity' },
              { icon: Droplets, key: 'water' },
              { icon: Bus, key: 'transportation' },
              { icon: Trash2, key: 'waste' },
              { icon: Database, key: 'historicalData' },
              { icon: CloudSun, key: 'weatherData' },
              { icon: Building, key: 'buildingInfo' },
              { icon: Wifi, key: 'iotDevices' },
            ].map((item) => (
              <motion.div
                key={item.key}
                variants={fadeInUp}
                className="card-saudi p-6 text-center hover:scale-105 transition-transform"
              >
                <item.icon className="w-8 h-8 text-saudi-green mx-auto mb-3" />
                <span className="text-sm font-medium">{t(item.key as any, lang)}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Nafas */}
      <section id="why-nafas" className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 font-display">{t('whyNafas', lang)}</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-saudi-green to-gold mx-auto rounded-full" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="card-saudi overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className="text-left p-4 text-sm font-semibold text-[var(--text-secondary)]">{t('feature', lang)}</th>
                    <th className="text-center p-4 text-sm font-semibold text-saudi-green">{t('nafas', lang)}</th>
                    <th className="text-center p-4 text-sm font-semibold text-[var(--text-secondary)]">{t('traditional', lang)}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    'aiRecommendations',
                    'digitalTwin',
                    'predictionEngineFeature',
                    'realTimeMonitoring',
                    'simulationEngine',
                    'gamification',
                    'sustainabilityScoreFeature',
                  ].map((key) => (
                    <tr key={key} className="border-b border-[var(--border-color)] last:border-0">
                      <td className="p-4 text-sm">{t(key as any, lang)}</td>
                      <td className="p-4 text-center">
                        <Check className="w-5 h-5 text-palm-500 mx-auto" />
                      </td>
                      <td className="p-4 text-center">
                        <XIcon className="w-5 h-5 text-red-400 mx-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 font-display">{t('futureVision', lang)}</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-saudi-green to-gold mx-auto rounded-full" />
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              { phase: 'phase1', icon: Brain },
              { phase: 'phase2', icon: Building2 },
              { phase: 'phase3', icon: Wifi },
              { phase: 'phase4', icon: Zap },
              { phase: 'phase5', icon: Leaf },
            ].map((item, i) => (
              <motion.div
                key={item.phase}
                variants={fadeInUp}
                className="flex items-center gap-6"
              >
                <div className="w-12 h-12 rounded-full bg-saudi-green/10 dark:bg-palm-500/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-saudi-green" />
                </div>
                <div className="flex-1 card-saudi p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-saudi-green">Phase {i + 1}</span>
                  </div>
                  <p className="font-medium">{t(item.phase as any, lang)}</p>
                </div>
                {i < 4 && (
                  <div className="hidden md:block">
                    <ChevronDown className="w-5 h-5 text-[var(--text-secondary)]" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 font-display">{t('meetTheTeam', lang)}</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-saudi-green to-gold mx-auto rounded-full" />
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {[
              { name: 'musaName', role: 'musaRole', desc: 'musaDesc', icon: Brain, color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-500' },
              { name: 'danaName', role: 'danaRole', desc: 'danaDesc', icon: Award, color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-500' },
              { name: 'faisalName', role: 'faisalRole', desc: 'faisalDesc', icon: BookOpen, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-500' },
              { name: 'abdulazizName', role: 'abdulazizRole', desc: 'abdulazizDesc', icon: Users, color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-500' },
              { name: 'alaaName', role: 'alaaRole', desc: 'alaaDesc', icon: Leaf, color: 'bg-palm-100 dark:bg-palm-900/30 text-palm-500' },
            ].map((member) => (
              <motion.div key={member.name} variants={fadeInUp} className="card-saudi p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${member.color} flex items-center justify-center mx-auto mb-4`}>
                  <member.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{t(member.name as any, lang)}</h3>
                <p className="text-xs text-saudi-green font-medium mb-3">{t(member.role as any, lang)}</p>
                <p className="text-xs text-[var(--text-secondary)]">{t(member.desc as any, lang)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="py-12 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-saudi-green to-palm-600 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold gradient-text-saudi font-display">Nafas | نفس</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[var(--text-secondary)]">
              <span>{t('footerText', lang)}</span>
              <span>{t('saudiArabia', lang)}</span>
              <span>{t('builtFor', lang)}</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={toggleLang} className="text-sm text-[var(--text-secondary)] hover:text-saudi-green transition-colors">
                {lang === 'ar' ? 'English' : 'العربية'}
              </button>
              <button onClick={toggleTheme} className="text-[var(--text-secondary)] hover:text-saudi-green transition-colors">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
