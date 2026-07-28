import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Zap, Battery, Plug, Clock, Info } from 'lucide-react';
import './ChargingGuide.css';

const ChargingGuide = () => {
  const navigate = useNavigate();

  const guideSections = [
    {
      icon: <Plug size={24} />,
      title: 'Getting Started',
      content: 'To start charging, locate a nearby station using the map, select your preferred connector type, and reserve a time slot. Arrive at the station within your reserved window.'
    },
    {
      icon: <Battery size={24} />,
      title: 'Charging Process',
      content: 'Once connected, charging begins automatically. Monitor your session in real-time through the app. You can stop charging anytime from the app or by disconnecting.'
    },
    {
      icon: <Zap size={24} />,
      title: 'Charging Speeds',
      content: 'Charging speed depends on your vehicle\'s capability, station power output, and battery level. Fast chargers can add 80% charge in 30-45 minutes.'
    },
    {
      icon: <Clock size={24} />,
      title: 'Session Duration',
      content: 'Typical sessions last 30-60 minutes for fast charging. Home charging overnight can take 6-12 hours depending on your charger and battery size.'
    },
    {
      icon: <Info size={24} />,
      title: 'Best Practices',
      content: 'For optimal battery health, avoid frequent 100% charges. Keep battery between 20-80% for daily use. Pre-condition your battery in extreme weather.'
    }
  ];

  const tips = [
    'Plan your charging stops ahead for long trips',
    'Use scheduled charging during off-peak hours for lower rates',
    'Keep your connector clean and properly seated',
    'Check station availability before heading out',
    'Report any issues immediately through the app'
  ];

  return (
    <div className="charging-guide-page">
      {/* Header */}
      <div className="guide-header">
        <button className="back-button" onClick={() => navigate('/help')}>
          <ChevronLeft size={24} />
        </button>
        <h1>Charging Guide</h1>
        <div style={{ width: 24 }}></div>
      </div>

      <div className="guide-content">
        {/* Introduction */}
        <div className="guide-intro">
          <h2>Everything You Need to Know About Charging</h2>
          <p>Learn how to make the most of your EV charging experience with our comprehensive guide.</p>
        </div>

        {/* Guide Sections */}
        <div className="guide-sections">
          {guideSections.map((section, index) => (
            <div key={index} className="guide-card">
              <div className="guide-icon">{section.icon}</div>
              <div className="guide-text">
                <h3>{section.title}</h3>
                <p>{section.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="tips-section">
          <h2>Pro Tips</h2>
          <ul className="tips-list">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Quick Action */}
        <div className="guide-action">
          <button 
            className="btn-primary"
            onClick={() => navigate('/stations')}
          >
            Find Charging Stations
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChargingGuide;
