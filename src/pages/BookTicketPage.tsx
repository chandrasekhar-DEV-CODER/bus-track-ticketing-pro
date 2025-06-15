
import { useState } from 'react';
import { ArrowRight, MapPin, Calendar, Clock, CreditCard, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BookTicketPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    route: '',
    pickup: '',
    destination: '',
    date: '',
    time: '',
    passengers: 1,
    fare: 0
  });

  const steps = [
    { number: 1, title: 'Select Route', icon: MapPin },
    { number: 2, title: 'Choose Stops', icon: MapPin },
    { number: 3, title: 'Date & Time', icon: Calendar },
    { number: 4, title: 'Payment', icon: CreditCard }
  ];

  const routes = [
    { id: '42A', name: 'Central Station → Airport', fare: 50 },
    { id: '15B', name: 'Downtown → University', fare: 25 },
    { id: '33C', name: 'Mall Plaza → Tech Park', fare: 35 },
    { id: '88D', name: 'Railway → Beach Resort', fare: 60 }
  ];

  const stops = {
    '42A': ['Central Station', 'Downtown Plaza', 'City Center', 'Business District', 'Airport Terminal'],
    '15B': ['Downtown', 'Medical Center', 'Shopping Mall', 'Sports Complex', 'University Campus'],
    '33C': ['Mall Plaza', 'Residential Area', 'IT Park', 'Innovation Hub', 'Tech Park'],
    '88D': ['Railway Station', 'Old Town', 'Marina', 'Coastal Road', 'Beach Resort']
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Select Your Route</h2>
            <div className="grid gap-4">
              {routes.map(route => (
                <button
                  key={route.id}
                  onClick={() => {
                    setFormData({ ...formData, route: route.id, fare: route.fare });
                    handleNext();
                  }}
                  className="p-6 border-2 border-gray-200 dark:border-slate-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-200 text-left bg-white dark:bg-slate-800"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{route.id}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{route.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${route.fare}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">per person</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Choose Your Stops</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pickup Stop
                </label>
                <select
                  value={formData.pickup}
                  onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select pickup stop</option>
                  {formData.route && stops[formData.route as keyof typeof stops]?.map(stop => (
                    <option key={stop} value={stop}>{stop}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Destination Stop
                </label>
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select destination</option>
                  {formData.route && stops[formData.route as keyof typeof stops]?.map(stop => (
                    <option key={stop} value={stop}>{stop}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Select Date & Time</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Travel Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Departure Time
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select time</option>
                  <option value="06:00">06:00 AM</option>
                  <option value="08:00">08:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="18:00">06:00 PM</option>
                  <option value="20:00">08:00 PM</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Passengers
              </label>
              <select
                value={formData.passengers}
                onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white max-w-xs"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} passenger{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Confirm & Pay</h2>
            
            {/* Booking Summary */}
            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Booking Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Route:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.route}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">From:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.pickup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">To:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Date:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Time:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Passengers:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.passengers}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-slate-600 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ${formData.fare * formData.passengers}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Method</h3>
              <div className="grid gap-3">
                <button className="p-4 border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-left">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                    <span className="font-medium text-gray-900 dark:text-white">Credit/Debit Card</span>
                  </div>
                </button>
                <button className="p-4 border-2 border-gray-200 dark:border-slate-600 rounded-xl text-left hover:border-gray-300 dark:hover:border-slate-500">
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-gray-300 dark:border-slate-600 rounded-full mr-3"></div>
                    <span className="font-medium text-gray-900 dark:text-white">Digital Wallet</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.number 
                    ? 'bg-blue-600 dark:bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.number 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.number 
                      ? 'bg-blue-600 dark:bg-blue-500' 
                      : 'bg-gray-200 dark:bg-slate-700'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>
          
          <button
            onClick={currentStep === 4 ? () => alert('Booking confirmed!') : handleNext}
            disabled={
              (currentStep === 1 && !formData.route) ||
              (currentStep === 2 && (!formData.pickup || !formData.destination)) ||
              (currentStep === 3 && (!formData.date || !formData.time))
            }
            className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {currentStep === 4 ? 'Confirm Booking' : 'Next'}
            {currentStep < 4 && <ArrowRight className="ml-2 h-4 w-4" />}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookTicketPage;
