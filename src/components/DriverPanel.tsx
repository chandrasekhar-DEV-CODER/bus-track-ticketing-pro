
import { useState } from 'react';
import { 
  Play, 
  Square, 
  MapPin, 
  Users, 
  QrCode, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Navigation,
  Phone
} from 'lucide-react';

const DriverPanel = () => {
  const [tripStatus, setTripStatus] = useState('inactive'); // inactive, active, paused
  const [scannedTickets, setScannedTickets] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState('Central Station');

  const driverInfo = {
    name: 'John Anderson',
    id: 'DRV-001',
    busNumber: '42A',
    route: 'Central Station → Airport Terminal',
    license: 'DL-AB123456'
  };

  const passengers = [
    { id: 'SB-2024-001234', name: 'Sarah Johnson', seat: '15', status: 'checked-in', boardingStop: 'Central Station' },
    { id: 'SB-2024-001235', name: 'Mike Chen', seat: '8', status: 'pending', boardingStop: 'Downtown Plaza' },
    { id: 'SB-2024-001236', name: 'Emily Davis', seat: '22', status: 'checked-in', boardingStop: 'Central Station' },
    { id: 'SB-2024-001237', name: 'David Wilson', seat: '5', status: 'pending', boardingStop: 'City Center Mall' }
  ];

  const routeStops = [
    { name: 'Central Station', time: '08:00', status: 'completed' },
    { name: 'Downtown Plaza', time: '08:12', status: 'current' },
    { name: 'Main Street Junction', time: '08:25', status: 'upcoming' },
    { name: 'City Center Mall', time: '08:30', status: 'upcoming' },
    { name: 'Business District', time: '08:42', status: 'upcoming' },
    { name: 'Airport Terminal', time: '08:55', status: 'upcoming' }
  ];

  const handleTripToggle = () => {
    if (tripStatus === 'inactive') {
      setTripStatus('active');
    } else if (tripStatus === 'active') {
      setTripStatus('inactive');
    }
  };

  const handleTicketScan = (ticketId: string) => {
    if (!scannedTickets.includes(ticketId)) {
      setScannedTickets([...scannedTickets, ticketId]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'current': return 'bg-blue-500 animate-pulse';
      case 'upcoming': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Driver Dashboard</h1>
              <p className="text-gray-600">Welcome back, {driverInfo.name}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Bus {driverInfo.busNumber}</div>
              <div className="text-lg font-semibold text-blue-600">{driverInfo.route}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Controls */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trip Control */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Trip Control</h3>
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className={`text-lg font-semibold mb-2 ${
                    tripStatus === 'active' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    Trip Status: {tripStatus === 'active' ? 'Active' : 'Inactive'}
                  </div>
                  <div className="text-sm text-gray-600">
                    Current Location: {currentLocation}
                  </div>
                </div>
                
                <button
                  onClick={handleTripToggle}
                  className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    tripStatus === 'active'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {tripStatus === 'active' ? (
                    <>
                      <Square className="h-6 w-6" />
                      End Trip
                    </>
                  ) : (
                    <>
                      <Play className="h-6 w-6" />
                      Start Trip
                    </>
                  )}
                </button>
              </div>

              {tripStatus === 'active' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">Trip in progress</span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    GPS tracking is active. Passengers can see your live location.
                  </p>
                </div>
              )}
            </div>

            {/* QR Scanner */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Ticket Scanner</h3>
              
              <div className="text-center mb-6">
                <div className="bg-gray-100 rounded-2xl p-8 mb-4">
                  <QrCode className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Point camera at QR code</p>
                  <p className="text-sm text-gray-500">Tap to activate scanner</p>
                </div>
                
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  Open Scanner
                </button>
              </div>

              {/* Quick Scan Buttons for Demo */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-3">Quick scan (Demo):</p>
                <div className="flex gap-2 flex-wrap">
                  {passengers.filter(p => p.status === 'pending').map(passenger => (
                    <button
                      key={passenger.id}
                      onClick={() => handleTicketScan(passenger.id)}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                    >
                      Scan {passenger.id.slice(-4)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Route Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Route Progress</h3>
              
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                
                <div className="space-y-6">
                  {routeStops.map((stop, index) => (
                    <div key={index} className="relative flex items-center">
                      <div className={`relative z-10 w-4 h-4 rounded-full ${getStatusColor(stop.status)} mr-6`}>
                        {stop.status === 'current' && (
                          <div className="absolute -inset-1 w-6 h-6 bg-blue-200 rounded-full animate-ping"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className={`font-medium ${
                              stop.status === 'current' ? 'text-blue-600' : 'text-gray-900'
                            }`}>
                              {stop.name}
                            </h4>
                            {stop.status === 'current' && (
                              <p className="text-sm text-blue-600">Current Stop</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-600">{stop.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Driver Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{driverInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Driver ID</p>
                  <p className="font-medium">{driverInfo.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">License</p>
                  <p className="font-medium">{driverInfo.license}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bus Number</p>
                  <p className="font-medium">{driverInfo.busNumber}</p>
                </div>
              </div>
            </div>

            {/* Passenger List */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Passengers ({passengers.length})
              </h3>
              
              <div className="space-y-3">
                {passengers.map(passenger => (
                  <div 
                    key={passenger.id}
                    className={`p-3 rounded-xl border ${
                      scannedTickets.includes(passenger.id) || passenger.status === 'checked-in'
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{passenger.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        scannedTickets.includes(passenger.id) || passenger.status === 'checked-in'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {scannedTickets.includes(passenger.id) || passenger.status === 'checked-in' 
                          ? 'Checked In' 
                          : 'Pending'
                        }
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Seat {passenger.seat}</span>
                      <span>{passenger.boardingStop}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  <Navigation className="h-4 w-4" />
                  Update Location
                </button>
                <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  <Users className="h-4 w-4" />
                  Passenger Report
                </button>
                <button className="w-full flex items-center justify-center gap-2 border border-red-300 text-red-600 py-3 px-4 rounded-xl font-medium hover:bg-red-50 transition-colors">
                  <AlertTriangle className="h-4 w-4" />
                  Emergency Alert
                </button>
                <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  <Phone className="h-4 w-4" />
                  Contact Dispatch
                </button>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trips Completed</span>
                  <span className="font-bold text-blue-600">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Passengers Served</span>
                  <span className="font-bold text-green-600">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">On-Time Performance</span>
                  <span className="font-bold text-green-600">98%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Distance Covered</span>
                  <span className="font-bold text-purple-600">85 km</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverPanel;
