import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField, Snackbar } from '../../components/common/CommonComponents';

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      navigate('/settings');
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFFFFF] pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-[#FFFFFF] z-40 px-4 pt-4 pb-2 border-b border-[#EAEAEA]">
        <div className="flex items-center justify-between max-w-lg mx-auto" style={{ height: '56px' }}>
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-slate-50 active:scale-95 transition-all"
          >
            <svg className="w-6 h-6 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-[#111111]">Change Password</h1>
          <div className="w-8" />
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6 max-w-lg mx-auto">
        <p className="text-[#7A7A7A] mb-6">Update your password to keep your account secure.</p>
        
        <InputField
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={setCurrentPassword}
          placeholder="Enter current password"
          error={errors.currentPassword}
          showPasswordToggle
          required
        />
        
        <InputField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={setNewPassword}
          placeholder="Enter new password"
          error={errors.newPassword}
          showPasswordToggle
          required
        />
        
        <InputField
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirm new password"
          error={errors.confirmPassword}
          showPasswordToggle
          required
        />

        <div className="mt-8 space-y-3">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full h-[54px] bg-[#111111] text-white rounded-xl font-semibold active:scale-95 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              'Save Password'
            )}
          </button>
          
          <button
            onClick={() => navigate(-1)}
            disabled={isLoading}
            className="w-full h-[54px] bg-white border border-[#EAEAEA] text-[#111111] rounded-xl font-semibold active:scale-95 transition-transform disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </main>

      <Snackbar
        message="Password updated successfully!"
        type="success"
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}
