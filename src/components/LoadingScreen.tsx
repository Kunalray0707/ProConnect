import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[hsl(var(--cp-dark))] via-[hsl(220,40%,8%)] to-[hsl(var(--cp-dark))]"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'backOut' }}
        className="flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--cp-blue))] to-[hsl(var(--cp-violet))] flex items-center justify-center shadow-2xl"
        >
          <Zap size={36} className="text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h1 className="font-heading text-4xl font-bold bg-gradient-to-r from-[hsl(var(--cp-blue))] to-[hsl(var(--cp-violet))] bg-clip-text text-transparent mb-2">
            ConnectPro
          </h1>
          <p className="text-white/50 text-sm">Professional Matchmaking Platform</p>
        </motion.div>

        <div className="flex items-center gap-2 mt-4">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 rounded-full bg-[hsl(var(--cp-blue))]"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;