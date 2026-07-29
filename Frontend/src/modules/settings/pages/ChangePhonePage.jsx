import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, X } from 'lucide-react';
import './ChangePhonePage.css';

const ChangePhonePage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ currentPhone: '+91 9876543210', newPhone: '' });
    const [errors, setErrors] = useState({});
    const [sending, setSending] = useState(false);

    const handleBack = () => navigate(-1);
    const handleChange = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 10);
        setFormData(prev => ({ ...prev, newPhone: digits }));
        if (errors.newPhone) setErrors(prev => { const c = { ...prev }; delete c.newPhone; return c; });
    };
    const validate = () => {
        const e = {};
        if (!formData.newPhone) e.newPhone = 'Phone number is required';
        else if (formData.newPhone.length < 10) e.newPhone = 'Phone number must be 10 digits';
        else if (formData.newPhone === formData.currentPhone.replace(/\D/g, '')) e.newPhone = 'Must be different from current';
        return e;
    };
    const handleSendOTP = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
        setSending(true);
        await new Promise(r => setTimeout(r, 1500));
        setSending(false);
        navigate('/profile/settings/phone-verification', { state: { phone: formData.newPhone } });
    };
    const handleCancel = () => navigate(-1);

    return (
        <div className="change-phone-page">
            <header className="cp-header">
                <button className="cp-header__back" onClick={handleBack}><ArrowLeft size={22} strokeWidth={2.2} /></button>
                <h1 className="cp-header__title">Change Phone Number</h1>
            </header>
            <main className="cp-main">
                <div className="cp-info-card"><Phone size={24} className="cp-info-card__icon" /><p>We'll send a verification code to your new number</p></div>
                <div className="cp-field"><label className="cp-field__label">Current Number</label><input type="tel" className="cp-field__input cp-field__input--readonly" value={formData.currentPhone} readOnly disabled /></div>
                <div className="cp-field"><label className="cp-field__label">New Phone Number</label><div className="cp-field__phone-row"><button className="cp-field__country-btn" disabled>🇮🇳 +91</button><input type="tel" className={`cp-field__input ${errors.newPhone ? 'cp-field__input--error' : ''}`} value={formData.newPhone} onChange={(e) => handleChange(e.target.value)} placeholder="9876543210" inputMode="numeric" disabled={sending} /></div>{errors.newPhone && <span className="cp-field__error"><X size={12} /> {errors.newPhone}</span>}</div>
                <div className="cp-footer"><button className="cp-footer__cancel" onClick={handleCancel} disabled={sending}>Cancel</button><button className="cp-footer__send" onClick={handleSendOTP} disabled={sending}>{sending ? 'Sending...' : 'Send Verification Code'}</button></div>
            </main>
        </div>
    );
};
export default ChangePhonePage;
