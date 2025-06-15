
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Bell, Moon, Sun, Monitor, Globe, Smartphone, Mail, MessageSquare, Shield, Palette } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

const SettingsPanel: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [localSettings, setLocalSettings] = useState({
    notifications: state.user?.preferences?.notifications || true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    theme: state.theme || 'system',
    language: state.user?.preferences?.language || 'en',
    autoBooking: false,
    locationTracking: true,
    dataSync: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
    
    // Update global state for certain settings
    if (key === 'theme') {
      dispatch({ type: 'SET_THEME', payload: value });
    }
  };

  const accentColors = [
    { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
    { name: 'Red', value: 'red', color: 'bg-red-500' },
    { name: 'Green', value: 'green', color: 'bg-green-500' },
    { name: 'Purple', value: 'purple', color: 'bg-purple-500' },
    { name: 'Orange', value: 'orange', color: 'bg-orange-500' },
    { name: 'Pink', value: 'pink', color: 'bg-pink-500' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Appearance */}
      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5 text-blue-500" />
            <span>Appearance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Theme</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred color scheme</p>
            </div>
            <Select value={localSettings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <span>Light</span>
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center space-x-2">
                    <Moon className="h-4 w-4" />
                    <span>Dark</span>
                  </div>
                </SelectItem>
                <SelectItem value="system">
                  <div className="flex items-center space-x-2">
                    <Monitor className="h-4 w-4" />
                    <span>System</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white mb-3">Accent Color</p>
            <div className="flex flex-wrap gap-2">
              {accentColors.map((color) => (
                <button
                  key={color.value}
                  className={`w-8 h-8 rounded-full ${color.color} border-2 border-white dark:border-gray-700 shadow-sm hover:scale-110 transition-transform`}
                  style={{
                    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-green-500" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: 'notifications', label: 'Push Notifications', desc: 'Receive notifications about your bookings', icon: Smartphone },
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Get updates via email', icon: Mail },
            { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive text messages for important updates', icon: MessageSquare }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <item.icon className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
              <Switch
                checked={localSettings[item.key as keyof typeof localSettings] as boolean}
                onCheckedChange={(checked) => handleSettingChange(item.key, checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-purple-500" />
            <span>Privacy & Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: 'locationTracking', label: 'Location Tracking', desc: 'Allow app to access your location for better routes' },
            { key: 'dataSync', label: 'Data Synchronization', desc: 'Sync your data across devices' },
            { key: 'autoBooking', label: 'Auto-booking', desc: 'Automatically book recurring routes' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
              <Switch
                checked={localSettings[item.key as keyof typeof localSettings] as boolean}
                onCheckedChange={(checked) => handleSettingChange(item.key, checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-orange-500" />
            <span>Language & Region</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Language</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred language</p>
            </div>
            <Select value={localSettings.language} onValueChange={(value) => handleSettingChange('language', value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex space-x-4">
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          Save Changes
        </Button>
        <Button variant="outline" className="flex-1">
          Reset to Default
        </Button>
      </div>
    </motion.div>
  );
};

export default SettingsPanel;
