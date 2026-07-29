import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import './LanguageSelectorPage.css';

const languages = [{ code: 'en', name: 'English', native: 'English' }, { code: 'hi', name: 'Hindi', native: 'हिन्दी' }, { code: 'es', name: 'Spanish', native: 'Español' }, { code: 'fr', name: 'French', native: 'Français' }, { code: 'de', name: 'German', native: 'Deutsch' }, { code: 'zh', name: 'Chinese', native: '中文' }];

const LanguageSelectorPage = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('en');
    const [saved, setSaved] = useState(false);
    const handleBack = () => navigate(-1);
    const handleSave = async () => {
        await new Promise(r => setTimeout(r, 800));
        setSaved(true);
        setTimeout(() => navigate(-1), 1200);
    };

    return (
        <div className="lang-page">
            <header className="lang-header"><button className="lang-header__back" onClick={handleBack}><ArrowLeft size={22} strokeWidth={2.2} /></button><h1 className="lang-header__title">Select Language</h1></header>
            <main className="lang-main">
                {saved ? (<div className="lang-success"><Check size={48} /><h3>Language Updated!</h3></div>) : (<><div className="lang-list">{languages.map(l => (<div key={l.code} className={`lang-item ${selected === l.code ? 'lang-item--selected' : ''}`} onClick={() => setSelected(l.code)}><span className="lang-item__name">{l.name}</span><span className="lang-item__native">{l.native}</span>{selected === l.code && <Check size={20} className="lang-item__check" />}</div>))}</div><button className="lang-save-btn" onClick={handleSave}>Save</button></>)}
            </main>
        </div>
    );
};
export default LanguageSelectorPage;
