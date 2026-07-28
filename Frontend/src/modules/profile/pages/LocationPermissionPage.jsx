import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Check, Loader2 } from 'lucide-react';
import '../styles/LocationPermissionPage.css';

const LocationPermissionPage = () => {
    const navigate = useNavigate();
    
    const [selected, setSelected] = useState('whileUsing');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const options = [
        {
            id: 'always',
            title: 'Always Allow',
            desc: 'Allow location access even when app is in background'
        },
        {
            id: 'whileUsing',
            title: 'While Using App',
            desc: 'Allow location access only when app is open'
        },
        {
            id: 'askEveryTime',
            title: 'Ask Every Time',
            desc: 'Request permission each time you open the app'
        },
        {
            id: 'never',
            title: 'Never',
            desc: 'Do not allow location access'
        }
    ];

    const handleBack = () => {
        if (!saving && !saved) {
            navigate(-1);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        // Save preference to localStorage or backend
        localStorage.setItem('locationPermission', selected);
        await new Promise((r) => setTimeout(r, 1000));
        setSaving(false);
        setSaved(true);

        setTimeout(() => {
            navigate('/settings');
        }, 1500);
    };

    const disabled = saving || saved;

    return (
        <div className="location-permission-page">
            <header className="lp-header">
                <button 
                    className="lp-header__back" 
                    onClick={handleBack} 
                    aria-label="Go back"
                    disabled={disabled}
                >
                    <ArrowLeft size={22} strokeWidth={2.2} />
                </button>
                <h1 className="lp-header__title">Location Permission</h1>
            </header>

            <div className="lp-content">
                {saved ? (
                    <div className="lp-success">
                        <div className="lp-success__icon">
                            <Check size={40} strokeWidth={3} />
                        </div>
                        <h2 className="lp-success__title">Permission Updated!</h2>
                        <p className="lp-success__desc">Your location preference has been saved.</p>
                    </div>
                ) : (
                    <>
                        <div className="lp-info-card">
                            <div className="lp-info-card__icon">
                                <MapPin size={40} strokeWidth={2} />
                            </div>
                            <h2 className="lp-info-card__title">Location Access</h2>
                            <p className="lp-info-card__desc">
                                We need your location to show nearby charging stations 
                                and provide navigation services.
                            </p>
                        </div>

                        <div className="lp-options">
                            {options.map((option) => (
                                <div
                                    key={option.id}
                                    className={`lp-option ${selected === option.id ? 'lp-option--selected' : ''}`}
                                    onClick={() => !disabled && setSelected(option.id)}
                                    role="radio"
                                    aria-checked={selected === option.id}
                                    tabIndex={0}
                                >
                                    <div className="lp-option__radio" />
                                    <div className="lp-option__content">
                                        <h3 className="lp-option__title">{option.title}</h3>
                                        <p className="lp-option__desc">{option.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {!saved && (
                <div className="lp-footer">
                    <button
                        className="lp-footer__save"
                        onClick={handleSave}
                        disabled={disabled}
                    >
                        {saving ? (
                            <>
                                <Loader2 size={18} className="lp-footer__spinner" />
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
                        className="lp-footer__cancel"
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

export default LocationPermissionPage;
