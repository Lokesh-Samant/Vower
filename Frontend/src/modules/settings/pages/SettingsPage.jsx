import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Lock,
    Mail,
    Phone,
    Smartphone,
    Globe,
    Bell,
    MapPin,
    Zap,
    Plug,
    CreditCard,
    LogOut,
    ChevronRight,
    Shield,
} from 'lucide-react';
import './SettingsPage.css';

const SettingsPage = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const menuItems = [
        {
            id: 'change-password',
            icon: Lock,
            label: 'Change Password',
            description: 'Update your password',
        },
        {
            id: 'email',
            icon: Mail,
            label: 'Email Address',
            description: 'rahul.sharma@email.com',
        },
        {
            id: 'phone',
            icon: Phone,
            label: 'Phone Number',
            description: '+91 9876543210',
        },
        {
            id: 'two-factor',
            icon: Shield,
            label: 'Two-Factor Authentication',
            description: 'Add an extra layer of security',
            toggle: true,
            enabled: false,
        },
        {
            id: 'language',
            icon: Globe,
            label: 'Language',
            description: 'English',
        },
        {
            id: 'notifications',
            icon: Bell,
            label: 'Notifications',
            description: 'Manage notification preferences',
            toggle: true,
            enabled: true,
        },
        {
            id: 'location',
            icon: MapPin,
            label: 'Location Permission',
            description: 'While Using App',
        },
        {
            id: 'preferred-speed',
            icon: Zap,
            label: 'Preferred Charging Speed',
            description: 'Fast',
        },
        {
            id: 'preferred-connector',
            icon: Plug,
            label: 'Preferred Connector',
            description: 'CCS2',
        },
        {
            id: 'payment-methods',
            icon: CreditCard,
            label: 'Payment Methods',
            description: 'Manage your payment options',
        },
    ];

    const handleLogout = () => {
        // Clear auth state (simulate)
        localStorage.removeItem('isAuthenticated');
        sessionStorage.clear();
        navigate('/login', { replace: true });
    };

    const [toggleStates, setToggleStates] = useState({
        'two-factor': false,
        notifications: true,
    });

    const handleToggle = (itemId) => {
        setToggleStates((prev) => ({
            ...prev,
            [itemId]: !prev[itemId],
        }));
        // For two-factor, navigate to setup when enabling
        if (itemId === 'two-factor' && !toggleStates[itemId]) {
            navigate('/profile/settings/two-factor-setup');
        }
    };

    const handleMenuItemClick = (itemId) => {
        switch (itemId) {
            case 'change-password':
                navigate('/profile/settings/change-password');
                break;
            case 'email':
                navigate('/profile/settings/edit-email');
                break;
            case 'phone':
                navigate('/profile/settings/change-phone');
                break;
            case 'language':
                navigate('/profile/settings/language');
                break;
            case 'location':
                navigate('/profile/settings/location-permission');
                break;
            case 'preferred-speed':
                navigate('/profile/settings/preferred-speed');
                break;
            case 'preferred-connector':
                navigate('/profile/settings/preferred-connector');
                break;
            case 'payment-methods':
                navigate('/profile/settings/payment-methods');
                break;
            default:
                break;
        }
    };

    return (
        <div className="settings-page">
            <header className="settings-header">
                <button
                    className="settings-header__back"
                    onClick={handleBack}
                    aria-label="Go back"
                >
                    <ArrowLeft size={22} strokeWidth={2.2} />
                </button>
                <h1 className="settings-header__title">Settings</h1>
            </header>

            <main className="settings-main">
                <div className="settings-section">
                    <h2 className="settings-section__title">Account</h2>
                    <div className="settings-list">
                        {menuItems.slice(0, 4).map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.id}
                                    className="settings-item"
                                    onClick={() => handleMenuItemClick(item.id)}
                                >
                                    <div className="settings-item__icon">
                                        <Icon size={20} strokeWidth={1.8} />
                                    </div>
                                    <div className="settings-item__content">
                                        <span className="settings-item__label">{item.label}</span>
                                        <span className="settings-item__description">{item.description}</span>
                                    </div>
                                    {item.toggle ? (
                                        <button
                                            className={`settings-toggle ${toggleStates[item.id] ? 'settings-toggle--on' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleToggle(item.id);
                                            }}
                                        >
                                            <span className="settings-toggle__knob" />
                                        </button>
                                    ) : (
                                        <ChevronRight size={18} strokeWidth={2} className="settings-item__chevron" />
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
                                    className="settings-item"
                                    onClick={() => handleMenuItemClick(item.id)}
                                >
                                    <div className="settings-item__icon">
                                        <Icon size={20} strokeWidth={1.8} />
                                    </div>
                                    <div className="settings-item__content">
                                        <span className="settings-item__label">{item.label}</span>
                                        <span className="settings-item__description">{item.description}</span>
                                    </div>
                                    {item.toggle ? (
                                        <button
                                            className={`settings-toggle ${toggleStates[item.id] ? 'settings-toggle--on' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleToggle(item.id);
                                            }}
                                        >
                                            <span className="settings-toggle__knob" />
                                        </button>
                                    ) : (
                                        <ChevronRight size={18} strokeWidth={2} className="settings-item__chevron" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="settings-section">
                    <h2 className="settings-section__title">Payment</h2>
                    <div className="settings-list">
                        {menuItems.slice(9).map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.id}
                                    className="settings-item"
                                    onClick={() => handleMenuItemClick(item.id)}
                                >
                                    <div className="settings-item__icon">
                                        <Icon size={20} strokeWidth={1.8} />
                                    </div>
                                    <div className="settings-item__content">
                                        <span className="settings-item__label">{item.label}</span>
                                        <span className="settings-item__description">{item.description}</span>
                                    </div>
                                    <ChevronRight size={18} strokeWidth={2} className="settings-item__chevron" />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="settings-section settings-section--danger">
                    <button className="settings-logout-btn" onClick={handleLogout}>
                        <LogOut size={20} strokeWidth={1.8} />
                        <span>Logout</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;
