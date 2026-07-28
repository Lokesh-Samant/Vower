import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Check, X, Loader2, KeyRound } from 'lucide-react';
import '../styles/ChangePhonePage.css';

const ChangePhonePage = () => {
    const navigate = useNavigate();
    
    const [currentPhone] = useState('+91 9876543210');
    const [newPhone, setNewPhone] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [countdown, setCountdown] = useState(0);

    const validatePhone = (phone) => /^\d{10}$/.test(phone.replace(/\D/g, ''));

    const handleSendOtp = async () => {
        if (!validatePhone(newPhone)) {
            setErrors({ phone: 'Please enter a valid 10-digit phone number' });
            return;
        }
        
        setOtpSent(true);
        setCountdown(30);
        
        await new Promise(r => setTimeout(r, 1000));
        
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleResendOtp = async () => {
        setCountdown(30);
        await new Promise(r => setTimeout(r, 1000));
        
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) value = value[0];
        if (!/^\d*$/.test(value)) return;
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        
        if (value && index < 3) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleVerifyOtp = async () => {
        const otpValue = otp.join('');
        if (otpValue.length !== 4) {
            setErrors({ otp: 'Please enter complete OTP' });
            return;
        }
        
        setVerifying(true);
        await new Promise(r => setTimeout(r, 1500));
        setVerifying(false);
        setVerified(true);
    };

    const handleSave = async () => {
        setSaving(true);
        await new Promise(r => setTimeout(r, 1500));
        setSaving(false);
        
        setTimeout(() => {
            navigate('/settings');
        }, 1000);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const disabled = saving || verifying;

    return (
        <div className="change-phone-page">
            <header className="cp-header">
                <button className="cp-header__back" onClick={handleCancel} aria-label="Go back" disabled={disabled}>
                    <ArrowLeft size={22} strokeWidth={2.2} />
                </button>
                <h1 className="cp-header__title">Change Phone Number</h1>
            </header>

            <div className="cp-content">
                {/* Current Phone */}
                <div className="cp-field">
                    <label className="cp-field__label">Current Phone Number</label>
                    <div className="cp-field__display">
                        <Phone size={18} />
                        <span>{currentPhone}</span>
                    </div>
                </div>

                {/* New Phone */}
                {!otpSent ? (
                    <div className="cp-field">
                        <label className="cp-field__label" htmlFor="new-phone">New Phone Number</label>
                        <div className="cp-field__input-wrap">
                            <span className="cp-field__prefix">+91</span>
                            <input
                                id="new-phone"
                                type="tel"
                                className={`cp-field__input ${errors.phone ? 'cp-field__input--error' : ''}`}
                                value={newPhone}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    setNewPhone(val);
                                    if (errors.phone) setErrors({});
                                }}
                                placeholder="Enter 10-digit number"
                                disabled={disabled}
                                maxLength={10}
                            />
                        </div>
                        {errors.phone && (
                            <span className="cp-field__error">
                                <X size={12} /> {errors.phone}
                            </span>
                        )}
                        <button
                            className="cp-send-btn"
                            onClick={handleSendOtp}
                            disabled={disabled || newPhone.length < 10}
                        >
                            Send OTP
                        </button>
                    </div>
                ) : (
                    <>
                        {/* OTP Input */}
                        <div className="cp-field">
                            <label className="cp-field__label">Enter OTP</label>
                            <p className="cp-field__hint">
                                We've sent a verification code to +91 {newPhone}
                            </p>
                            <div className="cp-otp-row">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        className={`cp-otp-input ${verified ? 'cp-otp-input--verified' : ''}`}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        disabled={disabled || verified}
                                    />
                                ))}
                            </div>
                            {errors.otp && (
                                <span className="cp-field__error">
                                    <X size={12} /> {errors.otp}
                                </span>
                            )}
                            {verified && (
                                <span className="cp-field__success">
                                    <Check size={12} /> Phone number verified successfully
                                </span>
                            )}
                            
                            <div className="cp-resend-row">
                                <span className="cp-resend-text">Didn't receive code?</span>
                                {countdown > 0 ? (
                                    <span className="cp-countdown">Resend in {countdown}s</span>
                                ) : (
                                    <button
                                        className="cp-resend-btn"
                                        onClick={handleResendOtp}
                                        disabled={disabled}
                                    >
                                        Resend OTP
                                    </button>
                                )}
                            </div>
                        </div>

                        {!verified && (
                            <button
                                className="cp-verify-btn"
                                onClick={handleVerifyOtp}
                                disabled={disabled || otp.some(d => !d)}
                            >
                                {verifying ? (
                                    <>
                                        <Loader2 size={18} className="cp-spinner" />
                                        Verifying...
                                    </>
                                ) : (
                                    <>
                                        <KeyRound size={18} />
                                        Verify OTP
                                    </>
                                )}
                            </button>
                        )}
                    </>
                )}
            </div>

            {/* Save Button */}
            {verified && (
                <div className="cp-footer">
                    <button
                        className="cp-footer__save"
                        onClick={handleSave}
                        disabled={disabled}
                    >
                        {saving ? (
                            <>
                                <Loader2 size={18} className="cp-spinner" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Check size={18} />
                                Save Phone Number
                            </>
                        )}
                    </button>
                    <button
                        className="cp-footer__cancel"
                        onClick={handleCancel}
                        disabled={disabled}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChangePhonePage;
