import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { LoginPage, SignupPage, ForgotPasswordPage } from "../modules/auth";
import ProfilePage from "../modules/profile/ProfilePage";
import EditProfilePage from "../modules/profile/EditProfilePage";
import HomePage from "../modules/home/home";
import Layout from "../layout.jsx"

export default function Router() {
  return (
    <BrowserRouter>
      
        {/* Auth routes */}
        <Routes>
        <Route path="/" element={<Layout />} >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* App routes */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />

        {/* Catch-all: redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}
