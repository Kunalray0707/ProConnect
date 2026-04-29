import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Building2, Star } from 'lucide-react';

const stats = [
  { icon: Users, value: '2.4M+', label: 'Professionals' },
  { icon: Briefcase, value: '180K+', label: 'Opportunities' },
  { icon: Building2, value: '45K+', label: 'Companies' },
  { icon: Star, value: '4.9/5', label: 'Avg Rating' },
];

const StatsBar: React.FC = () => (
  <section className="py-12 bg-[hsl(var(--cp-dark))] border-y border-white/10">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ icon: Icon, value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center text-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[hsl(var(--cp-indigo))]/20 flex items-center justify-center mb-1">
              <Icon className="w-5 h-5 text-[hsl(var(--cp-indigo-light))]" />
            </div>
            <span className="font-heading text-3xl font-bold text-white">{value}</span>
            <span className="text-sm text-white/50">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;