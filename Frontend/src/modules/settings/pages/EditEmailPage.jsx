import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Check, X } from 'lucide-react';
import './EditEmailPage.css';

const EditEmailPage = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        currentEmail: 'rahul.sharma@email.com',
        newEmail: '',
    });
    
    const [errors, setErrors] = useState({});
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleBack = () => {
        navigate(-1);
    };

    const handleChange = (value) => {
        setFormData(prev => ({ ...prev, newEmail: value }));
        if (errors.newEmail) {
            setErrors(prev => {
                const copy = { ...prev };
                delete copy.newEmail;
                return copy;
            });
        }
    };

    const validate = () => {
        const e = {};
        if (!formData.newEmail.trim()) {
            e.newEmail = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.newEmail)) {
            e.newEmail = 'Invalid email address';
        } else if (formData.newEmail === formData.currentEmail) {
            e.newEmail = 'Email must be different from current';
        }
        return e;
    };

    const handleSendOTP = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSending(true);
        await new Promise(r => setTimeout(r, 1500));
        setSending(false);
        setSent(true);
        
        // Navigate to verification page with email
        setTimeout(() => {
            navigate('/profile/settings/email-verification', { 
                state: { email: formData.newEmail } 
            });
        }, 500);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="edit-email-page">
            <header className="ee-header">
                <button
                    className="ee-header__back"
                    onClick={handleBack}
                    aria-label="Go back"
                >
                    <ArrowLeft size={22} strokeWidth={2.2} />
                </button>
                <h1 className="ee-header__title">Edit Email Address</h1>
            </header>

            <main className="ee-main">
                <div className="ee-info-card">
                    <Mail size={24} strokeWidth={1.8} className="ee-info-card__icon" />
                    <p className="ee-info-card__text">
                        We'll send a verification code to your new email address
                    </p>
                </div>

                <div className="ee-field">
                    <label className="ee-field__label" htmlFor="current-email">
                        Current Email
                    </label>
                    <input
                        id="current-email"
                        type="email"
                        className="ee-field__input ee-field__input--readonly"
                        value={formData.currentEmail}
                        readOnly
                        disabled
                    />
                </div>

                <div className="ee-field">
                    <label className="ee-field__label" htmlFor="new-email">
                        New Email Address
                    </label>
                    <input
                        id="new-email"
                        type="email"
                        className={`ee-field__input ${errors.newEmail ? 'ee-field__input--error' : ''}`}
                        value={formData.newEmail}
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder="Enter new email address"
                        disabled={sent || sending}
                    />
                    {errors.newEmail && (
                        <span className="ee-field__error">
                            <X size={12} /> {errors.newEmail}
                        </span>
                    )}
                </div>

                <div className="ee-footer">
                    <button
                        className="ee-footer__cancel"
                        onClick={handleCancel}
                        disabled={sending || sent}
                    >
                        Cancel
                    </button>
                    <button
                        className="ee-footer__send"
                        onClick={handleSendOTP}
                        disabled={sending || sent}
                    >
                        {sending ? 'Sending...' : sent ? 'Sent!' : 'Send Verification Code'}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default EditEmailPage;
