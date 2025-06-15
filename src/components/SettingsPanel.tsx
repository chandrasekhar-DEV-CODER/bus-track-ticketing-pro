
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Moon, Sun, Palette, Globe } from 'lucide-react';
import { useEnhancedTheme } from '@/contexts/EnhancedThemeContext';

const SettingsPanel: React.FC = () => {
  const { theme, accentColor, toggleTheme, setAccentColor } = useEnhancedTheme();
  const [notifications, setNotifications] = useState({
    bookingReminders: true,
    routeUpdates: true,
    promotions: false,
    maintenance: true
  });

  const accentColors = [
    { name: 'Red', value: 'red' as const, color: '#EF4444' },
    { name: 'Blue', value: 'blue' as const, color: '#3B82F6' },
    { name: 'Green', value: 'green' as const, color: '#10B981' },
    { name: 'Purple', value: 'purple' as const, color: '#8B5CF6' },
    { name: 'Orange', value: 'orange' as const, color: '#F59E0B' },
    { name: 'Pink', value: 'pink' as const, color: '#EC4899' }
  ];

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Theme Settings */}
      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <span>Appearance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {theme === 'dark' ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Dark Mode
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Switch between light and dark themes
                </p>
              </div>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>

          {/* Accent Color Picker */}
          <div>
            <p className="font-medium text-gray-900 dark:text-white mb-3">
              Accent Color
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {accentColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setAccentColor(color.value)}
                  className={`w-12 h-12 rounded-full transition-all duration-200 hover:scale-110 ${
                    accentColor === color.value
                      ? 'ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-800'
                      : 'hover:ring-2 ring-offset-1 ring-offset-white dark:ring-offset-gray-800'
                  }`}
                  style={{ 
                    backgroundColor: color.color,
                    ringColor: color.color
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Booking Reminders
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get notified about upcoming trips
              </p>
            </div>
            <Switch
              checked={notifications.bookingReminders}
              onCheckedChange={() => handleNotificationChange('bookingReminders')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Route Updates
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Real-time updates about route changes
              </p>
            </div>
            <Switch
              checked={notifications.routeUpdates}
              onCheckedChange={() => handleNotificationChange('routeUpdates')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Promotions
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Special offers and discounts
              </p>
            </div>
            <Switch
              checked={notifications.promotions}
              onCheckedChange={() => handleNotificationChange('promotions')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Maintenance Alerts
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Service disruptions and maintenance
              </p>
            </div>
            <Switch
              checked={notifications.maintenance}
              onCheckedChange={() => handleNotificationChange('maintenance')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Account</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <Select defaultValue="en">
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" className="flex-1">
              Change Password
            </Button>
            <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SettingsPanel;
