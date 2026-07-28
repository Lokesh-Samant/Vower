import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Eye, EyeOff, Check, X, Loader2 } from 'lucide-react';
import '../styles/ChangePasswordPage.css';

const ChangePasswordPage = () => {
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
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
    const [saved, setSaved] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.currentPassword.trim()) {
            e.currentPassword = 'Current password is required';
        }
        if (!form.newPassword.trim()) {
            e.newPassword = 'New password is required';
        } else if (form.newPassword.length < 8) {
            e.newPassword = 'Password must be at least 8 characters';
        }
        if (!form.confirmPassword.trim()) {
            e.confirmPassword = 'Please confirm your password';
        } else if (form.newPassword !== form.confirmPassword) {
            e.confirmPassword = 'Passwords do not match';
        }
        return e;
    };

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy[field];
                return copy;
            });
        }
    };

    const togglePassword = (field) => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSave = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSaving(true);
        await new Promise((r) => setTimeout(r, 1500));
        setSaving(false);
        setSaved(true);

        setTimeout(() => {
            navigate('/settings');
        }, 1500);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const disabled = saving || saved;

    return (
        <div className="change-password-page">
            <header className="cp-header">
                <button className="cp-header__back" onClick={handleCancel} aria-label="Go back" disabled={disabled}>
                    <ArrowLeft size={22} strokeWidth={2.2} />
                </button>
                <h1 className="cp-header__title">Change Password</h1>
            </header>

            <div className="cp-content">
                {/* Current Password */}
                <div className="cp-field">
                    <label className="cp-field__label" htmlFor="current-password">
                        Current Password
                    </label>
                    <div className="cp-field__input-wrap">
                        <input
                            id="current-password"
                            type={showPasswords.current ? 'text' : 'password'}
                            className={`cp-field__input ${errors.currentPassword ? 'cp-field__input--error' : ''}`}
                            value={form.currentPassword}
                            onChange={(e) => handleChange('currentPassword', e.target.value)}
                            placeholder="Enter current password"
                            disabled={disabled}
                            autoComplete="current-password"
                        />
                        <button
                            className="cp-field__toggle"
                            onClick={() => togglePassword('current')}
                            type="button"
                            disabled={disabled}
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

                {/* New Password */}
                <div className="cp-field">
                    <label className="cp-field__label" htmlFor="new-password">
                        New Password
                    </label>
                    <div className="cp-field__input-wrap">
                        <input
                            id="new-password"
                            type={showPasswords.new ? 'text' : 'password'}
                            className={`cp-field__input ${errors.newPassword ? 'cp-field__input--error' : ''}`}
                            value={form.newPassword}
                            onChange={(e) => handleChange('newPassword', e.target.value)}
                            placeholder="Enter new password"
                            disabled={disabled}
                            autoComplete="new-password"
                        />
                        <button
                            className="cp-field__toggle"
                            onClick={() => togglePassword('new')}
                            type="button"
                            disabled={disabled}
                        >
                            {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.newPassword && (
                        <span className="cp-field__error">
                            <X size={12} /> {errors.newPassword}
                        </span>
                    )}
                    {form.newPassword.length >= 8 && !errors.newPassword && (
                        <span className="cp-field__success">
                            <Check size={12} /> Password meets requirements
                        </span>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="cp-field">
                    <label className="cp-field__label" htmlFor="confirm-password">
                        Confirm Password
                    </label>
                    <div className="cp-field__input-wrap">
                        <input
                            id="confirm-password"
                            type={showPasswords.confirm ? 'text' : 'password'}
                            className={`cp-field__input ${errors.confirmPassword ? 'cp-field__input--error' : ''}`}
                            value={form.confirmPassword}
                            onChange={(e) => handleChange('confirmPassword', e.target.value)}
                            placeholder="Confirm new password"
                            disabled={disabled}
                            autoComplete="new-password"
                        />
                        <button
                            className="cp-field__toggle"
                            onClick={() => togglePassword('confirm')}
                            type="button"
                            disabled={disabled}
                        >
                            {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <span className="cp-field__error">
                            <X size={12} /> {errors.confirmPassword}
                        </span>
                    )}
                    {form.confirmPassword && form.newPassword === form.confirmPassword && !errors.confirmPassword && (
                        <span className="cp-field__success">
                            <Check size={12} /> Passwords match
                        </span>
                    )}
                </div>
            </div>

            {/* Save / Cancel Buttons */}
            <div className="cp-footer">
                <button
                    className="cp-footer__save"
                    onClick={handleSave}
                    disabled={disabled}
                >
                    {saving ? (
                        <>
                            <Loader2 size={18} className="cp-footer__spinner" />
                            Saving...
                        </>
                    ) : saved ? (
                        <>
                            <Check size={18} />
                            Saved!
                        </>
                    ) : (
                        'Save Password'
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
        </div>
    );
};

export default ChangePasswordPage;
