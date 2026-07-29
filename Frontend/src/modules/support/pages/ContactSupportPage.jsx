import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MessageSquare, Clock } from 'lucide-react';
import './ContactSupportPage.css';

const ContactSupportPage = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const handleCall = () => {
        window.location.href = 'tel:+18001234567';
    };

    const handleEmail = () => {
        window.location.href = 'mailto:support@vower.com';
    };

    const handleWhatsApp = () => {
        window.open('https://wa.me/18001234567', '_blank');
    };

    return (
        <div className="contact-support-page">
            <header className="contact-support-header">
                <button className="contact-support-header__back" onClick={handleBack} aria-label="Go back">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </button>
                <h1 className="contact-support-header__title">Contact Support</h1>
            </header>

            <main className="contact-support-main">
                {/* Contact Options */}
                <section className="contact-section">
                    <h2 className="section-title">Get in Touch</h2>
                    
                    <div className="contact-options">
                        <button className="contact-option" onClick={handleCall}>
                            <div className="contact-option__icon contact-option__icon--call">
                                <Phone size={24} strokeWidth={2} />
                            </div>
                            <div className="contact-option__content">
                                <span className="contact-option__title">Call Support</span>
                                <span className="contact-option__subtitle">+1 (800) 123-4567</span>
                            </div>
                        </button>

                        <button className="contact-option" onClick={handleEmail}>
                            <div className="contact-option__icon contact-option__icon--email">
                                <Mail size={24} strokeWidth={2} />
                            </div>
                            <div className="contact-option__content">
                                <span className="contact-option__title">Email Support</span>
                                <span className="contact-option__subtitle">support@vower.com</span>
                            </div>
                        </button>

                        <button className="contact-option" onClick={handleWhatsApp}>
                            <div className="contact-option__icon contact-option__icon--whatsapp">
                                <MessageSquare size={24} strokeWidth={2} />
                            </div>
                            <div className="contact-option__content">
                                <span className="contact-option__title">WhatsApp Support</span>
                                <span className="contact-option__subtitle">Chat with us</span>
                            </div>
                        </button>

                        <div className="contact-option contact-option--disabled">
                            <div className="contact-option__icon contact-option__icon--chat">
                                <MessageSquare size={24} strokeWidth={2} />
                            </div>
                            <div className="contact-option__content">
                                <span className="contact-option__title">Live Chat</span>
                                <span className="contact-option__subtitle">Coming Soon</span>
                            </div>
                            <span className="coming-soon-badge">Soon</span>
                        </div>
                    </div>
                </section>

                {/* Support Hours */}
                <section className="hours-section">
                    <div className="hours-card">
                        <Clock size={20} strokeWidth={2} className="hours-icon" />
                        <div className="hours-content">
                            <h3 className="hours-title">Support Hours</h3>
                            <p className="hours-text">Monday - Sunday: 24/7</p>
                            <p className="hours-emergency">Emergency charging helpline always available</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ContactSupportPage;
