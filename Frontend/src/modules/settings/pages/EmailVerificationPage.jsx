import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, Check, X } from 'lucide-react';
import './EmailVerificationPage.css';

const EmailVerificationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || 'your email';
    
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);
    const [resending, setResending] = useState(false);
    const [errors, setErrors] = useState({});

    const handleBack = () => navigate(-1);

    const handleOtpChange = (index, value) => {
        if (value.length > 1) value = value.slice(0, 1);
        if (!/^\d*$/.test(value)) return;
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    const handleVerify = async () => {
        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
            setErrors({ general: 'Please enter complete OTP' });
            return;
        }
        setVerifying(true);
        await new Promise(r => setTimeout(r, 1500));
        setVerifying(false);
        setVerified(true);
        setTimeout(() => navigate(-2), 1500);
    };

    const handleResend = async () => {
        setResending(true);
        await new Promise(r => setTimeout(r, 1000));
        setResending(false);
        setOtp(['', '', '', '', '', '']);
    };

    return (
        <div className="email-verify-page">
            <header className="ev-header">
                <button className="ev-header__back" onClick={handleBack}>
                    <ArrowLeft size={22} strokeWidth={2.2} />
                </button>
                <h1 className="ev-header__title">Verify Email</h1>
            </header>
            <main className="ev-main">
                {verified ? (
                    <div className="ev-success">
                        <div className="ev-success__icon"><Check size={48} /></div>
                        <h2>Email Verified!</h2>
                        <p>Your email has been updated successfully</p>
                    </div>
                ) : (
                    <>
                        <div className="ev-info">
                            <Mail size={32} strokeWidth={1.5} className="ev-info__icon" />
                            <p>We've sent a 6-digit code to</p>
                            <p className="ev-info__email">{email}</p>
                        </div>
                        <div className="ev-otp-row">
                            {otp.map((digit, i) => (
                                <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1}
                                    className={`ev-otp-input ${errors.general ? 'ev-otp-input--error' : ''}`}
                                    value={digit} onChange={(e) => handleOtpChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)} disabled={verifying} />
                            ))}
                        </div>
                        {errors.general && <span className="ev-error">{errors.general}</span>}
                        <button className="ev-verify-btn" onClick={handleVerify} disabled={verifying}>
                            {verifying ? 'Verifying...' : 'Verify Email'}
                        </button>
                        <button className="ev-resend-btn" onClick={handleResend} disabled={resending}>
                            {resending ? 'Sending...' : "Didn't receive code? Resend"}
                        </button>
                    </>
                )}
            </main>
        </div>
    );
};
export default EmailVerificationPage;
