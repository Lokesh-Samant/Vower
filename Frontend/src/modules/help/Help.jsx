import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
const BackIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const QuestionIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const ZapIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const CreditCardIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ChevronDown = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const SendIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

// FAQ Data
const faqs = [
  { id: 1, question: 'How do I reserve a charger?', answer: 'Navigate to the Map tab, select a charging station, choose your preferred time slot, and confirm the reservation. You will receive a confirmation with all details.' },
  { id: 2, question: 'How do I cancel a reservation?', answer: 'Go to My Reservations, find your upcoming booking, and tap Cancel. Cancellations made 2 hours before the slot are fully refunded.' },
  { id: 3, question: 'How do payments work?', answer: 'We accept UPI, Credit/Debit Cards, and in-app Wallet. Payment is processed automatically after charging completes. You can view invoices in Charging History.' },
  { id: 4, question: 'Why was charging interrupted?', answer: 'Charging may be interrupted due to network issues, station maintenance, or vehicle compatibility. Contact support immediately for assistance.' },
  { id: 5, question: 'How can I add another vehicle?', answer: 'Go to Profile > My Vehicle, tap the + button, and fill in your vehicle details including battery capacity and connector type.' }
];

// Quick Options Data
const quickOptions = [
  { id: 'faq', icon: QuestionIcon, title: 'FAQs', color: 'bg-blue-50 text-blue-600' },
  { id: 'contact', icon: ChatIcon, title: 'Contact Support', color: 'bg-green-50 text-green-600' },
  { id: 'chat', icon: ChatIcon, title: 'Live Chat', color: 'bg-purple-50 text-purple-600' },
  { id: 'report', icon: AlertIcon, title: 'Report Issue', color: 'bg-red-50 text-red-600' },
  { id: 'emergency', icon: PhoneIcon, title: 'Emergency', color: 'bg-orange-50 text-orange-600' }
];

const guides = [
  { id: 'app', icon: BookIcon, title: 'App Guide', description: 'Learn how to use the app' },
  { id: 'charging', icon: ZapIcon, title: 'Charging Guide', description: 'EV charging best practices' },
  { id: 'payment', icon: CreditCardIcon, title: 'Payment Issues', description: 'Resolve payment problems' },
  { id: 'reservation', icon: CalendarIcon, title: 'Reservations Help', description: 'Booking assistance' }
];

export default function Help() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { id: Date.now(), sender: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: 'Thank you for contacting us. A support agent will be with you shortly.' }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white pb-24 animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md z-40 px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <BackIcon />
          </button>
          <h1 className="text-xl font-bold text-[#111111]">Help Center</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="px-4 max-w-lg mx-auto pt-6">
        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search help articles..."
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-[#EAEAEA] rounded-2xl focus:outline-none focus:border-black transition-colors"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </div>
        </div>

        {/* Quick Options */}
        <div className="grid grid-cols-5 gap-2 mb-8">
          {quickOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                if (option.id === 'chat') setShowChat(true);
                if (option.id === 'report') setShowReportForm(true);
              }}
              className={`flex flex-col items-center p-3 rounded-2xl ${option.color} active:scale-95 transition-transform`}
            >
              <option.icon />
              <span className="text-xs mt-1 font-medium">{option.title}</span>
            </button>
          ))}
        </div>

        {/* Guides */}
        <h2 className="text-lg font-bold mb-4">Help Guides</h2>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {guides.map((guide) => (
            <div key={guide.id} className="bg-white border border-[#EAEAEA] rounded-2xl p-4 active:scale-[0.98] transition-transform cursor-pointer">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mb-3 text-gray-700">
                <guide.icon />
              </div>
              <h3 className="text-sm font-semibold">{guide.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{guide.description}</p>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <h2 className="text-lg font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white border border-[#EAEAEA] rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-sm font-medium pr-4">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedFaq === faq.id ? 'rotate-180' : ''}`} />
              </button>
              {expandedFaq === faq.id && (
                <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-8 bg-gray-50 rounded-2xl p-6">
          <h3 className="font-bold mb-4">Contact Support</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <PhoneIcon />
              <span>+91 1800-123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <ChatIcon />
              <span>support@vower.com</span>
            </div>
            <div className="flex items-center gap-3">
              <QuestionIcon />
              <span>Support Hours: 24/7</span>
            </div>
          </div>
        </div>
      </main>

      {/* Live Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl flex flex-col max-h-[80vh] animate-slide-up">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold">Live Chat</h2>
              <button onClick={() => setShowChat(false)} className="p-2 hover:bg-gray-100 rounded-full">✕</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-black text-white' : 'bg-gray-100'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendChat()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-gray-50 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-black"
              />
              <button onClick={handleSendChat} className="p-3 bg-black text-white rounded-xl active:scale-95 transition-transform">
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Issue Modal */}
      {showReportForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Report an Issue</h2>
              <button onClick={() => setShowReportForm(false)} className="p-2 hover:bg-gray-100 rounded-full">✕</button>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowReportForm(false); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Category</label>
                <select className="w-full px-4 py-3 bg-white border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-black">
                  <option>Technical Issue</option>
                  <option>Billing Problem</option>
                  <option>Station Malfunction</option>
                  <option>Reservation Issue</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={4} placeholder="Describe your issue..." className="w-full px-4 py-3 bg-white border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-black resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Screenshot</label>
                <div className="border-2 border-dashed border-[#EAEAEA] rounded-xl p-6 text-center">
                  <p className="text-sm text-gray-500">Tap to upload or drag and drop</p>
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-black text-white font-semibold rounded-xl active:scale-95 transition-transform">
                Submit Report
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}
