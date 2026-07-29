import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Smartphone, Mail, Key, Check } from 'lucide-react';
import './TwoFactorSetupPage.css';

const TwoFactorSetupPage = () => {
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [completed, setCompleted] = useState(false);
    const handleBack = () => navigate(-1);
    const handleSelect = (method) => setSelectedMethod(method);
    const handleComplete = async () => {
        await new Promise(r => setTimeout(r, 1000));
        setCompleted(true);
        setTimeout(() => navigate(-1), 1500);
    };
    const methods = [{ id: 'sms', icon: Smartphone, label: 'SMS', desc: 'Get codes via text message' }, { id: 'email', icon: Mail, label: 'Email', desc: 'Receive codes in your email' }, { id: 'authenticator', icon: Key, label: 'Authenticator App', desc: 'Use Google Authenticator or similar' }];

    return (
        <div className="2fa-page">
            <header className="2fa-header"><button className="2fa-header__back" onClick={handleBack}><ArrowLeft size={22} strokeWidth={2.2} /></button><h1 className="2fa-header__title">Two-Factor Authentication</h1></header>
            <main className="2fa-main">
                {completed ? (<div className="2fa-success"><div className="2fa-success__icon"><Check size={48} /></div><h2>2FA Enabled!</h2><p>Your account is now more secure</p></div>) : selectedMethod ? (<div className="2fa-setup"><Shield size={48} className="2fa-setup__icon" /><h3>Setup {methods.find(m => m.id === selectedMethod)?.label}</h3><p>Follow the instructions to complete setup</p><button className="2fa-setup__btn" onClick={handleComplete}>Complete Setup</button></div>) : (<div className="2fa-methods">{methods.map(m => <div key={m.id} className={`2fa-method ${selectedMethod === m.id ? '2fa-method--selected' : ''}`} onClick={() => handleSelect(m.id)}><div className="2fa-method__icon"><m.icon size={24} /></div><div className="2fa-method__content"><span className="2fa-method__label">{m.label}</span><span className="2fa-method__desc">{m.desc}</span></div>{selectedMethod === m.id && <Check size={20} className="2fa-method__check" />}</div>)}</div>)}
            </main>
        </div>
    );
};
export default TwoFactorSetupPage;
