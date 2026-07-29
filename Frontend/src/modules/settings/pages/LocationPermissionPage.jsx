import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Check } from 'lucide-react';
import './LocationPermissionPage.css';

const LocationPermissionPage = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('while');
    const [saved, setSaved] = useState(false);
    const handleBack = () => navigate(-1);
    const handleSave = async () => { await new Promise(r => setTimeout(r, 800)); setSaved(true); setTimeout(() => navigate(-1), 1200); };
    const options = [{ id: 'always', label: 'Always Allow' }, { id: 'while', label: 'While Using App' }, { id: 'ask', label: 'Ask Every Time' }, { id: 'never', label: 'Never' }];

    return (
        <div className="loc-page">
            <header className="loc-header"><button className="loc-header__back" onClick={handleBack}><ArrowLeft size={22} strokeWidth={2.2} /></button><h1 className="loc-header__title">Location Permission</h1></header>
            <main className="loc-main">
                {saved ? (<div className="loc-success"><Check size={48} /><h3>Saved!</h3></div>) : (<><div className="loc-info"><MapPin size={32} /><p>We need location access to find nearby charging stations</p></div><div className="loc-options">{options.map(o => (<label key={o.id} className={`loc-option ${selected === o.id ? 'loc-option--selected' : ''}`}><input type="radio" name="location" checked={selected === o.id} onChange={() => setSelected(o.id)} hidden /><span>{o.label}</span>{selected === o.id && <Check size={18} />}</label>))}</div><button className="loc-save-btn" onClick={handleSave}>Save</button></>)}
            </main>
        </div>
    );
};
export default LocationPermissionPage;
