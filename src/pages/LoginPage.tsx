import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Sun, Moon, Globe, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../lib/context';
import { t } from '../lib/i18n';
import type { Language } from '../lib/i18n';

export default function LoginPage() {
  const { lang, setLang, isDark, toggleTheme, setIsLoggedIn } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const isRTL = lang === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const toggleLang = () => setLang((lang === 'ar' ? 'en' : 'ar') as Language);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex">
      {/* Left side - illustration with Saudi theme */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-saudi-green via-palm-700 to-palm-900" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="relative z-10 text-white text-center px-8 flex flex-col items-center justify-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
              <Leaf className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-bold mb-4 font-display">Nafas | نفس</h2>
            <p className="text-lg opacity-90 max-w-sm mx-auto leading-relaxed">
              {lang === 'ar'
                ? 'منصة ذكية لتحويل المدارس إلى بيئات مستدامة'
                : 'Smart platform transforming schools into sustainable environments'}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 grid grid-cols-2 gap-4 max-w-sm mx-auto w-full"
          >
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold">125</div>
              <div className="text-xs opacity-80">tCO₂</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold">89</div>
              <div className="text-xs opacity-80">Score</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-saudi-green to-palm-600 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold gradient-text-saudi font-display">Nafas | نفس</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
            >
              <Globe className="w-4 h-4" />
              {lang === 'ar' ? 'English' : 'العربية'}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2 font-display">{t('login', lang)}</h1>
              <p className="text-sm text-[var(--text-secondary)]">
                {lang === 'ar'
                  ? 'سجل الدخول للوصول إلى لوحة التحكم'
                  : 'Sign in to access your dashboard'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">{t('email', lang)}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-saudi-green focus:border-transparent transition-all"
                  placeholder="admin@nafas.sa"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('password', lang)}</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-saudi-green focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[var(--border-color)] text-saudi-green focus:ring-saudi-green"
                  />
                  <span className="text-sm text-[var(--text-secondary)]">{t('rememberMe', lang)}</span>
                </label>
                <button type="button" className="text-sm text-saudi-green hover:text-palm-600">
                  {t('forgotPassword', lang)}
                </button>
              </div>

              <button type="submit" className="w-full btn-saudi flex items-center justify-center gap-2">
                {t('signIn', lang)}
                <ArrowIcon className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                {lang === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
                <Link to="/" className="text-saudi-green hover:text-palm-600 font-medium">
                  {lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
