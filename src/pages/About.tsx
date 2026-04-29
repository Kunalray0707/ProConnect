import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, Globe, Award, Heart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface AboutProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const values = [
  { icon: Shield, title: 'Trust & Safety', desc: 'Every professional is verified through our rigorous document verification system.' },
  { icon: Zap, title: 'AI-Powered', desc: 'Our matching algorithm learns from millions of connections to find your perfect match.' },
  { icon: Users, title: 'Community First', desc: 'We build tools that empower professionals to grow together.' },
  { icon: Globe, title: 'Inclusive Platform', desc: 'Supporting professionals across every industry, language, and location.' },
  { icon: Award, title: 'Excellence', desc: 'We hold ourselves to the highest standards in everything we build.' },
  { icon: Heart, title: 'Human Connection', desc: 'Technology is the bridge, but human relationships are the destination.' },
];

const team = [
  { name: 'Aditya Sharma', role: 'CEO & Co-founder', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
  { name: 'Priya Nair', role: 'CTO & Co-founder', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
  { name: 'Rohan Mehta', role: 'Head of Product', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' },
  { name: 'Sneha Kapoor', role: 'Head of Design', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face' },
];

const About: React.FC<AboutProps> = ({ theme, toggleTheme }) => {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <div className="pt-16">
        {/* Hero */}
        <section className="py-24 bg-gradient-to-br from-[hsl(var(--cp-dark))] to-[hsl(260,25%,12%)]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-5xl font-bold text-white mb-6">
              About ConnectPro
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
              We're on a mission to eliminate the friction in professional discovery. Whether you're a student looking for a tutor, a hospital seeking nurses, or a restaurant hiring chefs — ConnectPro makes the right connection happen instantly.
            </motion.p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-[hsl(var(--background))]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading text-3xl font-bold text-[hsl(var(--foreground))] mb-6">Our Mission</h2>
              <p className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed">
                ConnectPro was founded in 2024 with a simple belief: the right professional connection can change lives. We've built a platform that uses AI, location intelligence, and verified profiles to make professional matchmaking as natural as a conversation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-[hsl(var(--muted))]/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-heading text-3xl font-bold text-[hsl(var(--foreground))] text-center mb-12">
              Our Values
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(var(--cp-indigo))] to-[hsl(var(--cp-violet))] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-[hsl(var(--foreground))] mb-2">{title}</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-[hsl(var(--background))]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-heading text-3xl font-bold text-[hsl(var(--foreground))] text-center mb-12">
              Meet the Team
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {team.map(({ name, role, avatar }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center gap-3"
                >
                  <img src={avatar} alt={name} width={80} height={80} className="w-20 h-20 rounded-2xl object-cover border-2 border-[hsl(var(--border))]" />
                  <div>
                    <p className="font-semibold text-sm text-[hsl(var(--foreground))]">{name}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;