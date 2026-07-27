import React, { useState, useEffect } from 'react';

/**
 * ==========================================
 * CONFIRMATION DIALOG COMPONENT
 * ==========================================
 */
export function ConfirmationDialog({ 
  isOpen, 
  title, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  isDestructive = false,
  onConfirm, 
  onCancel,
  isLoading = false 
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${isOpen ? 'visible' : 'invisible'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0'}`}
        onClick={isLoading ? undefined : onCancel}
      />
      
      {/* Dialog */}
      <div className={`
        relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl
        transform transition-all duration-300 ease-out
        ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
      `}>
        <h3 className="text-xl font-semibold text-[#111111] mb-2">{title}</h3>
        <p className="text-[#7A7A7A] mb-6">{message}</p>
        
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-3 border border-[#EAEAEA] rounded-xl text-[#111111] font-medium active:scale-95 transition-transform disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-3 rounded-xl font-medium text-white active:scale-95 transition-transform disabled:opacity-50 ${
              isDestructive ? 'bg-red-500 hover:bg-red-600' : 'bg-[#111111] hover:bg-black'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * ==========================================
 * SNACKBAR/TOAST COMPONENT
 * ==========================================
 */
export function Snackbar({ message, type = 'success', isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen, onClose]);

  if (!isVisible && !isOpen) return null;

  const bgColor = type === 'success' ? 'bg-[#27AE60]' : type === 'error' ? 'bg-[#E74C3C]' : 'bg-[#111111]';

  return (
    <div className={`fixed bottom-24 left-4 right-4 z-[100] max-w-lg mx-auto ${isOpen || isVisible ? 'visible' : 'invisible'}`}>
      <div className={`
        ${bgColor} text-white px-4 py-3 rounded-xl shadow-lg
        flex items-center gap-3
        transform transition-all duration-300 ease-out
        ${isOpen && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        {type === 'success' && (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {type === 'error' && (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}

/**
 * ==========================================
 * LOADING SKELETON COMPONENT
 * ==========================================
 */
export function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-slate-200 rounded ${className}`} />
  );
}

/**
 * ==========================================
 * EMPTY STATE COMPONENT
 * ==========================================
 */
export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 mb-6 text-zinc-300">
        {Icon && <Icon className="w-full h-full" />}
      </div>
      <h3 className="text-xl font-semibold text-[#111111] mb-2">{title}</h3>
      <p className="text-[#7A7A7A] mb-6 max-w-xs">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-[#111111] text-white rounded-xl font-medium active:scale-95 transition-transform"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

/**
 * ==========================================
 * INPUT FIELD COMPONENT
 * ==========================================
 */
export function InputField({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = 'text', 
  error, 
  required = false,
  disabled = false,
  showPasswordToggle = false,
  leftElement,
  rightElement,
  maxLength,
  pattern,
  onBlur
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-[#111111] mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className={`
        relative flex items-center bg-white border rounded-xl transition-all duration-200
        ${error ? 'border-[#E74C3C]' : isFocused ? 'border-[#111111] shadow-md' : 'border-[#EAEAEA]'}
        ${disabled ? 'opacity-50 bg-slate-50' : ''}
      `}>
        {leftElement && (
          <div className="pl-4 pr-2 text-[#7A7A7A]">
            {leftElement}
          </div>
        )}
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          pattern={pattern}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            if (onBlur) onBlur();
          }}
          className={`
            w-full px-4 py-3.5 bg-transparent text-[#111111] placeholder-[#B0B0B0] outline-none
            ${leftElement ? 'pl-2' : ''} ${rightElement || showPasswordToggle ? 'pr-2' : ''}
          `}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-2 text-[#7A7A7A] hover:text-[#111111] transition-colors"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
        {rightElement && !showPasswordToggle && (
          <div className="pr-4 pl-2 text-[#7A7A7A]">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-[#E74C3C] flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * ==========================================
 * TOGGLE SWITCH COMPONENT
 * ==========================================
 */
export function ToggleSwitch({ enabled, onChange, label, description, disabled = false }) {
  return (
    <div 
      className={`flex items-center justify-between py-3 ${disabled ? 'opacity-50' : ''}`}
      onClick={() => !disabled && onChange(!enabled)}
    >
      <div className="flex-1">
        {label && <p className="text-[#111111] font-medium">{label}</p>}
        {description && <p className="text-sm text-[#7A7A7A] mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          !disabled && onChange(!enabled);
        }}
        className={`
          relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200
          ${enabled ? 'bg-[#111111]' : 'bg-[#EAEAEA]'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          className={`
            inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200
            ${enabled ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
}

/**
 * ==========================================
 * BOTTOM SHEET COMPONENT
 * ==========================================
 */
export function BottomSheet({ isOpen, onClose, title, children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[100] ${isOpen || isVisible ? 'visible' : 'invisible'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className={`
        absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-y-0' : 'translate-y-full'}
      `}>
        <div className="sticky top-0 bg-white border-b border-[#EAEAEA] px-4 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#111111]">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-[#7A7A7A] hover:text-[#111111] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * ==========================================
 * DATE PICKER COMPONENT
 * ==========================================
 */
export function DatePicker({ value, onChange, label, minDate, maxDate }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-[#111111] mb-2">
          {label}
        </label>
      )}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={minDate}
        max={maxDate}
        className="w-full px-4 py-3.5 bg-white border border-[#EAEAEA] rounded-xl text-[#111111] outline-none focus:border-[#111111] focus:shadow-md transition-all"
      />
    </div>
  );
}

/**
 * ==========================================
 * SELECT DROPDOWN COMPONENT
 * ==========================================
 */
export function SelectDropdown({ value, onChange, options, label, placeholder, error }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="mb-4 relative">
      {label && (
        <label className="block text-sm font-medium text-[#111111] mb-2">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-4 py-3.5 bg-white border rounded-xl text-left
          flex items-center justify-between
          transition-all duration-200
          ${error ? 'border-[#E74C3C]' : isOpen ? 'border-[#111111] shadow-md' : 'border-[#EAEAEA]'}
        `}
      >
        <span className={selectedOption ? 'text-[#111111]' : 'text-[#B0B0B0]'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg className={`w-5 h-5 text-[#7A7A7A] transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#EAEAEA] rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors
                  ${value === option.value ? 'bg-slate-50 text-[#111111] font-medium' : 'text-[#111111]'}
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
      
      {error && (
        <p className="mt-1.5 text-sm text-[#E74C3C]">{error}</p>
      )}
    </div>
  );
}
