import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Car, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import './ReservationHelp.css';

const ReservationHelp = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <Car size={24} />,
      title: 'Find a Station',
      description: 'Browse nearby charging stations on the map or list view. Filter by connector type, power output, and amenities.'
    },
    {
      icon: <Calendar size={24} />,
      title: 'Select Time Slot',
      description: 'Choose your preferred date and time. Reservations can be made up to 7 days in advance.'
    },
    {
      icon: <Clock size={24} />,
      title: 'Confirm Reservation',
      description: 'Review your reservation details and confirm. You\'ll receive a confirmation with all details.'
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'Arrive & Charge',
      description: 'Arrive within your reserved window. The station will be held for you for 15 minutes grace period.'
    }
  ];

  const faqs = [
    {
      question: 'How long can I reserve a station?',
      answer: 'Reservations can be made for 30 minutes to 2 hours depending on station availability.'
    },
    {
      question: 'What happens if I\'m late?',
      answer: 'You have a 15-minute grace period. After that, the reservation may be released to other users.'
    },
    {
      question: 'Can I cancel my reservation?',
      answer: 'Yes, cancellations are free up to 1 hour before your scheduled time.'
    },
    {
      question: 'Is there a fee for reservations?',
      answer: 'Reservations are free. You only pay for the actual charging session.'
    }
  ];

  return (
    <div className="reservation-help-page">
      {/* Header */}
      <div className="res-header">
        <button className="back-button" onClick={() => navigate('/help')}>
          <ChevronLeft size={24} />
        </button>
        <h1>Reservation Help</h1>
        <div style={{ width: 24 }}></div>
      </div>

      <div className="res-content">
        {/* Introduction */}
        <div className="res-intro">
          <h2>How to Reserve a Charging Station</h2>
          <p>Follow these simple steps to secure your charging spot.</p>
        </div>

        {/* Steps */}
        <div className="res-steps">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{index + 1}</div>
              <div className="step-icon">{step.icon}</div>
              <div className="step-text">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="res-faqs">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-card">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Quick Action */}
        <div className="res-action">
          <button 
            className="btn-primary"
            onClick={() => navigate('/stations')}
          >
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationHelp;
