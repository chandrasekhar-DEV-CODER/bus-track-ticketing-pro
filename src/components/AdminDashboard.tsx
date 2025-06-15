
import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Users, 
  Bus, 
  Route, 
  DollarSign, 
  TrendingUp, 
  MapPin,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalRevenue: 45680,
    totalTrips: 1250,
    totalUsers: 3420,
    activeBuses: 45
  };

  const revenueData = [
    { month: 'Jan', revenue: 35000 },
    { month: 'Feb', revenue: 42000 },
    { month: 'Mar', revenue: 38000 },
    { month: 'Apr', revenue: 51000 },
    { month: 'May', revenue: 45000 },
    { month: 'Jun', revenue: 48000 }
  ];

  const tripData = [
    { day: 'Mon', trips: 180 },
    { day: 'Tue', trips: 165 },
    { day: 'Wed', trips: 200 },
    { day: 'Thu', trips: 175 },
    { day: 'Fri', trips: 220 },
    { day: 'Sat', trips: 145 },
    { day: 'Sun', trips: 120 }
  ];

  const routeData = [
    { name: 'Route 42A', value: 35, color: '#0066ff' },
    { name: 'Route 15B', value: 25, color: '#00c896' },
    { name: 'Route 33C', value: 20, color: '#ffb400' },
    { name: 'Route 88D', value: 20, color: '#ff6b6b' }
  ];

  const buses = [
    { id: 'BS-001', number: '42A', driver: 'John Anderson', status: 'active', route: 'Central-Airport', passengers: 28 },
    { id: 'BS-002', number: '15B', driver: 'Sarah Wilson', status: 'active', route: 'Downtown-University', passengers: 15 },
    { id: 'BS-003', number: '33C', driver: 'Mike Johnson', status: 'maintenance', route: 'Mall-TechPark', passengers: 0 },
    { id: 'BS-004', number: '88D', driver: 'Emily Davis', status: 'active', route: 'Railway-Beach', passengers: 22 }
  ];

  const routes = [
    { id: 'RT-001', name: 'Central Station → Airport', distance: '15.2 km', stops: 8, fare: 25, status: 'active' },
    { id: 'RT-002', name: 'Downtown → University', distance: '8.5 km', stops: 6, fare: 15, status: 'active' },
    { id: 'RT-003', name: 'Mall Plaza → Tech Park', distance: '12.0 km', stops: 7, fare: 20, status: 'active' },
    { id: 'RT-004', name: 'Railway → Beach Resort', distance: '22.8 km', stops: 12, fare: 35, status: 'maintenance' }
  ];

  const users = [
    { id: 'US-001', name: 'Alice Johnson', email: 'alice@email.com', type: 'passenger', tickets: 12, joined: '2024-01-15' },
    { id: 'US-002', name: 'Bob Smith', email: 'bob@email.com', type: 'passenger', tickets: 8, joined: '2024-02-20' },
    { id: 'US-003', name: 'John Anderson', email: 'john@email.com', type: 'driver', tickets: 0, joined: '2024-01-10' },
    { id: 'US-004', name: 'Sarah Wilson', email: 'sarah@email.com', type: 'driver', tickets: 0, joined: '2024-01-12' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const TabButton = ({ id, children, isActive, onClick }: any) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your bus system operations</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <TabButton id="overview" isActive={activeTab === 'overview'} onClick={setActiveTab}>
              Overview
            </TabButton>
            <TabButton id="buses" isActive={activeTab === 'buses'} onClick={setActiveTab}>
              Buses
            </TabButton>
            <TabButton id="routes" isActive={activeTab === 'routes'} onClick={setActiveTab}>
              Routes
            </TabButton>
            <TabButton id="users" isActive={activeTab === 'users'} onClick={setActiveTab}>
              Users
            </TabButton>
            <TabButton id="analytics" isActive={activeTab === 'analytics'} onClick={setActiveTab}>
              Analytics
            </TabButton>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value={`$${stats.totalRevenue.toLocaleString()}`}
                icon={DollarSign}
                color="bg-green-500"
              />
              <StatCard
                title="Total Trips"
                value={stats.totalTrips.toLocaleString()}
                icon={Route}
                color="bg-blue-500"
              />
              <StatCard
                title="Active Users"
                value={stats.totalUsers.toLocaleString()}
                icon={Users}
                color="bg-purple-500"
              />
              <StatCard
                title="Active Buses"
                value={stats.activeBuses}
                icon={Bus}
                color="bg-orange-500"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Trips</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={tripData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="trips" fill="#0066ff" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Usage</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={routeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {routeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { type: 'trip', message: 'Bus 42A completed trip to Airport Terminal', time: '5 minutes ago' },
                  { type: 'booking', message: 'New ticket booked for Route 15B', time: '12 minutes ago' },
                  { type: 'maintenance', message: 'Bus 33C scheduled for maintenance', time: '1 hour ago' },
                  { type: 'user', message: 'New user registered: alice@email.com', time: '2 hours ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.message}</p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'buses' && (
          <div className="space-y-6">
            {/* Actions */}
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search buses..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                Add Bus
              </button>
            </div>

            {/* Buses Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Bus Number</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Driver</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Route</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Passengers</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {buses.map(bus => (
                      <tr key={bus.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{bus.number}</div>
                          <div className="text-sm text-gray-600">{bus.id}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-900">{bus.driver}</td>
                        <td className="px-6 py-4 text-gray-900">{bus.route}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(bus.status)}`}>
                            {bus.status.charAt(0).toUpperCase() + bus.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-900">{bus.passengers}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'routes' && (
          <div className="space-y-6">
            {/* Actions */}
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search routes..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                Add Route
              </button>
            </div>

            {/* Routes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {routes.map(route => (
                <div key={route.id} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{route.name}</h3>
                      <p className="text-sm text-gray-600">{route.id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                      {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Distance</p>
                      <p className="font-medium text-gray-900">{route.distance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Stops</p>
                      <p className="font-medium text-gray-900">{route.stops}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Base Fare</p>
                      <p className="font-medium text-gray-900">${route.fare}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Daily Trips</p>
                      <p className="font-medium text-gray-900">24</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-blue-700">
                      <MapPin className="h-4 w-4" />
                      View Map
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Actions */}
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                  <option>All Users</option>
                  <option>Passengers</option>
                  <option>Drivers</option>
                  <option>Admins</option>
                </select>
              </div>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                Add User
              </button>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">User</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Tickets</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Joined</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.type === 'driver' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-900">{user.tickets}</td>
                        <td className="px-6 py-4 text-gray-900">{user.joined}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Revenue Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#0066ff" 
                    strokeWidth={3}
                    dot={{ fill: '#0066ff', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">On-Time Performance</span>
                    <span className="font-bold text-green-600">94.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-[94%]"></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Customer Satisfaction</span>
                    <span className="font-bold text-blue-600">4.7/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-[94%]"></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fleet Utilization</span>
                    <span className="font-bold text-purple-600">87.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full w-[88%]"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Routes</h4>
                <div className="space-y-3">
                  {routes.slice(0, 3).map((route, index) => (
                    <div key={route.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">{route.name.split(' → ')[0]}</p>
                        <p className="text-sm text-gray-600">→ {route.name.split(' → ')[1]}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">
                          {index === 0 ? '1,245' : index === 1 ? '892' : '756'}
                        </p>
                        <p className="text-xs text-gray-600">trips</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <p className="text-sm font-medium text-yellow-800">Maintenance Due</p>
                    <p className="text-xs text-yellow-700">Bus 33C requires inspection</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-sm font-medium text-blue-800">Peak Hours Alert</p>
                    <p className="text-xs text-blue-700">High demand on Route 42A</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-sm font-medium text-green-800">All Systems Normal</p>
                    <p className="text-xs text-green-700">No critical issues reported</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
