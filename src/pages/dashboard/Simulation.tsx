import { useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Play, ArrowDown, Leaf, Coins, TrendingDown, Award } from 'lucide-react';
import { useApp } from '../../lib/context';
import { t } from '../../lib/i18n';

interface SliderConfig {
  key: string;
  icon: typeof FlaskConical;
  label: string;
  value: number;
  unit: string;
  color: string;
}

export default function Simulation() {
  const { lang } = useApp();
  const [running, setRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [sliders, setSliders] = useState<SliderConfig[]>([
    { key: 'acUsage', icon: FlaskConical, label: 'acUsage', value: 100, unit: '%', color: 'bg-blue-500' },
    { key: 'waterConsumption', icon: FlaskConical, label: 'waterConsumption', value: 100, unit: '%', color: 'bg-cyan-500' },
    { key: 'solarEnergy', icon: FlaskConical, label: 'solarEnergy', value: 0, unit: '%', color: 'bg-yellow-500' },
    { key: 'transportationUsage', icon: FlaskConical, label: 'transportationUsage', value: 100, unit: '%', color: 'bg-orange-500' },
  ]);

  const updateSlider = (index: number, value: number) => {
    setSliders((prev) => prev.map((s, i) => (i === index ? { ...s, value } : s)));
    setShowResults(false);
  };

  const runSimulation = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setShowResults(true);
    }, 1500);
  };

  const currentCarbon = 125;
  const acFactor = sliders[0].value / 100;
  const waterFactor = sliders[1].value / 100;
  const solarFactor = sliders[2].value / 100;
  const transportFactor = sliders[3].value / 100;

  const optimizedCarbon = Math.round(
    currentCarbon * (0.4 * acFactor + 0.2 * waterFactor + 0.25 * transportFactor - 0.15 * solarFactor + 0.3)
  );
  const reduction = Math.max(0, Math.round(((currentCarbon - optimizedCarbon) / currentCarbon) * 100));
  const savings = Math.round(reduction * 400);
  const currentScore = 89;
  const newScore = Math.min(100, currentScore + Math.round(reduction / 3));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold">{t('simulation', lang)}</h2>

      {/* Sliders */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-6">{t('whatIfSimulator', lang)}</h3>
        <div className="space-y-6">
          {sliders.map((slider, i) => (
            <div key={slider.key}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{t(slider.label as any, lang)}</span>
                <span className="text-sm font-bold text-primary-500">{slider.value}{slider.unit}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={slider.value}
                onChange={(e) => updateSlider(i, parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[var(--bg-secondary)] accent-primary-500"
              />
              <div className="flex justify-between mt-1 text-xs text-[var(--text-secondary)]">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={runSimulation}
          disabled={running}
          className="w-full mt-8 btn-primary flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {running ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          {t('runSimulationBtn', lang)}
        </button>
      </div>

      {/* Results */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold mb-6">{lang === 'ar' ? 'النتائج' : 'Results'}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="text-center p-4 rounded-xl bg-[var(--bg-secondary)]">
              <Leaf className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-xs text-[var(--text-secondary)] mb-1">{t('currentCarbon', lang)}</div>
              <div className="text-xl font-bold">{currentCarbon} tCO₂</div>
            </div>

            <div className="flex items-center justify-center">
              <ArrowDown className="w-5 h-5 text-[var(--text-secondary)]" />
            </div>

            <div className="text-center p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
              <Leaf className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-xs text-green-600 dark:text-green-400 mb-1">{t('optimizedCarbon', lang)}</div>
              <div className="text-xl font-bold text-green-600 dark:text-green-400">{optimizedCarbon} tCO₂</div>
            </div>

            <div className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
              <TrendingDown className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">{t('reduction', lang)}</div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{reduction}%</div>
            </div>

            <div className="text-center p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20">
              <Coins className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-xs text-yellow-600 dark:text-yellow-400 mb-1">{t('savings', lang)}</div>
              <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{savings.toLocaleString()} SAR</div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-center">
            <Award className="w-6 h-6 text-primary-500 mx-auto mb-2" />
            <div className="text-sm text-[var(--text-secondary)]">{t('score', lang)}</div>
            <div className="text-2xl font-bold text-primary-500">
              {currentScore} → {newScore}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
