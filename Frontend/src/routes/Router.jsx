import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../modules/auth/login";
import ForgotPasswordPage from "../modules/auth/Forgetpassword";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        {/* Component name MUST start with Capital 'F' */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}