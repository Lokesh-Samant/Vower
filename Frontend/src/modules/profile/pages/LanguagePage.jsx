import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Globe } from 'lucide-react';
import '../styles/LanguagePage.css';

const languages = [
    { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇵🇹' },
    { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
];

const LanguagePage = () => {
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [saving, setSaving] = useState(false);

    const handleSelect = (code) => {
        setSelectedLanguage(code);
    };

    const handleSave = async () => {
        setSaving(true);
        await new Promise(r => setTimeout(r, 1000));
        setSaving(false);
        navigate('/settings');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="language-page">
            <header className="lang-header">
                <button className="lang-header__back" onClick={handleBack} aria-label="Go back">
                    <ArrowLeft size={22} strokeWidth={2.2} />
                </button>
                <h1 className="lang-header__title">Language</h1>
            </header>

            <div className="lang-content">
                <div className="lang-current">
                    <Globe size={20} />
                    <span>Current: {languages.find(l => l.code === selectedLanguage)?.name}</span>
                </div>

                <div className="lang-list">
                    {languages.map((lang) => (
                        <div
                            key={lang.code}
                            className={`lang-item ${selectedLanguage === lang.code ? 'lang-item--selected' : ''}`}
                            onClick={() => handleSelect(lang.code)}
                            role="button"
                            tabIndex={0}
                        >
                            <span className="lang-item__flag">{lang.flag}</span>
                            <div className="lang-item__info">
                                <span className="lang-item__name">{lang.name}</span>
                                <span className="lang-item__native">{lang.native}</span>
                            </div>
                            {selectedLanguage === lang.code && (
                                <Check size={20} className="lang-item__check" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="lang-footer">
                <button
                    className="lang-footer__save"
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? 'Saving...' : 'Save Language'}
                </button>
                <button
                    className="lang-footer__cancel"
                    onClick={handleCancel}
                    disabled={saving}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default LanguagePage;
