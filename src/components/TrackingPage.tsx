
import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Bus, 
  Navigation, 
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const TrackingPage = () => {
  const [selectedRoute, setSelectedRoute] = useState('42A');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const routes = [
    { id: '42A', name: 'Central Station - Airport', color: 'blue' },
    { id: '15B', name: 'Downtown - University', color: 'green' },
    { id: '33C', name: 'Mall Plaza - Tech Park', color: 'purple' },
    { id: '88D', name: 'Railway - Beach Resort', color: 'orange' }
  ];

  const busData = {
    '42A': {
      currentLocation: 'Main Street Junction',
      nextStop: 'City Center Mall',
      eta: '5 minutes',
      progress: 75,
      status: 'On Time',
      passengers: 28,
      capacity: 40,
      coordinates: { lat: 37.7749, lng: -122.4194 },
      stops: [
        { name: 'Central Station', time: '08:00', status: 'completed' },
        { name: 'Downtown Plaza', time: '08:12', status: 'completed' },
        { name: 'Main Street Junction', time: '08:25', status: 'current' },
        { name: 'City Center Mall', time: '08:30', status: 'upcoming' },
        { name: 'Business District', time: '08:42', status: 'upcoming' },
        { name: 'Airport Terminal', time: '08:55', status: 'upcoming' }
      ]
    }
  };

  const currentBus = busData[selectedRoute as keyof typeof busData] || busData['42A'];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'current': return 'bg-blue-500 animate-pulse';
      case 'upcoming': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'current': return <Bus className="h-4 w-4 text-blue-600" />;
      case 'upcoming': return <Clock className="h-4 w-4 text-gray-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Live Bus Tracking
          </h1>
          <p className="text-xl text-gray-600">
            Track your bus in real-time and get accurate arrival predictions
          </p>
        </div>

        {/* Route Selector */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Route</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {routes.map(route => (
                <button
                  key={route.id}
                  onClick={() => setSelectedRoute(route.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedRoute === route.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-gray-900">{route.id}</span>
                    <div className={`w-3 h-3 rounded-full bg-${route.color}-500`}></div>
                  </div>
                  <p className="text-sm text-gray-600 text-left">{route.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Live Map</h3>
                  <button
                    onClick={handleRefresh}
                    className={`p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors ${
                      isRefreshing ? 'animate-spin' : ''
                    }`}
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Interactive Map</p>
                    <p className="text-sm text-gray-500">Live GPS tracking integration would go here</p>
                  </div>
                </div>
                
                {/* Mock Bus Location */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg animate-pulse">
                    <Bus className="h-6 w-6" />
                  </div>
                </div>
                
                {/* Mock Route Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 50 350 Q 200 200 350 100 Q 500 50 650 150"
                    stroke="#3B82F6"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="10,5"
                    className="animate-pulse"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Bus Info Panel */}
          <div className="space-y-6">
            {/* Current Status */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Bus {selectedRoute}</h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {currentBus.status}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Current Location</p>
                    <p className="text-sm text-gray-600">{currentBus.currentLocation}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Navigation className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Next Stop</p>
                    <p className="text-sm text-gray-600">{currentBus.nextStop}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-orange-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">ETA</p>
                    <p className="text-sm text-gray-600">{currentBus.eta}</p>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Journey Progress</span>
                  <span>{currentBus.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${currentBus.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Capacity Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bus Capacity</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600">Passengers</span>
                <span className="font-bold text-gray-900">
                  {currentBus.passengers}/{currentBus.capacity}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${
                    (currentBus.passengers / currentBus.capacity) > 0.8 
                      ? 'bg-red-500' 
                      : (currentBus.passengers / currentBus.capacity) > 0.6 
                        ? 'bg-yellow-500' 
                        : 'bg-green-500'
                  }`}
                  style={{ width: `${(currentBus.passengers / currentBus.capacity) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {currentBus.capacity - currentBus.passengers} seats available
              </p>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  Book This Bus
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  Set Arrival Alert
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  Share Location
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Route Timeline */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Route Timeline</h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              
              <div className="space-y-6">
                {currentBus.stops.map((stop, index) => (
                  <div key={index} className="relative flex items-center">
                    {/* Timeline Dot */}
                    <div className={`relative z-10 w-4 h-4 rounded-full ${getStatusColor(stop.status)} mr-6`}>
                      {stop.status === 'current' && (
                        <div className="absolute -inset-1 w-6 h-6 bg-blue-200 rounded-full animate-ping"></div>
                      )}
                    </div>
                    
                    {/* Stop Info */}
                    <div className="flex-1 bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {getStatusIcon(stop.status)}
                          <h4 className={`ml-2 font-medium ${
                            stop.status === 'current' ? 'text-blue-600' : 'text-gray-900'
                          }`}>
                            {stop.name}
                          </h4>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-medium ${
                            stop.status === 'current' ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {stop.time}
                          </p>
                          {stop.status === 'current' && (
                            <p className="text-xs text-blue-500">Now</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Service Alerts */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Service Updates</h3>
            <div className="space-y-4">
              <div className="flex items-start p-4 bg-green-50 rounded-xl border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-900">All services running on time</p>
                  <p className="text-sm text-green-700">No delays reported on Route {selectedRoute}</p>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-blue-50 rounded-xl border border-blue-200">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900">Peak hours ahead</p>
                  <p className="text-sm text-blue-700">Expect higher passenger volume between 5-7 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
