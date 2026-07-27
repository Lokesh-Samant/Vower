import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../modules/auth/login";
import ForgotPasswordPage from "../modules/auth/Forgetpassword";
import ProfilePage from "../modules/profile/Profile";
import EditProfilePage from "../modules/profile/EditProfile";
import Settings from "../modules/settings/Settings";
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
        <Route path="/settings" element={<Settings />} />
        
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