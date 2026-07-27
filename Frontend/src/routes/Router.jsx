import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { LoginPage, SignupPage, ForgotPasswordPage } from "../modules/auth";
import ProfilePage from "../modules/profile/ProfilePage";
import EditProfilePage from "../modules/profile/EditProfilePage";
import HomePage from "../modules/home/home";

import Layout from "../layout.jsx"

import PrivateRoute from "./PrivateRoute";
import { isAuthenticated } from "../utils/session";


export default function Router() {
  return (
    <BrowserRouter>

      
        {/* Auth routes */}
        <Routes>
        <Route path="/" element={<Layout />} >

      <Routes>
      
        <Route path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )}/>

        {/* Public auth routes */}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected app routes — require valid JWT */}
        <Route path="/home" element={ <PrivateRoute> <HomePage /></PrivateRoute> }/>
        <Route path="/profile" element={ <PrivateRoute> <ProfilePage /></PrivateRoute> }/>
        <Route path="/profile/edit" element={ <PrivateRoute> <EditProfilePage /></PrivateRoute> }/>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}
