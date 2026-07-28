import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Smartphone, Mail, Key, Check, X, Loader2 } from 'lucide-react';
import '../styles/TwoFactorPage.css';

const TwoFactorPage = () => {
    const navigate = useNavigate();
    
    const [enabled, setEnabled] = useState(false);
    const [showSetup, setShowSetup] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const methods = [
        { id: 'sms', icon: Smartphone, label: 'SMS', description: 'Receive codes via text message' },
        { id: 'email', icon: Mail, label: 'Email', description: 'Receive codes via email' },
        { id: 'authenticator', icon: Key, label: 'Authenticator App', description: 'Use Google Authenticator or similar' },
    ];

    const handleToggle = () => {
        if (enabled) {
            // Disable 2FA
            setEnabled(false);
            setVerified(false);
            setSelectedMethod(null);
        } else {
            // Show setup dialog
            setShowSetup(true);
        }
    };

    const handleSelectMethod = (methodId) => {
        setSelectedMethod(methodId);
    };

    const handleSendOtp = async () => {
        if (!selectedMethod) return;
        await new Promise(r => setTimeout(r, 1000));
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) value = value[0];
        if (!/^\d*$/.test(value)) return;
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleVerify = async () => {
        const otpValue = otp.join('');
        if (otpValue.length !== 6) return;
        
        setVerifying(true);
        await new Promise(r => setTimeout(r, 1500));
        setVerifying(false);
        setVerified(true);
        setEnabled(true);
        setShowSetup(false);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleBack = () => {
        if (showSetup) {
            setShowSetup(false);
            setSelectedMethod(null);
            setOtp(['', '', '', '', '', '']);
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="two-factor-page">
            <header className="2fa-header">
                <button className="2fa-header__back" onClick={handleBack} aria-label="Go back">
                    <ArrowLeft size={22} strokeWidth={2.2} />
                </button>
                <h1 className="2fa-header__title">Two-Factor Authentication</h1>
            </header>

            <div className="2fa-content">
                {/* Status Card */}
                <div className={`2fa-status-card ${enabled ? '2fa-status-card--enabled' : ''}`}>
                    <div className="2fa-status-card__icon">
                        <Shield size={32} strokeWidth={1.8} />
                    </div>
                    <div className="2fa-status-card__info">
                        <h3 className="2fa-status-card__title">
                            {enabled ? '2FA Enabled' : '2FA Disabled'}
                        </h3>
                        <p className="2fa-status-card__desc">
                            {enabled 
                                ? 'Your account is protected with two-factor authentication' 
                                : 'Add an extra layer of security to your account'}
                        </p>
                    </div>
                    <button
                        className={`2fa-toggle ${enabled ? '2fa-toggle--on' : ''}`}
                        onClick={handleToggle}
                    >
                        <span className="2fa-toggle__thumb" />
                    </button>
                </div>

                {enabled && (
                    <div className="2fa-methods">
                        <h3 className="2fa-section-title">Active Method</h3>
                        <div className="2fa-method-card">
                            {selectedMethod === 'sms' && <Smartphone size={24} />}
                            {selectedMethod === 'email' && <Mail size={24} />}
                            {selectedMethod === 'authenticator' && <Key size={24} />}
                            <span>{methods.find(m => m.id === selectedMethod)?.label || 'Not configured'}</span>
                        </div>
                    </div>
                )}

                {/* Setup Dialog */}
                {showSetup && (
                    <div className="2fa-setup">
                        {!selectedMethod ? (
                            <>
                                <h3 className="2fa-setup-title">Choose Verification Method</h3>
                                <p className="2fa-setup-desc">Select how you want to receive verification codes</p>
                                
                                <div className="2fa-methods-list">
                                    {methods.map((method) => {
                                        const Icon = method.icon;
                                        return (
                                            <div
                                                key={method.id}
                                                className={`2fa-method-option ${selectedMethod === method.id ? '2fa-method-option--selected' : ''}`}
                                                onClick={() => handleSelectMethod(method.id)}
                                                role="button"
                                                tabIndex={0}
                                            >
                                                <div className="2fa-method-option__icon">
                                                    <Icon size={24} strokeWidth={1.8} />
                                                </div>
                                                <div className="2fa-method-option__info">
                                                    <h4 className="2fa-method-option__label">{method.label}</h4>
                                                    <p className="2fa-method-option__desc">{method.description}</p>
                                                </div>
                                                {selectedMethod === method.id && (
                                                    <Check size={20} className="2fa-method-option__check" />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {selectedMethod && (
                                    <button
                                        className="2fa-continue-btn"
                                        onClick={handleSendOtp}
                                    >
                                        Continue
                                    </button>
                                )}
                            </>
                        ) : (
                            <>
                                <h3 className="2fa-setup-title">Verify {methods.find(m => m.id === selectedMethod)?.label}</h3>
                                <p className="2fa-setup-desc">
                                    {selectedMethod === 'sms' && 'Enter the code sent to your phone'}
                                    {selectedMethod === 'email' && 'Enter the code sent to your email'}
                                    {selectedMethod === 'authenticator' && 'Enter the code from your authenticator app'}
                                </p>

                                <div className="2fa-otp-row">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            className="2fa-otp-input"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            disabled={verifying || verified}
                                        />
                                    ))}
                                </div>

                                {verified && (
                                    <div className="2fa-success">
                                        <Check size={48} strokeWidth={1.5} />
                                        <p>Two-factor authentication enabled successfully!</p>
                                    </div>
                                )}

                                {!verified && (
                                    <button
                                        className="2fa-verify-btn"
                                        onClick={handleVerify}
                                        disabled={verifying || otp.some(d => !d)}
                                    >
                                        {verifying ? (
                                            <>
                                                <Loader2 size={18} className="2fa-spinner" />
                                                Verifying...
                                            </>
                                        ) : (
                                            <>
                                                <Check size={18} />
                                                Verify & Enable
                                            </>
                                        )}
                                    </button>
                                )}
                            </>
                        )}

                        <button
                            className="2fa-cancel-btn"
                            onClick={() => {
                                setShowSetup(false);
                                setSelectedMethod(null);
                                setOtp(['', '', '', '', '', '']);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {!showSetup && (
                <div className="2fa-footer">
                    <button
                        className="2fa-footer__cancel"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default TwoFactorPage;
