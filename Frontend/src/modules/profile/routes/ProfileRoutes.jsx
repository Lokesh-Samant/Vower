import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SettingsPage from '../../settings/pages/SettingsPage';
import ChangePasswordPage from '../../settings/pages/ChangePasswordPage';
import EditEmailPage from '../../settings/pages/EditEmailPage';
import EmailVerificationPage from '../../settings/pages/EmailVerificationPage';
import ChangePhonePage from '../../settings/pages/ChangePhonePage';
import PhoneVerificationPage from '../../settings/pages/PhoneVerificationPage';
import TwoFactorSetupPage from '../../settings/pages/TwoFactorSetupPage';
import LanguageSelectorPage from '../../settings/pages/LanguageSelectorPage';
import NotificationSettingsPage from '../../settings/pages/NotificationSettingsPage';
import LocationPermissionPage from '../../settings/pages/LocationPermissionPage';
import PreferredSpeedPage from '../../settings/pages/PreferredSpeedPage';
import PreferredConnectorPage from '../../settings/pages/PreferredConnectorPage';
import PaymentMethodPage from '../../settings/pages/PaymentMethodPage';
import AddPaymentMethodPage from '../../settings/pages/AddPaymentMethodPage';

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
