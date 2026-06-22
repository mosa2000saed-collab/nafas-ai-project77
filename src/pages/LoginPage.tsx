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
      {/* Left side - illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 to-primary-700 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-white text-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Leaf className="w-20 h-20 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Nafas | نفس</h2>
            <p className="text-lg opacity-90">
              {lang === 'ar'
                ? 'منصة ذكية لتحويل المدارس إلى بيئات مستدامة'
                : 'Smart platform transforming schools into sustainable environments'}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 grid grid-cols-2 gap-4 max-w-sm mx-auto"
          >
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-2xl font-bold">125</div>
              <div className="text-xs opacity-80">tCO₂</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
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
            <Leaf className="w-6 h-6 text-primary-500" />
            <span className="font-bold gradient-text">Nafas | نفس</span>
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
              <h1 className="text-2xl font-bold mb-2">{t('login', lang)}</h1>
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
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                    className="w-4 h-4 rounded border-[var(--border-color)] text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm text-[var(--text-secondary)]">{t('rememberMe', lang)}</span>
                </label>
                <button type="button" className="text-sm text-primary-500 hover:text-primary-600">
                  {t('forgotPassword', lang)}
                </button>
              </div>

              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                {t('signIn', lang)}
                <ArrowIcon className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                {lang === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
                <Link to="/" className="text-primary-500 hover:text-primary-600 font-medium">
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
