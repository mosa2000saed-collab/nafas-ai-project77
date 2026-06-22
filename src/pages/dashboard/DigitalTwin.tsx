import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Thermometer, Users, Wind, Zap, Leaf, X } from 'lucide-react';
import { useApp } from '../../lib/context';
import { t } from '../../lib/i18n';

interface BuildingRoom {
  id: string;
  name: string;
  nameAr: string;
  type: 'classroom' | 'lab' | 'library' | 'cafeteria' | 'admin';
  status: 'normal' | 'warning' | 'critical';
  temperature: number;
  students: number;
  acStatus: boolean;
  energyUsage: number;
  carbonImpact: number;
}

const buildings: BuildingRoom[] = [
  { id: 'c1', name: 'Classroom 101', nameAr: 'فصل 101', type: 'classroom', status: 'normal', temperature: 24, students: 31, acStatus: true, energyUsage: 34, carbonImpact: 2.8 },
  { id: 'c2', name: 'Classroom 102', nameAr: 'فصل 102', type: 'classroom', status: 'warning', temperature: 26, students: 28, acStatus: true, energyUsage: 42, carbonImpact: 3.5 },
  { id: 'l1', name: 'Science Lab', nameAr: 'مختبر العلوم', type: 'lab', status: 'normal', temperature: 22, students: 16, acStatus: true, energyUsage: 58, carbonImpact: 4.2 },
  { id: 'l2', name: 'Computer Lab', nameAr: 'مختبر الحاسب', type: 'lab', status: 'normal', temperature: 23, students: 20, acStatus: true, energyUsage: 65, carbonImpact: 4.8 },
  { id: 'lib', name: 'Library', nameAr: 'المكتبة', type: 'library', status: 'normal', temperature: 23, students: 45, acStatus: true, energyUsage: 28, carbonImpact: 2.1 },
  { id: 'caf', name: 'Cafeteria', nameAr: 'الكافتيريا', type: 'cafeteria', status: 'critical', temperature: 28, students: 120, acStatus: false, energyUsage: 78, carbonImpact: 6.1 },
  { id: 'adm', name: 'Administration', nameAr: 'الإدارة', type: 'admin', status: 'normal', temperature: 24, students: 0, acStatus: true, energyUsage: 22, carbonImpact: 1.8 },
];

const statusColors = {
  normal: 'bg-palm-500',
  warning: 'bg-gold',
  critical: 'bg-red-500',
};

export default function DigitalTwin() {
  const { lang } = useApp();
  const [selectedRoom, setSelectedRoom] = useState<BuildingRoom | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredBuildings = filter === 'all' ? buildings : buildings.filter((b) => b.type === filter);

  const buildingTypes = [
    { key: 'all', label: lang === 'ar' ? 'الكل' : 'All' },
    { key: 'classroom', label: lang === 'ar' ? 'فصول' : 'Classrooms' },
    { key: 'lab', label: lang === 'ar' ? 'مختبرات' : 'Labs' },
    { key: 'library', label: lang === 'ar' ? 'مكتبة' : 'Library' },
    { key: 'cafeteria', label: lang === 'ar' ? 'كافتيريا' : 'Cafeteria' },
    { key: 'admin', label: lang === 'ar' ? 'إدارة' : 'Admin' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-display">{t('digitalTwinNav', lang)}</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-palm-500" />
              <span className="text-[var(--text-secondary)]">{t('normal', lang)}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-gold" />
              <span className="text-[var(--text-secondary)]">{t('warning', lang)}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-[var(--text-secondary)]">{t('critical', lang)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {buildingTypes.map((type) => (
          <button
            key={type.key}
            onClick={() => setFilter(type.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === type.key
                ? 'bg-saudi-green text-white shadow-lg shadow-saudi-green/20'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* School Map */}
      <div className="card-saudi p-6">
        <h3 className="text-lg font-semibold mb-4">{t('schoolModel', lang)}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBuildings.map((room) => (
            <motion.button
              key={room.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRoom(room)}
              className={`relative p-5 rounded-xl border-2 transition-all text-left ${
                room.status === 'normal'
                  ? 'border-palm-200 dark:border-palm-900/50 bg-palm-50/50 dark:bg-palm-900/10'
                  : room.status === 'warning'
                  ? 'border-gold/50 dark:border-gold/30 bg-gold-light'
                  : 'border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10'
              }`}
            >
              <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${statusColors[room.status]}`} />
              <Building2 className={`w-8 h-8 mb-3 ${
                room.status === 'normal'
                  ? 'text-palm-500'
                  : room.status === 'warning'
                  ? 'text-gold'
                  : 'text-red-500'
              }`} />
              <div className="font-medium text-sm">{lang === 'ar' ? room.nameAr : room.name}</div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                {room.energyUsage} kWh
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Room Detail Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRoom(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold font-display">{lang === 'ar' ? selectedRoom.nameAr : selectedRoom.name}</h3>
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-secondary)]">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Thermometer className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--text-secondary)]">{t('temperature', lang)}</div>
                    <div className="font-semibold">{selectedRoom.temperature}°C</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-secondary)]">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--text-secondary)]">{t('students', lang)}</div>
                    <div className="font-semibold">{selectedRoom.students}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-secondary)]">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                    <Wind className="w-5 h-5 text-cyan-500" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--text-secondary)]">{t('acStatus', lang)}</div>
                    <div className="font-semibold">{selectedRoom.acStatus ? t('running', lang) : 'Off'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-secondary)]">
                  <div className="w-10 h-10 rounded-xl bg-gold-light flex items-center justify-center">
                    <Zap className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--text-secondary)]">{t('energyUsage', lang)}</div>
                    <div className="font-semibold">{selectedRoom.energyUsage} kWh</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-secondary)]">
                  <div className="w-10 h-10 rounded-xl bg-palm-100 dark:bg-palm-900/30 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-palm-500" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--text-secondary)]">{t('carbonImpact', lang)}</div>
                    <div className="font-semibold">{selectedRoom.carbonImpact}%</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-secondary)]">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-900/30 flex items-center justify-center">
                    <div className={`w-3 h-3 rounded-full ${statusColors[selectedRoom.status]}`} />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--text-secondary)]">{t('sustainabilityScoreNav', lang)}</div>
                    <div className="font-semibold">{t(selectedRoom.status, lang)}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
