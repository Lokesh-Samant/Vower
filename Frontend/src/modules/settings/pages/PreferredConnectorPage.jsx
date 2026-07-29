import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plug, Check } from 'lucide-react';
import './PreferredConnectorPage.css';

const PreferredConnectorPage = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('ccs2');
    const [saved, setSaved] = useState(false);
    const handleBack = () => navigate(-1);
    const handleSave = async () => { await new Promise(r => setTimeout(r, 800)); setSaved(true); setTimeout(() => navigate(-1), 1200); };
    const options = [{ id: 'ccs2', label: 'CCS2', desc: 'Combined Charging System' }, { id: 'type2', label: 'Type 2', desc: 'Mennekes connector' }, { id: 'chademo', label: 'CHAdeMO', desc: 'Japanese standard' }, { id: 'auto', label: 'Auto Detect', desc: 'Let the app choose' }];

    return (
        <div className="conn-page">
            <header className="conn-header"><button className="conn-header__back" onClick={handleBack}><ArrowLeft size={22} strokeWidth={2.2} /></button><h1 className="conn-header__title">Preferred Connector</h1></header>
            <main className="conn-main">
                {saved ? (<div className="conn-success"><Check size={48} /><h3>Saved!</h3></div>) : (<><div className="conn-list">{options.map(o => (<div key={o.id} className={`conn-item ${selected === o.id ? 'conn-item--selected' : ''}`} onClick={() => setSelected(o.id)}><div className="conn-item__icon"><Plug size={24} /></div><div className="conn-item__content"><span className="conn-item__label">{o.label}</span><span className="conn-item__desc">{o.desc}</span></div>{selected === o.id && <Check size={20} />}</div>))}</div><button className="conn-save-btn" onClick={handleSave}>Save Preference</button></>)}
            </main>
        </div>
    );
};
export default PreferredConnectorPage;
