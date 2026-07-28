import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Check } from 'lucide-react';
import '../styles/NotificationsPage.css';

const NotificationsPage = () => {
    const navigate = useNavigate();
    const [masterToggle, setMasterToggle] = useState(true);
    const [settings, setSettings] = useState({
        reservationAlerts: true,
        chargingCompleted: true,
        promotions: false,
        newStations: true,
        maintenanceAlerts: true,
    });

    const toggleSetting = (key) => {
        if (!masterToggle) return;
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleMaster = () => {
        setMasterToggle(!masterToggle);
        if (masterToggle) {
            setSettings({
                reservationAlerts: false,
                chargingCompleted: false,
                promotions: false,
                newStations: false,
                maintenanceAlerts: false,
            });
        }
    };

    const handleSave = async () => {
        await new Promise(r => setTimeout(r, 800));
        navigate('/settings');
    };

    const handleCancel = () => navigate(-1);
    const handleBack = () => navigate(-1);

    const notificationTypes = [
        { key: 'reservationAlerts', label: 'Reservation Alerts', desc: 'Get notified about your upcoming reservations' },
        { key: 'chargingCompleted', label: 'Charging Completed', desc: 'Alert when your vehicle is fully charged' },
        { key: 'promotions', label: 'Promotions', desc: 'Special offers and discount notifications' },
        { key: 'newStations', label: 'New Stations', desc: 'Notify when new charging stations are added nearby' },
        { key: 'maintenanceAlerts', label: 'Maintenance Alerts', desc: 'Updates about station maintenance or outages' },
    ];

    return (
        <div className="notifications-page">
            <header className="notif-header">
                <button className="notif-header__back" onClick={handleBack}><ArrowLeft size={22} strokeWidth={2.2} /></button>
                <h1 className="notif-header__title">Notifications</h1>
            </header>

            <div className="notif-content">
                <div className={`notif-master-card ${masterToggle ? 'notif-master-card--on' : ''}`}>
                    <div className="notif-master-card__icon"><Bell size={24} /></div>
                    <div className="notif-master-card__info">
                        <h3>All Notifications</h3>
                        <p>{masterToggle ? 'Enabled' : 'Disabled'}</p>
                    </div>
                    <button className={`notif-toggle ${masterToggle ? 'notif-toggle--on' : ''}`} onClick={toggleMaster}>
                        <span className="notif-toggle__thumb" />
                    </button>
                </div>

                <div className="notif-list">
                    {notificationTypes.map(({ key, label, desc }) => (
                        <div key={key} className={`notif-item ${!masterToggle ? 'notif-item--disabled' : ''}`}>
                            <div className="notif-item__info">
                                <h4>{label}</h4>
                                <p>{desc}</p>
                            </div>
                            <button
                                className={`notif-toggle notif-toggle--small ${settings[key] ? 'notif-toggle--on' : ''}`}
                                onClick={() => toggleSetting(key)}
                                disabled={!masterToggle}
                            >
                                <span className="notif-toggle__thumb" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="notif-footer">
                <button className="notif-footer__save" onClick={handleSave}>Save Preferences</button>
                <button className="notif-footer__cancel" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default NotificationsPage;
