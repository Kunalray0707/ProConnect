import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Zap, Handshake } from 'lucide-react';

const steps = [
  { icon: UserPlus, step: '01', title: 'Create Your Profile', desc: 'Build a rich professional profile with skills, certifications, and portfolio. Get verified for maximum trust.' },
  { icon: Search, step: '02', title: 'Discover Matches', desc: 'Our AI engine analyzes your profile and finds the best matches based on skills, location, and preferences.' },
  { icon: Zap, step: '03', title: 'Connect Instantly', desc: 'Send connection requests, chat in real-time, or book appointments directly through the platform.' },
  { icon: Handshake, step: '04', title: 'Collaborate & Grow', desc: 'Work together, leave reviews, and build your professional reputation on ConnectPro.' },
];

const HowItWorks: React.FC = () => (
  <section className="py-20 bg-[hsl(var(--background))]">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl font-bold text-[hsl(var(--foreground))]">How ConnectPro Works</h2>
        <p className="text-[hsl(var(--muted-foreground))] mt-3 max-w-xl mx-auto">
          From profile to partnership in four simple steps
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map(({ icon: Icon, step, title, desc }, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="relative flex flex-col items-center text-center gap-4"
          >
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-gradient-to-r from-[hsl(var(--cp-indigo))]/40 to-transparent" />
            )}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(var(--cp-indigo))] to-[hsl(var(--cp-violet))] flex items-center justify-center shadow-lg">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[hsl(var(--cp-dark))] text-white text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
            </div>
            <h3 className="font-heading font-semibold text-[hsl(var(--foreground))]">{title}</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;