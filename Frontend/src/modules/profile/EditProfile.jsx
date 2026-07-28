import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ==========================================
 * SVG ICON COMPONENTS
 * ==========================================
 */

const BackArrowIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const CameraIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path fillRule="evenodd" d="M1.323 7.145A4.65 4.65 0 015.999 4h12a4.65 4.65 0 014.676 3.145l.834 3.335A2 2 0 0121.57 12v6a2 2 0 01-2 2h-13a2 2 0 01-2-2v-6a2 2 0 01-.06-1.519l.834-3.335zM5.999 6a2.65 2.65 0 00-2.676 1.855L2.49 11.19A4 4 0 012.5 12v6a4 4 0 004 4h13a4 4 0 004-4v-6a4 4 0 01-.01-.81l-.834-3.335A2.65 2.65 0 0017.999 6H5.999z" clipRule="evenodd" />
  </svg>
);

const EditIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const CarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

const ChevronDownIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

/**
 * ==========================================
 * INPUT FIELD COMPONENT
 * ==========================================
 */
const InputField = ({ label, type = "text", value, onChange, placeholder, error, icon: Icon, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-5 w-full">
      <label className="block text-sm font-medium text-[#111111] mb-2 ml-1">
        {label}
      </label>
      <div 
        className={`
          relative flex items-center w-full 
          bg-white border rounded-[16px] 
          transition-all duration-200 ease-out
          ${error ? 'border-[#E74C3C]' : isFocused ? 'border-[#111111] shadow-sm' : 'border-[#EAEAEA]'}
        `}
        style={{ height: '56px' }}
      >
        {Icon && (
          <div className="pl-4 text-[#8A8A8A]">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full h-full px-4 bg-transparent 
            text-[#111111] text-base font-normal
            placeholder-[#B0B0B0]
            outline-none
            ${Icon ? 'pl-2' : ''}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-[#E74C3C] text-xs mt-1.5 ml-1 flex items-center gap-1">
          <span>❌</span> {error}
        </p>
      )}
    </div>
  );
};

/**
 * ==========================================
 * VEHICLE CARD COMPONENT
 * ==========================================
 */
const VehicleCard = ({ vehicle, onEdit }) => {
  if (!vehicle) {
    return (
      <button
        onClick={onEdit}
        className="
          w-full flex items-center justify-center gap-2
          h-[120px]
          bg-white border-2 border-dashed border-[#EAEAEA]
          rounded-[16px]
          text-[#8A8A8A] font-medium
          active:scale-[0.98] transition-transform duration-200
        "
      >
        <CarIcon className="w-6 h-6" />
        <span>Add Vehicle</span>
      </button>
    );
  }

  return (
    <div className="w-full bg-white border border-[#EAEAEA] rounded-[16px] p-4 active:scale-[0.98] transition-transform duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center">
            <CarIcon className="w-6 h-6 text-[#111111]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#111111]">{vehicle.name}</h3>
            <p className="text-xs text-[#8A8A8A]">Default Vehicle</p>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="p-2 rounded-full hover:bg-slate-50 active:scale-95 transition-all"
        >
          <EditIcon className="w-5 h-5 text-[#8A8A8A]" />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F5F5F5]">
        <div>
          <p className="text-xs text-[#8A8A8A] mb-1">Battery</p>
          <p className="text-sm font-medium text-[#111111]">{vehicle.battery}</p>
        </div>
        <div>
          <p className="text-xs text-[#8A8A8A] mb-1">Connector</p>
          <p className="text-sm font-medium text-[#111111]">{vehicle.connector}</p>
        </div>
        <div>
          <p className="text-xs text-[#8A8A8A] mb-1">Range</p>
          <p className="text-sm font-medium text-[#111111]">{vehicle.range}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * ==========================================
 * DROPDOWN COMPONENT
 * ==========================================
 */
const DropdownField = ({ label, value, options, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-5 w-full relative">
      <label className="block text-sm font-medium text-[#111111] mb-2 ml-1">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between
          h-[56px] px-4
          bg-white border rounded-[16px]
          transition-all duration-200
          ${error ? 'border-[#E74C3C]' : isOpen ? 'border-[#111111] shadow-sm' : 'border-[#EAEAEA]'}
        `}
      >
        <span className={`text-base ${!value ? 'text-[#B0B0B0]' : 'text-[#111111]'}`}>
          {value || 'Select Connector'}
        </span>
        <ChevronDownIcon className={`w-5 h-5 text-[#8A8A8A] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#EAEAEA] rounded-[16px] shadow-lg z-50 overflow-hidden animate-fade-in">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-4 py-3.5 text-left text-base
                  hover:bg-slate-50 active:bg-slate-100
                  transition-colors duration-150
                  ${value === option ? 'font-semibold text-[#111111]' : 'text-[#111111]'}
                `}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
      
      {error && (
        <p className="text-[#E74C3C] text-xs mt-1.5 ml-1">{error}</p>
      )}
    </div>
  );
};

/**
 * ==========================================
 * MAIN EDIT PROFILE PAGE
 * ==========================================
 */
export default function EditProfilePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face');
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    countryCode: '+91',
    phoneNumber: '9876543210',
    dob: '1990-05-15',
    connector: 'CCS2',
  });

  const [vehicle, setVehicle] = useState({
    name: 'Tata Nexon EV',
    battery: '40.5 kWh',
    connector: 'CCS2',
    range: '465 km',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name cannot be empty';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = 'Phone number too short';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      navigate('/profile');
    }, 1200);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleAvatarChange = () => {
    // In a real app, this would open camera/gallery
    const newAvatar = prompt("Enter new image URL (or leave empty for demo):", avatarUrl);
    if (newAvatar !== null) {
      setAvatarUrl(newAvatar || avatarUrl);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen w-full bg-[#FFFFFF] flex items-center justify-center p-6 animate-fade-in">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#27AE60] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckIcon className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#111111] mb-2">Profile Updated!</h2>
          <p className="text-[#8A8A8A]">Redirecting to profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FFFFFF] font-sans text-[#111111] overflow-x-hidden">
      <div className={`animate-fade-in ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* HEADER */}
        <header className="sticky top-0 bg-[#FFFFFF] z-40 px-4 pt-4 pb-2 border-b border-[#F5F5F5]">
          <div className="flex items-center justify-between max-w-lg mx-auto" style={{ height: '56px' }}>
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="p-2 -ml-2 rounded-full hover:bg-slate-50 active:scale-95 transition-all duration-200 disabled:opacity-50"
            >
              <BackArrowIcon className="w-6 h-6 text-[#111111]" />
            </button>
            
            <h1 className="text-xl font-semibold text-[#111111]">
              Edit Profile
            </h1>
            
            <div className="w-8" />
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="px-4 pb-32 max-w-lg mx-auto overflow-y-auto">
          
          {/* PROFILE IMAGE SECTION */}
          <section className="py-8 text-center">
            <div className="relative inline-block mb-2">
              <div className="w-[100px] h-[100px] rounded-full border-2 border-[#EAEAEA] overflow-hidden bg-slate-100">
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <button
                onClick={handleAvatarChange}
                disabled={isSaving}
                className="
                  absolute -bottom-1 -right-1 
                  w-9 h-9 rounded-full 
                  bg-[#111111] 
                  border-2 border-[#FFFFFF]
                  flex items-center justify-center
                  active:scale-95 transition-transform duration-200
                  shadow-md disabled:opacity-50
                "
              >
                <CameraIcon className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-xs text-[#8A8A8A] mt-2">Tap to change photo</p>
          </section>

          {/* FORM SECTION */}
          <section className="py-2">
            <InputField
              label="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Enter your full name"
              error={errors.fullName}
              disabled={isSaving}
            />

            <InputField
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@email.com"
              error={errors.email}
              disabled={isSaving}
            />

            <div className="mb-5 w-full">
              <label className="block text-sm font-medium text-[#111111] mb-2 ml-1">
                Phone Number
              </label>
              <div className={`flex w-full bg-white border rounded-[16px] transition-all duration-200 ${errors.phoneNumber ? 'border-[#E74C3C]' : 'border-[#EAEAEA]'}`}>
                <select
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  disabled={isSaving}
                  className="h-[56px] px-4 bg-[#F9F9F9] border-r border-[#EAEAEA] text-[#111111] font-medium outline-none rounded-l-[16px]"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+49">🇩🇪 +49</option>
                </select>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="9876543210"
                  className="flex-1 h-[56px] px-4 bg-transparent text-[#111111] outline-none rounded-r-[16px]"
                  disabled={isSaving}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-[#E74C3C] text-xs mt-1.5 ml-1 flex items-center gap-1">
                  <span>❌</span> {errors.phoneNumber}
                </p>
              )}
            </div>

            <InputField
              label="Date of Birth"
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              disabled={isSaving}
            />
          </section>

          {/* EV SPECIFIC SECTION */}
          <section className="py-4">
            <h3 className="text-lg font-semibold text-[#111111] mb-3 ml-1">
              Default Vehicle
            </h3>
            <VehicleCard
              vehicle={vehicle}
              onEdit={() => console.log('Edit vehicle')}
            />
            
            <div className="mt-6">
              <DropdownField
                label="Preferred Charging Connector"
                value={formData.connector}
                options={['CCS2', 'Type 2', 'CHAdeMO', 'GB/T']}
                onChange={(val) => setFormData({ ...formData, connector: val })}
                error={errors.connector}
              />
            </div>
          </section>

          {/* BUTTONS */}
          <section className="py-8 space-y-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`
                w-[90%] h-[54px] 
                bg-[#111111] text-white 
                font-semibold text-base tracking-wide
                rounded-[16px]
                transition-all duration-200 ease-out
                shadow-md mx-auto block
                flex items-center justify-center gap-2
                active:scale-[0.97]
                disabled:opacity-70 disabled:cursor-not-allowed
              `}
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                'Save Changes'
              )}
            </button>

            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="
                w-[90%] h-[54px] 
                bg-white text-[#111111] 
                font-semibold text-base 
                border-2 border-[#111111]
                rounded-[16px]
                transition-all duration-200 ease-out
                mx-auto block
                active:scale-[0.97] active:bg-slate-50
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              Cancel
            </button>
          </section>

        </main>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(5%); }
        }
      `}</style>
    </div>
  );
}
