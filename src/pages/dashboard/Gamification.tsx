import { motion } from 'framer-motion';
import { Trophy, Zap, Droplets, Recycle, Medal, Crown, Star, Award } from 'lucide-react';
import { useApp } from '../../lib/context';
import { t } from '../../lib/i18n';

const challenges = [
  { key: 'saveEnergy', icon: Zap, progress: 78, target: 100, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { key: 'reduceWater', icon: Droplets, progress: 62, target: 100, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { key: 'recyclingChallenge', icon: Recycle, progress: 45, target: 100, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
];

const leaderboard = [
  { rank: 1, name: 'Class 10-A', score: 2450, icon: Crown, color: 'text-yellow-500' },
  { rank: 2, name: 'Class 9-B', score: 2180, icon: Medal, color: 'text-gray-400' },
  { rank: 3, name: 'Class 11-C', score: 1950, icon: Medal, color: 'text-orange-400' },
  { rank: 4, name: 'Class 8-A', score: 1720, icon: Star, color: 'text-[var(--text-secondary)]' },
  { rank: 5, name: 'Class 12-B', score: 1580, icon: Star, color: 'text-[var(--text-secondary)]' },
];

const badges = [
  { key: 'ecoHero', icon: Award, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30', earned: true },
  { key: 'greenLeader', icon: Crown, color: 'text-primary-500', bg: 'bg-primary-100 dark:bg-primary-900/30', earned: true },
  { key: 'energyGuardian', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30', earned: false },
  { key: 'waterSaver', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', earned: true },
  { key: 'carbonChampion', icon: Trophy, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30', earned: false },
];

export default function Gamification() {
  const { lang } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold">{t('gamificationNav', lang)}</h2>

      {/* Challenges */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">{t('challenges', lang)}</h3>
        <div className="space-y-5">
          {challenges.map((challenge) => (
            <div key={challenge.key}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${challenge.bg} flex items-center justify-center`}>
                    <challenge.icon className={`w-5 h-5 ${challenge.color}`} />
                  </div>
                  <span className="font-medium">{t(challenge.key as any, lang)}</span>
                </div>
                <span className="text-sm font-bold text-primary-500">
                  {challenge.progress}/{challenge.target}
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Leaderboard */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">{t('leaderboard', lang)}</h3>
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: entry.rank * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  entry.rank === 1
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50'
                    : 'bg-[var(--bg-secondary)]'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  entry.rank === 1
                    ? 'bg-yellow-500 text-white'
                    : entry.rank === 2
                    ? 'bg-gray-400 text-white'
                    : entry.rank === 3
                    ? 'bg-orange-400 text-white'
                    : 'bg-[var(--border-color)] text-[var(--text-secondary)]'
                }`}>
                  {entry.rank}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{entry.name}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{entry.score} pts</div>
                </div>
                <entry.icon className={`w-5 h-5 ${entry.color}`} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">{t('badges', lang)}</h3>
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge) => (
              <motion.div
                key={badge.key}
                whileHover={{ scale: 1.03 }}
                className={`flex flex-col items-center gap-3 p-5 rounded-xl transition-all ${
                  badge.earned
                    ? `${badge.bg}`
                    : 'bg-[var(--bg-secondary)] opacity-50'
                }`}
              >
                <badge.icon className={`w-10 h-10 ${badge.color}`} />
                <span className="text-sm font-medium text-center">{t(badge.key as any, lang)}</span>
                {badge.earned && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium">
                    {lang === 'ar' ? 'مكتسب' : 'Earned'}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
