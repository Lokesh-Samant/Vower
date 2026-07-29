import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Phone, Check } from 'lucide-react';
import './PhoneVerificationPage.css';

const PhoneVerificationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const phone = location.state?.phone || 'your number';
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);

    const handleBack = () => navigate(-1);
    const handleOtpChange = (index, value) => {
        if (value.length > 1) value = value.slice(0, 1);
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
    };
    const handleVerify = async () => {
        if (otp.join('').length !== 6) return;
        setVerifying(true);
        await new Promise(r => setTimeout(r, 1500));
        setVerifying(false);
        setVerified(true);
        setTimeout(() => navigate(-2), 1500);
    };

    return (
        <div className="phone-verify-page">
            <header className="pv-header"><button className="pv-header__back" onClick={handleBack}><ArrowLeft size={22} strokeWidth={2.2} /></button><h1 className="pv-header__title">Verify Phone</h1></header>
            <main className="pv-main">
                {verified ? (<div className="pv-success"><div className="pv-success__icon"><Check size={48} /></div><h2>Phone Verified!</h2><p>Your phone number has been updated</p></div>) : (
                    <><div className="pv-info"><Phone size={32} className="pv-info__icon" /><p>We've sent a code to</p><p className="pv-info__phone">+91 {phone}</p></div>
                    <div className="pv-otp-row">{otp.map((digit, i) => (<input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1} className="pv-otp-input" value={digit} onChange={(e) => handleOtpChange(i, e.target.value)} disabled={verifying} />))}</div>
                    <button className="pv-verify-btn" onClick={handleVerify} disabled={verifying}>{verifying ? 'Verifying...' : 'Verify Phone'}</button></>
                )}
            </main>
        </div>
    );
};
export default PhoneVerificationPage;
