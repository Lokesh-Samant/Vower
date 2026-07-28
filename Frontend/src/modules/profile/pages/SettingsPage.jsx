import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Mail, Phone, Shield, Globe, Bell, MapPin, Zap, CreditCard, LogOut, ChevronRight } from 'lucide-react';
import '../styles/SettingsPage.css';

const SettingsPage = () => {
    const navigate = useNavigate();
    
    const [notifications, setNotifications] = useState(true);
    const [twoFactor, setTwoFactor] = useState(false);

    const menuItems = [
        { id: 'password', icon: Lock, label: 'Change Password', route: '/settings/password' },
        { id: 'email', icon: Mail, label: 'Email Address', route: '/settings/email' },
        { id: 'phone', icon: Phone, label: 'Phone Number', route: '/settings/phone' },
        { id: '2fa', icon: Shield, label: 'Two-Factor Authentication', route: '/settings/2fa', toggle: true, value: twoFactor, onToggle: () => setTwoFactor(!twoFactor) },
        { id: 'language', icon: Globe, label: 'Language', route: '/settings/language' },
        { id: 'notifications', icon: Bell, label: 'Notifications', route: '/settings/notifications', toggle: true, value: notifications, onToggle: () => setNotifications(!notifications) },
        { id: 'location', icon: MapPin, label: 'Location Permission', route: '/settings/location' },
        { id: 'charging-speed', icon: Zap, label: 'Preferred Charging Speed', route: '/settings/charging-speed' },
        { id: 'connector', icon: Zap, label: 'Preferred Connector', route: '/settings/connector' },
        { id: 'payment', icon: CreditCard, label: 'Payment Method', route: '/settings/payment' },
    ];

    const handleBack = () => {
        navigate(-1);
    };

    const handleMenuItemClick = (item) => {
        if (item.route) {
            navigate(item.route);
        }
    };

    const handleLogout = () => {
        // Clear auth session here in real app
        localStorage.removeItem('authToken');
        navigate('/login', { replace: true });
    };

    return (
        <div className="settings-page">
            <header className="settings-header">
                <button className="settings-header__back" onClick={handleBack} aria-label="Go back">
                    <ArrowLeft size={22} strokeWidth={2.2} />
                </button>
                <h1 className="settings-header__title">Settings</h1>
            </header>

            <div className="settings-content">
                <div className="settings-section">
                    <h2 className="settings-section__title">Account</h2>
                    <div className="settings-list">
                        {menuItems.slice(0, 4).map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.id}
                                    className="settings-list__item"
                                    onClick={() => handleMenuItemClick(item)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <div className="settings-list__icon">
                                        <Icon size={20} strokeWidth={1.8} />
                                    </div>
                                    <span className="settings-list__label">{item.label}</span>
                                    {item.toggle ? (
                                        <button
                                            className={`settings-toggle ${item.value ? 'settings-toggle--on' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                item.onToggle();
                                            }}
                                        >
                                            <span className="settings-toggle__thumb" />
                                        </button>
                                    ) : (
                                        <ChevronRight size={18} strokeWidth={2} className="settings-list__chevron" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="settings-section">
                    <h2 className="settings-section__title">Preferences</h2>
                    <div className="settings-list">
                        {menuItems.slice(4, 9).map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.id}
                                    className="settings-list__item"
                                    onClick={() => handleMenuItemClick(item)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <div className="settings-list__icon">
                                        <Icon size={20} strokeWidth={1.8} />
                                    </div>
                                    <span className="settings-list__label">{item.label}</span>
                                    {item.toggle ? (
                                        <button
                                            className={`settings-toggle ${item.value ? 'settings-toggle--on' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                item.onToggle();
                                            }}
                                        >
                                            <span className="settings-toggle__thumb" />
                                        </button>
                                    ) : (
                                        <ChevronRight size={18} strokeWidth={2} className="settings-list__chevron" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="settings-section">
                    <h2 className="settings-section__title">Payment & Privacy</h2>
                    <div className="settings-list">
                        {menuItems.slice(9).map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.id}
                                    className="settings-list__item"
                                    onClick={() => handleMenuItemClick(item)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <div className="settings-list__icon">
                                        <Icon size={20} strokeWidth={1.8} />
                                    </div>
                                    <span className="settings-list__label">{item.label}</span>
                                    <ChevronRight size={18} strokeWidth={2} className="settings-list__chevron" />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="settings-section settings-section--danger">
                    <button className="settings-logout-btn" onClick={handleLogout}>
                        <LogOut size={20} strokeWidth={1.8} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
