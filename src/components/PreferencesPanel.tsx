
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, CreditCard, Plus, Trash2, Edit } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  name: string;
  details: string;
  isDefault: boolean;
}

const PreferencesPanel: React.FC = () => {
  const [defaultStart, setDefaultStart] = useState('downtown-plaza');
  const [defaultDestination, setDefaultDestination] = useState('tech-park');
  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'Visa ****1234',
      details: 'Expires 12/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'paypal',
      name: 'PayPal',
      details: 'sarah.johnson@email.com',
      isDefault: false
    }
  ]);

  const locations = [
    { value: 'downtown-plaza', label: 'Downtown Plaza' },
    { value: 'tech-park', label: 'Tech Park' },
    { value: 'university-campus', label: 'University Campus' },
    { value: 'mall-district', label: 'Mall District' },
    { value: 'airport-terminal', label: 'Airport Terminal' },
    { value: 'city-center', label: 'City Center' }
  ];

  const getPaymentIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'card':
        return <CreditCard className="h-4 w-4" />;
      case 'paypal':
        return <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">P</div>;
      case 'bank':
        return <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">B</div>;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Default Routes */}
      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Default Routes</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Default Start Location
            </label>
            <Select value={defaultStart} onValueChange={setDefaultStart}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your usual starting point" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Default Destination
            </label>
            <Select value={defaultDestination} onValueChange={setDefaultDestination}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your usual destination" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              💡 These locations will be pre-filled when booking tickets to save you time.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payment & Language */}
      <Card className="glass border-white/20 dark:border-gray-700/50">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Payment & Language</span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Saved Payment Methods */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Saved Payment Methods
              </h4>
              <Button size="sm" className="bg-red-500 hover:bg-red-600">
                <Plus className="h-4 w-4 mr-1" />
                Add New
              </Button>
            </div>

            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {getPaymentIcon(method.type)}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {method.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {method.details}
                      </p>
                    </div>
                    {method.isDefault && (
                      <Badge variant="secondary" className="ml-2">
                        Default
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-3">
              Manage Payment Methods
            </Button>
          </div>

          {/* Language Settings */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <Select defaultValue="en">
              <SelectTrigger>
                <SelectValue placeholder="Select your preferred language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇺🇸 English</SelectItem>
                <SelectItem value="es">🇪🇸 Español</SelectItem>
                <SelectItem value="fr">🇫🇷 Français</SelectItem>
                <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                <SelectItem value="zh">🇨🇳 中文</SelectItem>
                <SelectItem value="ja">🇯🇵 日本語</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              Quick Actions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button variant="outline">Export Data</Button>
              <Button variant="outline">Clear History</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PreferencesPanel;
