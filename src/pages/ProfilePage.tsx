
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/contexts/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileTabs from '@/components/ProfileTabs';
import MyTripsPanel from '@/components/MyTripsPanel';
import SettingsPanel from '@/components/SettingsPanel';
import PreferencesPanel from '@/components/PreferencesPanel';
import ProfileStatsWidget from '@/components/ProfileStatsWidget';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('trips');
  const { state } = useAppContext();

  // Mock user data if no user is logged in
  const userProfile = state.user || {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    studentId: 'TU2024001',
    memberSince: '2024',
    preferences: {
      notifications: true,
      theme: 'light' as const,
      language: 'en'
    }
  };

  const collegeData = state.college || {
    name: 'Tech University'
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'trips':
        return (
          <div className="space-y-6">
            <MyTripsPanel />
            <ProfileStatsWidget />
          </div>
        );
      case 'settings':
        return <SettingsPanel />;
      case 'preferences':
        return <PreferencesPanel />;
      default:
        return <MyTripsPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <ProfileHeader user={userProfile} college={collegeData} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
