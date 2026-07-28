import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Check, Loader2, Clock, TrendingUp } from 'lucide-react';
import '../styles/ChargingSpeedPage.css';

const ChargingSpeedPage = () => {
    const navigate = useNavigate();
    
    const [selected, setSelected] = useState('fast');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const options = [
        {
            id: 'slow',
            title: 'Slow Charging',
            desc: 'Standard AC charging, ideal for overnight charging at home',
            icon: Clock,
            specs: ['3-6 kW', '8-12 hours full charge'],
            class: 'cs-option--slow'
        },
        {
            id: 'fast',
            title: 'Fast Charging',
            desc: 'DC fast charging, perfect for quick top-ups during trips',
            icon: TrendingUp,
            specs: ['50-150 kW', '30-60 min to 80%'],
            class: 'cs-option--fast'
        },
        {
            id: 'ultra',
            title: 'Ultra Fast Charging',
            desc: 'High-power DC charging for minimum wait times',
            icon: Lightning,
            specs: ['150-350 kW', '15-30 min to 80%'],
            class: 'cs-option--ultra'
        }
    ];

    const handleBack = () => {
        if (!saving && !saved) {
            navigate(-1);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        localStorage.setItem('preferredChargingSpeed', selected);
        await new Promise((r) => setTimeout(r, 1000));
        setSaving(false);
        setSaved(true);

        setTimeout(() => {
            navigate('/settings');
        }, 1500);
    };

    const disabled = saving || saved;

    return (
        <div className="charging-speed-page">
            <header className="cs-header">
                <button 
                    className="cs-header__back" 
                    onClick={handleBack} 
                    aria-label="Go back"
                    disabled={disabled}
                >
                    <ArrowLeft size={22} strokeWidth={2.2} />
                </button>
                <h1 className="cs-header__title">Preferred Charging Speed</h1>
            </header>

            <div className="cs-content">
                {saved ? (
                    <div className="cs-success">
                        <div className="cs-success__icon">
                            <Check size={40} strokeWidth={3} />
                        </div>
                        <h2 className="cs-success__title">Preference Saved!</h2>
                        <p className="cs-success__desc">Your preferred charging speed has been updated.</p>
                    </div>
                ) : (
                    <>
                        <div className="cs-info-card">
                            <div className="cs-info-card__icon">
                                <Zap size={40} strokeWidth={2} />
                            </div>
                            <h2 className="cs-info-card__title">Charging Speed Preference</h2>
                            <p className="cs-info-card__desc">
                                Select your preferred charging speed. This will help us recommend 
                                the best charging stations for your needs.
                            </p>
                        </div>

                        <div className="cs-options">
                            {options.map((option) => {
                                const Icon = option.icon;
                                return (
                                    <div
                                        key={option.id}
                                        className={`cs-option ${option.class} ${selected === option.id ? 'cs-option--selected' : ''}`}
                                        onClick={() => !disabled && setSelected(option.id)}
                                        role="radio"
                                        aria-checked={selected === option.id}
                                        tabIndex={0}
                                    >
                                        <div className="cs-option__header">
                                            <div className="cs-option__icon">
                                                <Icon size={26} strokeWidth={2} />
                                            </div>
                                            <div className="cs-option__check">
                                                <Check size={16} strokeWidth={3} />
                                            </div>
                                        </div>
                                        <h3 className="cs-option__title">{option.title}</h3>
                                        <p className="cs-option__desc">{option.desc}</p>
                                        <div className="cs-option__specs">
                                            {option.specs.map((spec, idx) => (
                                                <span key={idx} className="cs-spec">
                                                    <Zap size={12} />
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            {!saved && (
                <div className="cs-footer">
                    <button
                        className="cs-footer__save"
                        onClick={handleSave}
                        disabled={disabled}
                    >
                        {saving ? (
                            <>
                                <Loader2 size={18} className="cs-footer__spinner" />
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
                        className="cs-footer__cancel"
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

export default ChargingSpeedPage;
