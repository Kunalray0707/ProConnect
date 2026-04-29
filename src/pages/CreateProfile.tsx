import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

interface CreateProfileProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  mobileMode?: boolean;
  toggleMobileMode?: () => void;
}

const CreateProfile: React.FC<CreateProfileProps> = ({ theme, toggleTheme, mobileMode = false, toggleMobileMode = () => {} }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Developer');
  const [location, setLocation] = useState('Remote');
  const [bio, setBio] = useState('Experienced professional ready to connect.');
  const [specialty, setSpecialty] = useState('React & AI');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProfile = { id: Date.now().toString(), name, role, location, bio, specialty };
    const storedProfiles = JSON.parse(localStorage.getItem('createdProfiles') || '[]');
    localStorage.setItem('createdProfiles', JSON.stringify([...storedProfiles, newProfile]));
    toast.success('Profile created! You can now browse and connect.');
    setName('');
    setRole('Developer');
    setLocation('Remote');
    setBio('Experienced professional ready to connect.');
    setSpecialty('React & AI');
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <Header theme={theme} toggleTheme={toggleTheme} mobileMode={mobileMode} toggleMobileMode={toggleMobileMode} />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-3xl p-10 shadow-sm">
            <div className="mb-8 text-center">
              <h1 className="font-heading text-3xl font-bold text-[hsl(var(--foreground))]">Create Your Professional Profile</h1>
              <p className="text-[hsl(var(--muted-foreground))] mt-3">Build a discoverable profile for clients, partners, and teams to find you.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="w-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--cp-blue))]/30"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">Role</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--cp-blue))]/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--cp-blue))]/30"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">Specialty</label>
                <input
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--cp-blue))]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={5}
                  className="w-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--cp-blue))]/30"
                />
              </div>
              <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-[hsl(var(--cp-blue))] to-[hsl(var(--cp-violet))] px-5 py-3 text-sm font-semibold text-white hover:scale-105 transition-all duration-200">
                Publish Profile
              </button>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateProfile;
