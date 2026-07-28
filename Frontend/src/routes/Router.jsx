import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { LoginPage, SignupPage, ForgotPasswordPage } from "../modules/auth";
import ProfilePage from "../modules/profile/ProfilePage";
import EditProfilePage from "../modules/profile/EditProfilePage";
import HomePage from "../modules/home/home";
import SettingsPage from "../modules/profile/pages/SettingsPage";
import ChangePasswordPage from "../modules/profile/pages/ChangePasswordPage";
import EditEmailPage from "../modules/profile/pages/EditEmailPage";
import ChangePhonePage from "../modules/profile/pages/ChangePhonePage";
import TwoFactorPage from "../modules/profile/pages/TwoFactorPage";
import LanguagePage from "../modules/profile/pages/LanguagePage";
import NotificationsPage from "../modules/profile/pages/NotificationsPage";
import LocationPermissionPage from "../modules/profile/pages/LocationPermissionPage";
import ChargingSpeedPage from "../modules/profile/pages/ChargingSpeedPage";
import ConnectorPage from "../modules/profile/pages/ConnectorPage";
import PaymentMethodPage from "../modules/profile/pages/PaymentMethodPage";
import VehiclePage from "../modules/profile/pages/VehiclePage";

import Layout from "../layout";

import PrivateRoute from "./PrivateRoute";
import { isAuthenticated } from "../utils/session";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root */}
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public routes (No Header/Footer) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected routes (With Header/Footer) */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/password" element={<ChangePasswordPage />} />
          <Route path="/settings/email" element={<EditEmailPage />} />
          <Route path="/settings/phone" element={<ChangePhonePage />} />
          <Route path="/settings/2fa" element={<TwoFactorPage />} />
          <Route path="/settings/language" element={<LanguagePage />} />
          <Route path="/settings/notifications" element={<NotificationsPage />} />
          <Route path="/settings/location" element={<LocationPermissionPage />} />
          <Route path="/settings/charging-speed" element={<ChargingSpeedPage />} />
          <Route path="/settings/connector" element={<ConnectorPage />} />
          <Route path="/settings/payment" element={<PaymentMethodPage />} />
          <Route path="/vehicle" element={<VehiclePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
