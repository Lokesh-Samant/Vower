import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Check, Loader2, Plug, AlertCircle, Globe, Sparkles } from 'lucide-react';
import '../styles/ConnectorPage.css';

const ConnectorPage = () => {
    const navigate = useNavigate();
    
    const [selected, setSelected] = useState('auto');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const options = [
        {
            id: 'ccs',
            title: 'CCS2',
            desc: 'Combined Charging System - Most common in Europe and North America',
            icon: Zap,
            class: 'conn-option--ccs'
        },
        {
            id: 'type2',
            title: 'Type 2 (Mennekes)',
            desc: 'Standard AC charging connector widely used in Europe',
            icon: Plug,
            class: 'conn-option--type2'
        },
        {
            id: 'chademo',
            title: 'CHAdeMO',
            desc: 'Fast charging standard developed in Japan, common for Nissan vehicles',
            icon: AlertCircle,
            class: 'conn-option--chademo'
        },
        {
            id: 'auto',
            title: 'Auto Detect',
            desc: 'Automatically detect and suggest compatible connectors for your vehicle',
            icon: Sparkles,
            class: 'conn-option--auto'
        }
    ];

    const handleBack = () => {
        if (!saving && !saved) {
            navigate(-1);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        localStorage.setItem('preferredConnector', selected);
        await new Promise((r) => setTimeout(r, 1000));
        setSaving(false);
        setSaved(true);

        setTimeout(() => {
            navigate('/settings');
        }, 1500);
    };

    const disabled = saving || saved;

    return (
        <div className="connector-page">
            <header className="conn-header">
                <button 
                    className="conn-header__back" 
                    onClick={handleBack} 
                    aria-label="Go back"
                    disabled={disabled}
                >
                    <ArrowLeft size={22} strokeWidth={2.2} />
                </button>
                <h1 className="conn-header__title">Preferred Connector</h1>
            </header>

            <div className="conn-content">
                {saved ? (
                    <div className="conn-success">
                        <div className="conn-success__icon">
                            <Check size={40} strokeWidth={3} />
                        </div>
                        <h2 className="conn-success__title">Preference Saved!</h2>
                        <p className="conn-success__desc">Your preferred connector type has been updated.</p>
                    </div>
                ) : (
                    <>
                        <div className="conn-info-card">
                            <div className="conn-info-card__icon">
                                <Globe size={40} strokeWidth={2} />
                            </div>
                            <h2 className="conn-info-card__title">Connector Type</h2>
                            <p className="conn-info-card__desc">
                                Select your preferred connector type. This helps us show 
                                compatible charging stations for your electric vehicle.
                            </p>
                        </div>

                        <div className="conn-options">
                            {options.map((option) => {
                                const Icon = option.icon;
                                return (
                                    <div
                                        key={option.id}
                                        className={`conn-option ${option.class} ${selected === option.id ? 'conn-option--selected' : ''}`}
                                        onClick={() => !disabled && setSelected(option.id)}
                                        role="radio"
                                        aria-checked={selected === option.id}
                                        tabIndex={0}
                                    >
                                        <div className="conn-option__icon">
                                            <Icon size={28} strokeWidth={2} />
                                        </div>
                                        <div className="conn-option__content">
                                            <h3 className="conn-option__title">{option.title}</h3>
                                            <p className="conn-option__desc">{option.desc}</p>
                                        </div>
                                        <div className="conn-option__check">
                                            <Check size={16} strokeWidth={3} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            {!saved && (
                <div className="conn-footer">
                    <button
                        className="conn-footer__save"
                        onClick={handleSave}
                        disabled={disabled}
                    >
                        {saving ? (
                            <>
                                <Loader2 size={18} className="conn-footer__spinner" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Check size={18} />
                                Save Preference
                            </>
                        )}
                    </button>
                    <button
                        className="conn-footer__cancel"
                        onClick={handleBack}
                        disabled={disabled}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default ConnectorPage;
