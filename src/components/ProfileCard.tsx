import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, BadgeCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Professional {
  id: string;
  name: string;
  role: string;
  category: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  matchScore: number;
  skills: string[];
  verified: boolean;
  available: boolean;
  avatar: string;
  hourlyRate?: string;
}

interface ProfileCardProps {
  professional: Professional;
  index?: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ professional, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <img
            src={professional.avatar}
            alt={professional.name}
            width={56}
            height={56}
            className="w-14 h-14 rounded-xl object-cover"
          />
          {professional.available && (
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[hsl(var(--card))]" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h3 className="font-heading font-semibold text-[hsl(var(--foreground))] truncate">{professional.name}</h3>
            {professional.verified && (
              <BadgeCheck size={16} className="text-[hsl(var(--cp-blue))] flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-[hsl(var(--muted-foreground))] truncate">{professional.role}</p>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={12} className="text-[hsl(var(--muted-foreground))]" />
            <span className="text-xs text-[hsl(var(--muted-foreground))]">{professional.location} · {professional.distance}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1 bg-[hsl(var(--cp-blue))]/10 px-2 py-1 rounded-full">
            <Zap size={12} className="text-[hsl(var(--cp-blue))]" />
            <span className="text-xs font-bold text-[hsl(var(--cp-blue))]">{professional.matchScore}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-medium text-[hsl(var(--foreground))]">{professional.rating}</span>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">({professional.reviews})</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {professional.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
        {professional.skills.length > 3 && (
          <span className="px-2.5 py-1 bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] text-xs rounded-full">
            +{professional.skills.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        {professional.hourlyRate && (
          <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{professional.hourlyRate}<span className="text-xs font-normal text-[hsl(var(--muted-foreground))]">/hr</span></span>
        )}
        <Link
          to={`/profile/${professional.id}`}
          className="ml-auto px-4 py-2 rounded-full bg-gradient-to-r from-[hsl(var(--cp-blue))] to-[hsl(var(--cp-violet))] text-white text-xs font-semibold hover:scale-105 transition-all duration-200"
        >
          Connect
        </Link>
      </div>
    </motion.div>
  );
};

export default ProfileCard;