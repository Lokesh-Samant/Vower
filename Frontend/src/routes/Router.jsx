import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { LoginPage, SignupPage, ForgotPasswordPage } from "../modules/auth";
import ProfilePage from "../modules/profile/ProfilePage";
import EditProfilePage from "../modules/profile/EditProfilePage";
import HomePage from "../modules/home/home";
import SettingsPage from "../modules/settings/SettingsPage";
import ChangePasswordPage from "../modules/settings/ChangePasswordPage";
import EditEmailPage from "../modules/settings/EditEmailPage";
import ChangePhonePage from "../modules/settings/ChangePhonePage";
import TwoFactorPage from "../modules/settings/TwoFactorPage";
import LanguagePage from "../modules/settings/LanguagePage";
import NotificationsPage from "../modules/settings/NotificationsPage";
import LocationPermissionPage from "../modules/settings/LocationPermissionPage";
import ChargingSpeedPage from "../modules/settings/ChargingSpeedPage";
import ConnectorPage from "../modules/settings/ConnectorPage";
import PaymentMethodPage from "../modules/settings/PaymentMethodPage";
import ReservationsPage from "../modules/reservations/ReservationsPage";
import VehiclePage from "../modules/vehicle/VehiclePage";
import HistoryPage from "../modules/history/HistoryPage";
import HelpPage from "../modules/help/HelpPage";
import PrivacyPage from "../modules/privacy/PrivacyPage";

// Help Center pages
import ContactSupport from "../modules/help/pages/ContactSupport/ContactSupport";
import RaiseTicket from "../modules/help/pages/RaiseTicket/RaiseTicket";
import MyTickets from "../modules/help/pages/MyTickets/MyTickets";
import TicketDetails from "../modules/help/pages/TicketDetails/TicketDetails";

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
          <Route path="/settings/change-password" element={<ChangePasswordPage />} />
          <Route path="/settings/email" element={<EditEmailPage />} />
          <Route path="/settings/phone" element={<ChangePhonePage />} />
          <Route path="/settings/two-factor" element={<TwoFactorPage />} />
          <Route path="/settings/language" element={<LanguagePage />} />
          <Route path="/settings/notifications" element={<NotificationsPage />} />
          <Route path="/settings/location" element={<LocationPermissionPage />} />
          <Route path="/settings/charging-speed" element={<ChargingSpeedPage />} />
          <Route path="/settings/connector" element={<ConnectorPage />} />
          <Route path="/settings/payment" element={<PaymentMethodPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/vehicle" element={<VehiclePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/help/contact" element={<ContactSupport />} />
          <Route path="/help/raise-ticket" element={<RaiseTicket />} />
          <Route path="/help/my-tickets" element={<MyTickets />} />
          <Route path="/help/ticket/:ticketId" element={<TicketDetails />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
