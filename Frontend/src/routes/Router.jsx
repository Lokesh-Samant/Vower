import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { LoginPage, SignupPage, ForgotPasswordPage } from "../modules/auth";
import ProfilePage from "../modules/profile/ProfilePage";
import EditProfilePage from "../modules/profile/EditProfilePage";
import HomePage from "../modules/home/home";
import SettingsPage from "../modules/settings/SettingsPage";
import ReservationsPage from "../modules/reservations/ReservationsPage";
import VehiclePage from "../modules/vehicle/VehiclePage";
import HistoryPage from "../modules/history/HistoryPage";
import HelpPage from "../modules/help/HelpPage";
import PrivacyPage from "../modules/privacy/PrivacyPage";

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
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/vehicle" element={<VehiclePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
