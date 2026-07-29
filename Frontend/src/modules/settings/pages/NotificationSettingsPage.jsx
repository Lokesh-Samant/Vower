import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';
import './NotificationSettingsPage.css';

const NotificationSettingsPage = () => {
    const navigate = useNavigate();
    const [toggles, setToggles] = useState({ main: true, reservations: true, charging: true, promotions: false, stations: true, maintenance: true });
    const handleBack = () => navigate(-1);
    const toggle = (key) => setToggles(p => ({ ...p, [key]: !p[key] }));
    const items = [{ key: 'reservations', label: 'Reservation Alerts' }, { key: 'charging', label: 'Charging Completed' }, { key: 'promotions', label: 'Promotions' }, { key: 'stations', label: 'New Stations' }, { key: 'maintenance', label: 'Maintenance Alerts' }];

    return (
        <div className="notif-page">
            <header className="notif-header"><button className="notif-header__back" onClick={handleBack}><ArrowLeft size={22} strokeWidth={2.2} /></button><h1 className="notif-header__title">Notifications</h1></header>
            <main className="notif-main">
                <div className="notif-section"><h3>General</h3><div className="notif-item"><span>All Notifications</span><button className={`notif-toggle ${toggles.main ? 'notif-toggle--on' : ''}`} onClick={() => toggle('main')}><span className="notif-toggle__knob" /></button></div></div>
                <div className="notif-section"><h3>Alerts</h3>{items.map(i => (<div key={i.key} className="notif-item"><span>{i.label}</span><button className={`notif-toggle ${toggles[i.key] ? 'notif-toggle--on' : ''}`} onClick={() => toggle(i.key)}><span className="notif-toggle__knob" /></button></div>))}</div>
            </main>
        </div>
    );
};
export default NotificationSettingsPage;
