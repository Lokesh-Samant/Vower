import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SettingsPage from '../pages/SettingsPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import EditEmailPage from '../pages/EditEmailPage';
import EmailVerificationPage from '../pages/EmailVerificationPage';
import ChangePhonePage from '../pages/ChangePhonePage';
import PhoneVerificationPage from '../pages/PhoneVerificationPage';
import TwoFactorSetupPage from '../pages/TwoFactorSetupPage';
import LanguageSelectorPage from '../pages/LanguageSelectorPage';
import NotificationSettingsPage from '../pages/NotificationSettingsPage';
import LocationPermissionPage from '../pages/LocationPermissionPage';
import PreferredSpeedPage from '../pages/PreferredSpeedPage';
import PreferredConnectorPage from '../pages/PreferredConnectorPage';
import PaymentMethodPage from '../pages/PaymentMethodPage';
import AddPaymentMethodPage from '../pages/AddPaymentMethodPage';

export default function ProfileRoutes() {
    return (
        <Routes>
            <Route path="/" element={<SettingsPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/edit-email" element={<EditEmailPage />} />
            <Route path="/email-verification" element={<EmailVerificationPage />} />
            <Route path="/change-phone" element={<ChangePhonePage />} />
            <Route path="/phone-verification" element={<PhoneVerificationPage />} />
            <Route path="/two-factor-setup" element={<TwoFactorSetupPage />} />
            <Route path="/language" element={<LanguageSelectorPage />} />
            <Route path="/notifications" element={<NotificationSettingsPage />} />
            <Route path="/location-permission" element={<LocationPermissionPage />} />
            <Route path="/preferred-speed" element={<PreferredSpeedPage />} />
            <Route path="/preferred-connector" element={<PreferredConnectorPage />} />
            <Route path="/payment-methods" element={<PaymentMethodPage />} />
            <Route path="/add-payment" element={<AddPaymentMethodPage />} />
        </Routes>
    );
}
