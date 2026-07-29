import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Eye, EyeOff, Check, X } from 'lucide-react';
import './ChangePasswordPage.css';

const ChangePasswordPage = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleBack = () => {
        navigate(-1);
    };

    const togglePassword = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => {
                const copy = { ...prev };
                delete copy[field];
                return copy;
            });
        }
    };

    const validate = () => {
        const e = {};
        if (!formData.currentPassword) {
            e.currentPassword = 'Current password is required';
        }
        if (!formData.newPassword) {
            e.newPassword = 'New password is required';
        } else if (formData.newPassword.length < 8) {
            e.newPassword = 'Password must be at least 8 characters';
        }
        if (!formData.confirmPassword) {
            e.confirmPassword = 'Please confirm your password';
        } else if (formData.newPassword !== formData.confirmPassword) {
            e.confirmPassword = 'Passwords do not match';
        }
        return e;
    };

    const handleSave = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSaving(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1500));
        setSaving(false);
        setSuccess(true);
        
        setTimeout(() => {
            navigate(-1);
        }, 1800);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="change-password-page">
            <header className="cp-header">
                <button
                    className="cp-header__back"
                    onClick={handleBack}
                    aria-label="Go back"
                >
                    <ArrowLeft size={22} strokeWidth={2.2} />
                </button>
                <h1 className="cp-header__title">Change Password</h1>
            </header>

            <main className="cp-main">
                {success ? (
                    <div className="cp-success">
                        <div className="cp-success__icon">
                            <Check size={48} strokeWidth={2} />
                        </div>
                        <h2 className="cp-success__title">Password Updated!</h2>
                        <p className="cp-success__message">Your password has been changed successfully</p>
                    </div>
                ) : (
                    <>
                        <div className="cp-field">
                            <label className="cp-field__label" htmlFor="current-password">
                                Current Password
                            </label>
                            <div className="cp-field__input-wrap">
                                <input
                                    id="current-password"
                                    type={showPasswords.current ? 'text' : 'password'}
                                    className={`cp-field__input ${errors.currentPassword ? 'cp-field__input--error' : ''}`}
                                    value={formData.currentPassword}
                                    onChange={(e) => handleChange('currentPassword', e.target.value)}
                                    placeholder="Enter current password"
                                    disabled={saving}
                                />
                                <button
                                    className="cp-field__toggle"
                                    onClick={() => togglePassword('current')}
                                    type="button"
                                >
                                    {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.currentPassword && (
                                <span className="cp-field__error">
                                    <X size={12} /> {errors.currentPassword}
                                </span>
                            )}
                        </div>

                        <div className="cp-field">
                            <label className="cp-field__label" htmlFor="new-password">
                                New Password
                            </label>
                            <div className="cp-field__input-wrap">
                                <input
                                    id="new-password"
                                    type={showPasswords.new ? 'text' : 'password'}
                                    className={`cp-field__input ${errors.newPassword ? 'cp-field__input--error' : ''}`}
                                    value={formData.newPassword}
                                    onChange={(e) => handleChange('newPassword', e.target.value)}
                                    placeholder="Enter new password"
                                    disabled={saving}
                                />
                                <button
                                    className="cp-field__toggle"
                                    onClick={() => togglePassword('new')}
                                    type="button"
                                >
                                    {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.newPassword && (
                                <span className="cp-field__error">
                                    <X size={12} /> {errors.newPassword}
                                </span>
                            )}
                        </div>

                        <div className="cp-field">
                            <label className="cp-field__label" htmlFor="confirm-password">
                                Confirm Password
                            </label>
                            <div className="cp-field__input-wrap">
                                <input
                                    id="confirm-password"
                                    type={showPasswords.confirm ? 'text' : 'password'}
                                    className={`cp-field__input ${errors.confirmPassword ? 'cp-field__input--error' : ''}`}
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                    placeholder="Confirm new password"
                                    disabled={saving}
                                />
                                <button
                                    className="cp-field__toggle"
                                    onClick={() => togglePassword('confirm')}
                                    type="button"
                                >
                                    {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <span className="cp-field__error">
                                    <X size={12} /> {errors.confirmPassword}
                                </span>
                            )}
                        </div>

                        <div className="cp-footer">
                            <button
                                className="cp-footer__cancel"
                                onClick={handleCancel}
                                disabled={saving}
                            >
                                Cancel
                            </button>
                            <button
                                className="cp-footer__save"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : 'Save Password'}
                            </button>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default ChangePasswordPage;
