import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Check } from 'lucide-react';
import './PreferredSpeedPage.css';

const PreferredSpeedPage = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('fast');
    const [saved, setSaved] = useState(false);
    const handleBack = () => navigate(-1);
    const handleSave = async () => { await new Promise(r => setTimeout(r, 800)); setSaved(true); setTimeout(() => navigate(-1), 1200); };
    const options = [{ id: 'slow', label: 'Slow (AC)', desc: '3-7 kW - Home charging' }, { id: 'fast', label: 'Fast (DC)', desc: '50-150 kW - Public stations' }, { id: 'ultra', label: 'Ultra Fast', desc: '150-350 kW - Highway hubs' }];

    return (
        <div className="speed-page">
            <header className="speed-header"><button className="speed-header__back" onClick={handleBack}><ArrowLeft size={22} strokeWidth={2.2} /></button><h1 className="speed-header__title">Preferred Charging Speed</h1></header>
            <main className="speed-main">
                {saved ? (<div className="speed-success"><Check size={48} /><h3>Preference Saved!</h3></div>) : (<><div className="speed-list">{options.map(o => (<div key={o.id} className={`speed-item ${selected === o.id ? 'speed-item--selected' : ''}`} onClick={() => setSelected(o.id)}><div className="speed-item__icon"><Zap size={24} /></div><div className="speed-item__content"><span className="speed-item__label">{o.label}</span><span className="speed-item__desc">{o.desc}</span></div>{selected === o.id && <Check size={20} />}</div>))}</div><button className="speed-save-btn" onClick={handleSave}>Save Preference</button></>)}
            </main>
        </div>
    );
};
export default PreferredSpeedPage;
