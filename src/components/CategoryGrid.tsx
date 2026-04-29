import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Stethoscope, ChefHat, Code2, Briefcase, Palette, Wrench, Music } from 'lucide-react';

const categories = [
  { icon: GraduationCap, label: 'Education', count: '320K+', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  { icon: Stethoscope, label: 'Healthcare', count: '180K+', color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  { icon: ChefHat, label: 'Culinary', count: '95K+', color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50 dark:bg-orange-950/30' },
  { icon: Code2, label: 'Technology', count: '540K+', color: 'from-violet-500 to-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/30' },
  { icon: Briefcase, label: 'Business', count: '210K+', color: 'from-yellow-500 to-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-950/30' },
  { icon: Palette, label: 'Creative', count: '130K+', color: 'from-pink-500 to-pink-600', bg: 'bg-pink-50 dark:bg-pink-950/30' },
  { icon: Wrench, label: 'Engineering', count: '160K+', color: 'from-slate-500 to-slate-600', bg: 'bg-slate-50 dark:bg-slate-950/30' },
  { icon: Music, label: 'Arts & Media', count: '75K+', color: 'from-rose-500 to-rose-600', bg: 'bg-rose-50 dark:bg-rose-950/30' },
];

const CategoryGrid: React.FC = () => (
  <section className="py-16 bg-[hsl(var(--background))]">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-heading text-3xl font-bold text-[hsl(var(--foreground))]">Browse by Category</h2>
        <p className="text-[hsl(var(--muted-foreground))] mt-3 max-w-xl mx-auto">
          Find professionals across every industry and domain
        </p>
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map(({ icon: Icon, label, count, color, bg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <Link
              to={`/discover?category=${label}`}
              className={`flex flex-col items-center gap-3 p-6 rounded-2xl ${bg} border border-[hsl(var(--border))] hover:shadow-lg transition-all duration-300 group`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-sm text-[hsl(var(--foreground))]">{label}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{count} pros</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryGrid;