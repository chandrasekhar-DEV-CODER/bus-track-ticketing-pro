
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ticket, MapPin, Clock, Calendar } from 'lucide-react';

interface Trip {
  id: string;
  route: string;
  from: string;
  to: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  seats: number;
  fare: number;
}

const MyTripsPanel: React.FC = () => {
  // Mock trip data - replace with actual data from context/API
  const trips: Trip[] = [
    {
      id: '1',
      route: 'Route 42A',
      from: 'Downtown Plaza',
      to: 'Tech Park',
      date: '2024-01-15',
      time: '09:30',
      status: 'upcoming',
      seats: 2,
      fare: 8.50
    },
    {
      id: '2',
      route: 'Route 15B',
      from: 'University Campus',
      to: 'Mall District',
      date: '2024-01-10',
      time: '14:15',
      status: 'completed',
      seats: 1,
      fare: 6.25
    },
    {
      id: '3',
      route: 'Route 28C',
      from: 'Airport Terminal',
      to: 'City Center',
      date: '2024-01-12',
      time: '18:45',
      status: 'cancelled',
      seats: 3,
      fare: 12.00
    }
  ];

  const getStatusColor = (status: Trip['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Trip['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (trips.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <Ticket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No trips yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Book your first bus ticket to see your trips here
        </p>
        <Button className="bg-red-500 hover:bg-red-600">
          Book a Ticket
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          My Trips ({trips.length})
        </h3>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <div className="grid gap-4">
        {trips.map((trip, index) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass border-white/20 dark:border-gray-700/50 hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                      {trip.route}
                    </CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{trip.from}</span>
                      <span>→</span>
                      <span>{trip.to}</span>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(trip.status)} text-white`}>
                    {getStatusText(trip.status)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{trip.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{trip.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Ticket className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{trip.seats} seat{trip.seats > 1 ? 's' : ''}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${trip.fare.toFixed(2)}
                    </span>
                  </div>
                </div>

                {trip.status === 'upcoming' && (
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Ticket
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-red-600 hover:text-red-700">
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MyTripsPanel;
