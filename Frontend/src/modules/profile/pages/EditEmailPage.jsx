import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Check, X, Loader2, KeyRound } from 'lucide-react';
import '../styles/EditEmailPage.css';

const EditEmailPage = () => {
    const navigate = useNavigate();
    
    const [currentEmail] = useState('rahul.sharma@email.com');
    const [newEmail, setNewEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [countdown, setCountdown] = useState(0);

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleSendOtp = async () => {
        if (!validateEmail(newEmail)) {
            setErrors({ email: 'Please enter a valid email address' });
            return;
        }
        
        setOtpSent(true);
        setCountdown(30);
        
        // Simulate sending OTP
        await new Promise(r => setTimeout(r, 1000));
        
        // Start countdown
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
        
        // Auto-focus next field
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
        <div className="edit-email-page">
            <header className="ee-header">
                <button className="ee-header__back" onClick={handleCancel} aria-label="Go back" disabled={disabled}>
                    <ArrowLeft size={22} strokeWidth={2.2} />
                </button>
                <h1 className="ee-header__title">Change Email</h1>
            </header>

            <div className="ee-content">
                {/* Current Email */}
                <div className="ee-field">
                    <label className="ee-field__label">Current Email</label>
                    <div className="ee-field__display">
                        <Mail size={18} />
                        <span>{currentEmail}</span>
                    </div>
                </div>

                {/* New Email */}
                {!otpSent ? (
                    <div className="ee-field">
                        <label className="ee-field__label" htmlFor="new-email">New Email Address</label>
                        <div className="ee-field__input-wrap">
                            <input
                                id="new-email"
                                type="email"
                                className={`ee-field__input ${errors.email ? 'ee-field__input--error' : ''}`}
                                value={newEmail}
                                onChange={(e) => {
                                    setNewEmail(e.target.value);
                                    if (errors.email) setErrors({});
                                }}
                                placeholder="Enter new email"
                                disabled={disabled}
                                autoComplete="email"
                            />
                        </div>
                        {errors.email && (
                            <span className="ee-field__error">
                                <X size={12} /> {errors.email}
                            </span>
                        )}
                        <button
                            className="ee-send-btn"
                            onClick={handleSendOtp}
                            disabled={disabled || !newEmail}
                        >
                            Send OTP
                        </button>
                    </div>
                ) : (
                    <>
                        {/* OTP Input */}
                        <div className="ee-field">
                            <label className="ee-field__label">Enter OTP</label>
                            <p className="ee-field__hint">
                                We've sent a verification code to {newEmail}
                            </p>
                            <div className="ee-otp-row">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        className={`ee-otp-input ${verified ? 'ee-otp-input--verified' : ''}`}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        disabled={disabled || verified}
                                    />
                                ))}
                            </div>
                            {errors.otp && (
                                <span className="ee-field__error">
                                    <X size={12} /> {errors.otp}
                                </span>
                            )}
                            {verified && (
                                <span className="ee-field__success">
                                    <Check size={12} /> Email verified successfully
                                </span>
                            )}
                            
                            <div className="ee-resend-row">
                                <span className="ee-resend-text">Didn't receive code?</span>
                                {countdown > 0 ? (
                                    <span className="ee-countdown">Resend in {countdown}s</span>
                                ) : (
                                    <button
                                        className="ee-resend-btn"
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
                                className="ee-verify-btn"
                                onClick={handleVerifyOtp}
                                disabled={disabled || otp.some(d => !d)}
                            >
                                {verifying ? (
                                    <>
                                        <Loader2 size={18} className="ee-spinner" />
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
                <div className="ee-footer">
                    <button
                        className="ee-footer__save"
                        onClick={handleSave}
                        disabled={disabled}
                    >
                        {saving ? (
                            <>
                                <Loader2 size={18} className="ee-spinner" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Check size={18} />
                                Save Email
                            </>
                        )}
                    </button>
                    <button
                        className="ee-footer__cancel"
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

export default EditEmailPage;
