import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../modules/auth/login";
import ForgotPasswordPage from "../modules/auth/Forgetpassword";
import ProfilePage from "../modules/profile/Profile";
import EditProfilePage from "../modules/profile/EditProfile";
import SettingsPage from "../modules/settings/SettingsPage";
import ChangePasswordPage from "../modules/settings/ChangePassword";
import EditEmailPage from "../modules/settings/EditEmail";
import ChangePhonePage from "../modules/settings/ChangePhone";
import Reservations from "../modules/reservations/Reservations";
import MyVehicle from "../modules/vehicle/Vehicle";
import ChargingHistory from "../modules/history/History";
import Help from "../modules/help/Help";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        {/* Component name MUST start with Capital 'F' */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Profile Pages */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        
        {/* Settings */}
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/change-password" element={<ChangePasswordPage />} />
        <Route path="/settings/edit-email" element={<EditEmailPage />} />
        <Route path="/settings/change-phone" element={<ChangePhonePage />} />
        
        {/* Reservations */}
        <Route path="/reservations" element={<Reservations />} />
        
        {/* Vehicle */}
        <Route path="/my-vehicle" element={<MyVehicle />} />
        
        {/* History */}
        <Route path="/charging-history" element={<ChargingHistory />} />
        
        {/* Help */}
        <Route path="/help" element={<Help />} />
      </Routes>
    </BrowserRouter>
  );
}