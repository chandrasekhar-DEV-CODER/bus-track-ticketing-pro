
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  Heart, 
  Ticket, 
  QrCode, 
  Download, 
  X, 
  Bell, 
  Globe, 
  CreditCard,
  MapPin,
  Calendar,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEnhancedTheme } from '@/contexts/EnhancedThemeContext';
import AccentColorPicker from '@/components/ui/AccentColorPicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('trips');
  const { theme, toggleTheme } = useEnhancedTheme();

  const userProfile = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    college: 'Tech University',
    studentId: 'TU2024001',
    avatar: null,
    memberSince: '2024'
  };

  const upcomingTrips = [
    {
      id: '1',
      route: '42A',
      from: 'Central Station',
      to: 'Airport Terminal',
      date: '2024-06-16',
      time: '09:30',
      fare: '$4.50',
      status: 'confirmed'
    },
    {
      id: '2',
      route: '15B',
      from: 'Downtown Plaza',
      to: 'University Campus',
      date: '2024-06-18',
      time: '14:15',
      fare: '$3.25',
      status: 'confirmed'
    }
  ];

  const pastTrips = [
    {
      id: '3',
      route: '33C',
      from: 'Mall Plaza',
      to: 'Tech Park',
      date: '2024-06-14',
      time: '16:45',
      fare: '$3.75',
      status: 'completed'
    }
  ];

  const tabs = [
    { id: 'trips', label: 'My Trips', icon: Ticket },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'preferences', label: 'Preferences', icon: Heart }
  ];

  const renderTripsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Upcoming Trips</h3>
        <div className="space-y-3">
          {upcomingTrips.map((trip) => (
            <motion.div
              key={trip.id}
              className="glass rounded-2xl p-4 border border-white/20 dark:border-gray-700/50"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-red-500/20 p-3 rounded-xl">
                    <Ticket className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Route {trip.route}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{trip.from} → {trip.to}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {trip.date}
                      </span>
                      <span className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {trip.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900 dark:text-white">{trip.fare}</span>
                  <div className="flex space-x-1">
                    <button className="p-2 rounded-lg bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 transition-colors">
                      <QrCode className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Past Trips</h3>
        <div className="space-y-3">
          {pastTrips.map((trip) => (
            <div
              key={trip.id}
              className="glass rounded-2xl p-4 border border-white/20 dark:border-gray-700/50 opacity-75"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-500/20 p-3 rounded-xl">
                    <Ticket className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Route {trip.route}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{trip.from} → {trip.to}</p>
                    <span className="text-xs text-gray-500">{trip.date} at {trip.time}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900 dark:text-white">{trip.fare}</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Completed
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Theme & Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Accent Color</span>
            <AccentColorPicker />
          </div>
        </CardContent>
      </Card>

      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">ETA Alerts</span>
            </div>
            <input type="checkbox" className="rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Service Updates</span>
            </div>
            <input type="checkbox" className="rounded" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Default Routes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Default Start</label>
              <select className="w-full p-2 rounded-lg glass border border-white/20 dark:border-gray-700/50">
                <option>Central Station</option>
                <option>Downtown Plaza</option>
                <option>University Campus</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Default Destination</label>
              <select className="w-full p-2 rounded-lg glass border border-white/20 dark:border-gray-700/50">
                <option>Airport Terminal</option>
                <option>Tech Park</option>
                <option>Mall Plaza</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Payment & Language</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Saved Payment Methods</span>
            </div>
            <button className="text-red-500 hover:text-red-600">Manage</button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Language</span>
            </div>
            <select className="p-2 rounded-lg glass border border-white/20 dark:border-gray-700/50">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass border-white/20 dark:border-gray-700/50">
              <CardContent className="p-6 text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="bg-red-500 text-white text-xl">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {userProfile.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {userProfile.email}
                </p>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>{userProfile.college}</p>
                  <p>ID: {userProfile.studentId}</p>
                  <p>Member since {userProfile.memberSince}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="glass rounded-2xl p-1 mb-6 border border-white/20 dark:border-gray-700/50">
              <div className="flex space-x-1">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 flex-1 justify-center ${
                      activeTab === tab.id
                        ? 'bg-red-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'trips' && renderTripsTab()}
              {activeTab === 'settings' && renderSettingsTab()}
              {activeTab === 'preferences' && renderPreferencesTab()}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
