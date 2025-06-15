import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Ticket, 
  Download, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  QrCode,
  Search
} from 'lucide-react';
import { toast } from 'sonner';

const TicketsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const navigate = useNavigate();

  const tickets = [
    {
      id: 'SB-2024-001234',
      route: 'Central Station → Airport Terminal',
      date: '2024-12-25',
      time: '08:30',
      seats: ['15', '16'],
      fare: 50,
      status: 'upcoming',
      passengers: 2,
      busNumber: '42A',
      bookingDate: '2024-12-20',
      cancellable: true
    },
    {
      id: 'SB-2024-001199',
      route: 'Downtown → University Campus',
      date: '2024-12-20',
      time: '14:15',
      seats: ['8'],
      fare: 15,
      status: 'completed',
      passengers: 1,
      busNumber: '15B',
      bookingDate: '2024-12-18',
      cancellable: false
    },
    {
      id: 'SB-2024-001188',
      route: 'Mall Plaza → Tech Park',
      date: '2024-12-18',
      time: '16:45',
      seats: ['22', '23'],
      fare: 40,
      status: 'cancelled',
      passengers: 2,
      busNumber: '33C',
      bookingDate: '2024-12-15',
      cancellable: false,
      refundAmount: 36
    },
    {
      id: 'SB-2024-001167',
      route: 'Railway Station → Beach Resort',
      date: '2024-12-15',
      time: '09:00',
      seats: ['5'],
      fare: 35,
      status: 'completed',
      passengers: 1,
      busNumber: '88D',
      bookingDate: '2024-12-10',
      cancellable: false
    }
  ];

  const handleViewQR = (ticketId: string) => {
    setSelectedTicket(ticketId);
  };

  const handleDownload = (ticket: any) => {
    toast.success(`Downloading ticket ${ticket.id}`);
    // Implement actual download logic here
  };

  const handleCancelBooking = (ticketId: string) => {
    toast.success(`Booking ${ticketId} cancelled successfully`);
    // Implement actual cancellation logic here
  };

  const handleBookFirstTicket = () => {
    navigate('/book-ticket');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesTab = activeTab === 'all' || ticket.status === activeTab;
    const matchesSearch = ticket.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const QRCodeModal = ({ ticket, onClose }: { ticket: any, onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-card rounded-2xl p-8 max-w-md w-full">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Ticket</h3>
          
          {/* QR Code */}
          <div className="glass rounded-xl p-6 mb-6">
            <div className="w-48 h-48 bg-gray-100 dark:bg-gray-800 rounded-lg mx-auto flex items-center justify-center mb-4">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black dark:bg-white' : 'bg-white dark:bg-black'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Scan this QR code during boarding</p>
          </div>
          
          {/* Ticket Details */}
          <div className="glass rounded-xl p-4 mb-6 text-left">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Ticket ID</p>
                <p className="font-semibold text-gray-900 dark:text-white">{ticket.id}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Bus</p>
                <p className="font-semibold text-gray-900 dark:text-white">{ticket.busNumber}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Date</p>
                <p className="font-semibold text-gray-900 dark:text-white">{ticket.date}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Time</p>
                <p className="font-semibold text-gray-900 dark:text-white">{ticket.time}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600 dark:text-gray-400">Route</p>
                <p className="font-semibold text-gray-900 dark:text-white">{ticket.route}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Seats</p>
                <p className="font-semibold text-gray-900 dark:text-white">{ticket.seats.join(', ')}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Fare</p>
                <p className="font-semibold text-gray-900 dark:text-white">${ticket.fare}</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 glass text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-ring"
            >
              Close
            </button>
            <button 
              onClick={() => handleDownload(ticket)}
              className="flex-1 text-white py-3 px-4 rounded-xl font-semibold transition-colors focus-ring flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 heading-gradient">
            My Tickets
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Manage and view all your bus tickets
          </p>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-3 glass rounded-xl focus-ring border-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Status Tabs */}
            <div className="glass rounded-xl p-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'upcoming', label: 'Upcoming' },
                { id: 'completed', label: 'Completed' },
                { id: 'cancelled', label: 'Cancelled' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 focus-ring ${
                    activeTab === tab.id
                      ? 'text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id ? 'var(--accent-primary)' : 'transparent'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-6">
          {filteredTickets.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 shadow-lg text-center">
              <Ticket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tickets found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm ? 'Try adjusting your search terms' : 'You haven\'t booked any tickets yet'}
              </p>
              <button 
                onClick={handleBookFirstTicket}
                className="text-white px-6 py-3 rounded-xl font-semibold transition-colors focus-ring"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              >
                Book Your First Ticket
              </button>
            </div>
          ) : (
            filteredTickets.map(ticket => (
              <div key={ticket.id} className="glass-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{ticket.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border ${getStatusColor(ticket.status)}`}>
                          {getStatusIcon(ticket.status)}
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="font-medium">{ticket.route}</span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {ticket.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {ticket.time}
                        </div>
                        <div>
                          Bus: <span className="font-medium">{ticket.busNumber}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>${ticket.fare}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {ticket.passengers} passenger{ticket.passengers > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/20 dark:border-gray-800/50">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div>
                        Seats: <span className="font-medium">{ticket.seats.join(', ')}</span>
                      </div>
                      <div>
                        Booked: {ticket.bookingDate}
                      </div>
                      {ticket.status === 'cancelled' && ticket.refundAmount && (
                        <div className="text-green-400">
                          Refunded: ${ticket.refundAmount}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      {ticket.status === 'upcoming' && (
                        <>
                          <button
                            onClick={() => handleViewQR(ticket.id)}
                            className="flex items-center gap-2 text-white px-4 py-2 rounded-lg font-medium transition-colors focus-ring"
                            style={{ backgroundColor: 'var(--accent-primary)' }}
                          >
                            <QrCode className="h-4 w-4" />
                            View QR
                          </button>
                          {ticket.cancellable && (
                            <button 
                              onClick={() => handleCancelBooking(ticket.id)}
                              className="glass border border-red-500/30 text-red-400 px-4 py-2 rounded-lg font-medium hover:bg-red-500/10 transition-colors focus-ring"
                            >
                              Cancel
                            </button>
                          )}
                        </>
                      )}
                      
                      <button 
                        onClick={() => handleDownload(ticket)}
                        className="flex items-center gap-2 glass text-gray-600 dark:text-gray-400 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-ring"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* QR Code Modal */}
        {selectedTicket && (
          <QRCodeModal
            ticket={tickets.find(t => t.id === selectedTicket)}
            onClose={() => setSelectedTicket(null)}
          />
        )}

        {/* Summary Stats */}
        {filteredTickets.length > 0 && (
          <div className="mt-8 glass-card rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 glass rounded-xl">
                <div className="text-2xl font-bold text-blue-400">
                  {tickets.filter(t => t.status === 'upcoming').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming</div>
              </div>
              <div className="text-center p-4 glass rounded-xl">
                <div className="text-2xl font-bold text-green-400">
                  {tickets.filter(t => t.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
              </div>
              <div className="text-center p-4 glass rounded-xl">
                <div className="text-2xl font-bold text-red-400">
                  {tickets.filter(t => t.status === 'cancelled').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Cancelled</div>
              </div>
              <div className="text-center p-4 glass rounded-xl">
                <div className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>
                  ${tickets.reduce((sum, t) => t.status !== 'cancelled' ? sum + t.fare : sum, 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Spent</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketsPage;
