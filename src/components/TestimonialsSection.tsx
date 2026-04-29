import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Math Teacher',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    text: 'ConnectPro helped me find 12 new students within a week. The AI matching is incredibly accurate — every student was a perfect fit for my teaching style.',
    rating: 5,
  },
  {
    name: 'Dr. Arjun Mehta',
    role: 'Cardiologist',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face',
    text: 'The verification system gave patients confidence in my credentials. My appointment bookings increased by 40% in the first month.',
    rating: 5,
  },
  {
    name: 'Ravi Kumar',
    role: 'Executive Chef',
    avatar: 'https://placehold.co/80x80',
    text: 'Found my dream position at a 5-star hotel through ConnectPro. The platform understood exactly what I was looking for.',
    rating: 5,
  },
  {
    name: 'Ananya Singh',
    role: 'Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
    text: 'Got 3 job offers in 2 weeks. The AI resume optimizer helped me highlight skills I didn\'t even know were valuable.',
    rating: 5,
  },
];

const TestimonialsSection: React.FC = () => (
  <section className="py-20 bg-[hsl(var(--muted))]/40">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="font-heading text-3xl font-bold text-[hsl(var(--foreground))]">Trusted by Professionals</h2>
        <p className="text-[hsl(var(--muted-foreground))] mt-3">Real stories from real people who found success</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
          >
            <Quote className="w-8 h-8 text-[hsl(var(--cp-indigo))]/30 mb-4" />
            <p className="text-[hsl(var(--foreground))] leading-relaxed mb-6 text-sm">{t.text}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} width={44} height={44} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-sm text-[hsl(var(--foreground))]">{t.name}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;