
import { useState } from 'react';
import { Phone, Mail, MessageCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I book a ticket?",
      answer: "You can book a ticket by visiting our Book Ticket page, selecting your route, stops, date and time, then completing the payment process."
    },
    {
      question: "Can I cancel my ticket?",
      answer: "Yes, you can cancel your ticket up to 2 hours before departure. Cancellation charges may apply based on our refund policy."
    },
    {
      question: "How do I track my bus?",
      answer: "Use our Live Bus Tracking feature to see real-time location of your bus, estimated arrival time, and route progress."
    },
    {
      question: "What if I lose my QR ticket?",
      answer: "You can re-download your ticket from the My Tickets section using your booking reference number."
    },
    {
      question: "Are there discounts for students?",
      answer: "Yes, we offer student discounts. Please present your valid student ID during booking or contact support for assistance."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Your message has been sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Help & Support
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            We're here to help you with any questions or concerns
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Phone Support</p>
                    <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">24/7 Emergency Support</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email Support</p>
                    <p className="text-gray-600 dark:text-gray-300">support@smartbus.com</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Live Chat</p>
                    <p className="text-gray-600 dark:text-gray-300">Available on website</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mon-Fri, 9 AM - 6 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Office Hours</p>
                    <p className="text-gray-600 dark:text-gray-300">Mon-Fri: 9 AM - 6 PM</p>
                    <p className="text-gray-600 dark:text-gray-300">Sat-Sun: 10 AM - 4 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Support */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-red-900 dark:text-red-200 mb-2">Emergency Support</h3>
              <p className="text-red-700 dark:text-red-300 mb-4">
                For urgent assistance or emergencies while traveling
              </p>
              <button className="w-full bg-red-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-red-700 transition-colors">
                Call Emergency: +1 (555) 911-HELP
              </button>
            </div>
          </div>

          {/* Contact Form & FAQ */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Issues</option>
                    <option value="payment">Payment Problems</option>
                    <option value="tracking">Bus Tracking</option>
                    <option value="refund">Refund Request</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    placeholder="Please describe your issue or question in detail..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 dark:border-slate-600 rounded-xl">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl transition-colors"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SupportPage;
