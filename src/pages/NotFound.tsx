import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => (
  <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center max-w-md"
    >
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--cp-indigo))] to-[hsl(var(--cp-violet))] flex items-center justify-center mx-auto mb-6 shadow-xl">
        <Zap className="w-10 h-10 text-white" />
      </div>
      <h1 className="font-heading text-6xl font-bold text-[hsl(var(--foreground))] mb-4">404</h1>
      <p className="text-[hsl(var(--muted-foreground))] mb-8 leading-relaxed">
        This page doesn't exist. Let's get you back to finding the right professional connection.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[hsl(var(--cp-indigo))] to-[hsl(var(--cp-violet))] text-white font-semibold hover:scale-105 hover:shadow-lg transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
    </motion.div>
  </div>
);

export default NotFound;