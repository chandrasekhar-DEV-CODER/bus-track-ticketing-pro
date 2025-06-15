
import { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  CreditCard, 
  ArrowRight,
  Check,
  Users,
  Bus
} from 'lucide-react';

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    passengers: 1,
    selectedSeats: [],
    fare: 0
  });

  const steps = [
    { id: 1, title: 'Route & Time', icon: MapPin },
    { id: 2, title: 'Select Seats', icon: Users },
    { id: 3, title: 'Payment', icon: CreditCard },
    { id: 4, title: 'Confirmation', icon: Check }
  ];

  const routes = [
    { id: 1, from: 'Central Station', to: 'Airport Terminal', duration: '45 min', fare: 25 },
    { id: 2, from: 'Downtown', to: 'University Campus', duration: '30 min', fare: 15 },
    { id: 3, from: 'Mall Plaza', to: 'Tech Park', duration: '35 min', fare: 20 },
    { id: 4, from: 'Railway Station', to: 'Beach Resort', duration: '60 min', fare: 35 }
  ];

  const timeSlots = [
    '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const SeatSelector = () => {
    const seats = Array.from({ length: 40 }, (_, i) => i + 1);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const bookedSeats = [5, 12, 18, 23, 34]; // Mock booked seats

    const toggleSeat = (seatNumber: number) => {
      if (bookedSeats.includes(seatNumber)) return;
      
      setSelectedSeats(prev => 
        prev.includes(seatNumber)
          ? prev.filter(s => s !== seatNumber)
          : [...prev, seatNumber]
      );
    };

    const getSeatColor = (seatNumber: number) => {
      if (bookedSeats.includes(seatNumber)) return 'bg-red-500 cursor-not-allowed';
      if (selectedSeats.includes(seatNumber)) return 'bg-green-500 text-white';
      return 'bg-gray-200 hover:bg-blue-100 cursor-pointer';
    };

    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Your Seats</h3>
        
        {/* Bus Layout */}
        <div className="max-w-md mx-auto">
          <div className="bg-gray-100 rounded-t-3xl p-4 mb-4">
            <div className="flex justify-center mb-2">
              <Bus className="h-8 w-8 text-gray-600" />
            </div>
            <div className="text-center text-sm text-gray-600">Driver</div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 p-4 bg-gray-50 rounded-lg">
            {seats.map(seatNumber => (
              <button
                key={seatNumber}
                onClick={() => toggleSeat(seatNumber)}
                className={`
                  w-12 h-12 rounded-lg font-semibold text-sm transition-all duration-200
                  ${getSeatColor(seatNumber)}
                  ${seatNumber % 4 === 2 ? 'mr-4' : ''}
                `}
                disabled={bookedSeats.includes(seatNumber)}
              >
                {seatNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Booked</span>
          </div>
        </div>

        {selectedSeats.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-900">
                  Selected Seats: {selectedSeats.join(', ')}
                </p>
                <p className="text-gray-600">
                  Total: ${selectedSeats.length * 25}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Book Your Bus Ticket
          </h1>
          <p className="text-xl text-gray-600">
            Easy, fast, and secure bus ticket booking
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-full font-semibold
                  ${currentStep >= step.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {currentStep > step.id ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-6 w-6" />
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    Step {step.id}
                  </p>
                  <p className={`text-xs ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-gray-400 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Route & Time</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Route
                  </label>
                  <div className="space-y-3">
                    {routes.map(route => (
                      <div 
                        key={route.id}
                        className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 cursor-pointer transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center text-gray-900 font-medium mb-1">
                              <MapPin className="h-4 w-4 text-blue-600 mr-1" />
                              {route.from}
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                              <ArrowRight className="h-4 w-4 mr-1" />
                              {route.to}
                            </div>
                            <div className="flex items-center text-gray-500 text-sm mt-1">
                              <Clock className="h-4 w-4 mr-1" />
                              {route.duration}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-blue-600">${route.fare}</div>
                            <div className="text-xs text-gray-500">per person</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Travel Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Departure Time
                    </label>
                    <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          className="p-2 text-sm border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && <SeatSelector />}

          {currentStep === 3 && (
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Booking Summary</h4>
                  <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Route:</span>
                      <span className="font-medium">Central Station → Airport</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="font-medium">Dec 25, 2024 - 08:30</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seats:</span>
                      <span className="font-medium">15, 16</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Passengers:</span>
                      <span className="font-medium">2</span>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount:</span>
                      <span className="text-blue-600">$50.00</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Payment Method</h4>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center mb-4">
                        <input type="radio" name="payment" className="mr-3" defaultChecked />
                        <CreditCard className="h-5 w-5 text-gray-600 mr-2" />
                        <span className="font-medium">Credit/Debit Card</span>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Booking Confirmed!
              </h3>
              <p className="text-gray-600 mb-6">
                Your ticket has been booked successfully. You will receive a confirmation email shortly.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Booking Reference</div>
                  <div className="text-2xl font-bold text-blue-600 mb-4">SB-2024-001234</div>
                  
                  {/* QR Code Placeholder */}
                  <div className="bg-white p-4 rounded-lg inline-block border-2 border-dashed border-gray-300">
                    <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500 text-xs text-center">QR Code<br />Will be generated</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  Download Ticket
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                  View All Tickets
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentStep === 4}
            className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
              currentStep === 4
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {currentStep === 3 ? 'Pay Now' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
