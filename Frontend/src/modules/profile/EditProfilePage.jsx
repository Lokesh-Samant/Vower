import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Image as ImageIcon,
  Trash2,
  Check,
  X,
  Loader2,
} from "lucide-react";
import "./EditProfilePage.css";

// Simulated taken usernames
const TAKEN_USERNAMES = [
  "rahulsharma",
  "admin",
  "user",
  "test",
  "vower",
  "evcharger",
  "johndoe",
  "janedoe",
];

const EditProfilePage = () => {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    fullName: "Rahul Sharma",
    username: "rahulsharma",
    email: "rahul.sharma@email.com",
    phone: "9876543210",
    dob: "1995-08-15",
  });

  const [usernameStatus, setUsernameStatus] = useState("idle"); // idle | checking | available | taken
  const usernameTimer = useRef(null);

  const [countryCode] = useState("+91");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarPop, setAvatarPop] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState(
    "https://api.dicebear.com/9.x/initials/svg?seed=RS&backgroundColor=111111&textColor=ffffff",
  );

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // ---- Username availability check (debounced) ----
  useEffect(() => {
    if (!form.username.trim()) {
      setUsernameStatus("idle");
      return;
    }
    setUsernameStatus("checking");
    clearTimeout(usernameTimer.current);
    usernameTimer.current = setTimeout(() => {
      const normalized = form.username.toLowerCase().replace(/[^a-z0-9_]/g, "");
      if (TAKEN_USERNAMES.includes(normalized)) {
        setUsernameStatus("taken");
      } else {
        setUsernameStatus("available");
      }
    }, 800);
    return () => clearTimeout(usernameTimer.current);
  }, [form.username]);

  // ---- Validation ----
  const validate = useCallback(() => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Name cannot be empty";
    if (!form.username.trim()) {
      e.username = "Username cannot be empty";
    } else if (form.username.length < 3) {
      e.username = "Username must be at least 3 characters";
    } else if (usernameStatus === "taken") {
      e.username = "This username is not available";
    }
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      e.email = "Invalid email address";
    }
    if (!form.phone.trim()) {
      e.phone = "Phone number is required";
    } else if (form.phone.replace(/\D/g, "").length < 10) {
      e.phone = "Phone number too short";
    }
    return e;
  }, [form, usernameStatus]);

  // ---- Handlers ----
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error on edit
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setSaving(false);
    setSaved(true);
    setShowToast(true);

    // Auto-navigate back after brief delay
    setTimeout(() => {
      navigate("/profile");
    }, 1800);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleAvatarOption = (option) => {
    setShowAvatarModal(false);
    if (option === "remove") {
      setAvatarUrl(
        "https://api.dicebear.com/9.x/initials/svg?seed=RS&backgroundColor=cccccc&textColor=ffffff",
      );
      setAvatarPop(true);
      setTimeout(() => setAvatarPop(false), 500);
    } else {
      // camera / gallery — simulate picking a new image
      const seeds = ["AB", "CD", "EF", "GH", "JK", "MN"];
      const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
      setAvatarUrl(
        `https://api.dicebear.com/9.x/initials/svg?seed=${randomSeed}&backgroundColor=111111&textColor=ffffff`,
      );
      setAvatarPop(true);
      setTimeout(() => setAvatarPop(false), 500);
    }
  };

  const disabled = saving || saved;

  return (
    <div className="edit-profile">
      {/* Header */}
      <header className="edit-header">
        <button
          className="edit-header__back"
          onClick={handleCancel}
          aria-label="Go back"
          disabled={disabled}
        >
          <ArrowLeft size={22} strokeWidth={2.2} />
        </button>
        <h1 className="edit-header__title">Edit Profile</h1>
      </header>

      {/* Avatar Section */}
      <section className="edit-avatar">
        <div
          className="edit-avatar__wrap"
          onClick={() => !disabled && fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Change profile picture"
        >
          <img
            src={avatarUrl}
            alt="Profile"
            className={`edit-avatar__img ${
              avatarPop ? "edit-avatar__img--pop" : ""
            }`}
            draggable={false}
          />

          <span className="edit-avatar__camera">
            <Camera size={15} strokeWidth={2.4} />
          </span>
        </div>

        <h2 className="edit-avatar__name">{form.fullName || "Your Name"}</h2>
        <p className="edit-avatar__username">@{form.username || "username"}</p>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: "none" }}
        />
      </section>

      {/* Form */}
      <div className="edit-form">
        {/* Full Name */}
        <div className="edit-field">
          <label className="edit-field__label" htmlFor="edit-name">
            Full Name
          </label>
          <div className="edit-field__input-wrap">
            <input
              id="edit-name"
              type="text"
              className={`edit-field__input ${errors.fullName ? "edit-field__input--error" : ""}`}
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Enter your full name"
              disabled={disabled}
              autoComplete="name"
            />
          </div>
          {errors.fullName && (
            <span className="edit-field__error">
              <X size={12} /> {errors.fullName}
            </span>
          )}
        </div>

        {/* Username */}
        <div className="edit-field">
          <label className="edit-field__label" htmlFor="edit-username">
            Username
          </label>
          <div className="edit-field__input-wrap">
            <span className="edit-field__input-prefix">@</span>
            <input
              id="edit-username"
              type="text"
              className={`edit-field__input edit-field__input--with-prefix ${
                errors.username || usernameStatus === "taken"
                  ? "edit-field__input--error"
                  : usernameStatus === "available"
                    ? "edit-field__input--success"
                    : ""
              }`}
              value={form.username}
              onChange={(e) =>
                handleChange(
                  "username",
                  e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""),
                )
              }
              placeholder="yourusername"
              disabled={disabled}
              autoComplete="username"
              maxLength={30}
            />
            {usernameStatus === "checking" && (
              <span className="edit-field__input-suffix">
                <Loader2 size={16} className="edit-field__spinner" />
              </span>
            )}
            {usernameStatus === "available" && (
              <span className="edit-field__input-suffix edit-field__input-suffix--success">
                <Check size={16} />
              </span>
            )}
            {usernameStatus === "taken" && (
              <span className="edit-field__input-suffix edit-field__input-suffix--error">
                <X size={16} />
              </span>
            )}
          </div>
          {errors.username && (
            <span className="edit-field__error">
              <X size={12} /> {errors.username}
            </span>
          )}
          {!errors.username && usernameStatus === "taken" && (
            <span className="edit-field__error">
              <X size={12} /> This username is not available
            </span>
          )}
          {usernameStatus === "available" && (
            <span className="edit-field__success">
              <Check size={12} /> Username is available
            </span>
          )}
        </div>

        {/* Email */}
        <div className="edit-field">
          <label className="edit-field__label" htmlFor="edit-email">
            Email Address
          </label>
          <div className="edit-field__input-wrap">
            <input
              id="edit-email"
              type="email"
              className={`edit-field__input ${errors.email ? "edit-field__input--error" : ""}`}
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="example@email.com"
              disabled={disabled}
              autoComplete="email"
              inputMode="email"
            />
          </div>
          {errors.email && (
            <span className="edit-field__error">
              <X size={12} /> {errors.email}
            </span>
          )}
        </div>

        {/* Phone Number */}
        <div className="edit-field">
          <label className="edit-field__label" htmlFor="edit-phone">
            Phone Number
          </label>
          <div className="edit-field__phone-row">
            <button className="edit-field__country-btn" disabled={disabled}>
              🇮🇳 {countryCode}
            </button>
            <div className="edit-field__input-wrap edit-field__phone-input">
              <input
                id="edit-phone"
                type="tel"
                className={`edit-field__input ${errors.phone ? "edit-field__input--error" : ""}`}
                value={form.phone}
                onChange={(e) =>
                  handleChange("phone", e.target.value.replace(/\D/g, ""))
                }
                placeholder="9876543210"
                disabled={disabled}
                autoComplete="tel"
                inputMode="numeric"
                maxLength={10}
              />
            </div>
          </div>
          {errors.phone && (
            <span className="edit-field__error">
              <X size={12} /> {errors.phone}
            </span>
          )}
        </div>

        {/* Date of Birth */}
        <div className="edit-field">
          <label className="edit-field__label" htmlFor="edit-dob">
            Date of Birth
          </label>
          <div className="edit-field__input-wrap">
            <input
              id="edit-dob"
              type="date"
              className="edit-field__input edit-field__date-input"
              value={form.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              disabled={disabled}
            />
          </div>
        </div>
      </div>

      {/* Save / Cancel Buttons */}
      <div className="edit-footer">
        <button
          className="edit-footer__save"
          onClick={handleSave}
          disabled={disabled}
        >
          {saving ? (
            <>
              <span className="edit-footer__save-spinner" />
              Saving...
            </>
          ) : saved ? (
            <>
              <Check size={20} className="edit-footer__save-check" />
              Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </button>
        <button
          className="edit-footer__cancel"
          onClick={handleCancel}
          disabled={disabled}
        >
          Cancel
        </button>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="edit-toast">
          <Check size={16} className="edit-toast__icon" />
          Profile Updated Successfully
        </div>
      )}

      {/* Avatar Options Modal */}
      {showAvatarModal && (
        <div
          className="avatar-modal-overlay"
          onClick={() => setShowAvatarModal(false)}
        >
          <div className="avatar-modal" onClick={(e) => e.stopPropagation()}>
            <div className="avatar-modal__handle" />

            <button
              className="avatar-modal__item"
              onClick={() => handleAvatarOption("camera")}
            >
              <span className="avatar-modal__item-icon">
                <Camera size={20} strokeWidth={1.8} />
              </span>
              Camera
            </button>

            <button
              className="avatar-modal__item"
              onClick={() => handleAvatarOption("gallery")}
            >
              <span className="avatar-modal__item-icon">
                <ImageIcon size={20} strokeWidth={1.8} />
              </span>
              Gallery
            </button>

            <button
              className="avatar-modal__item avatar-modal__item--danger"
              onClick={() => handleAvatarOption("remove")}
            >
              <span className="avatar-modal__item-icon">
                <Trash2 size={20} strokeWidth={1.8} />
              </span>
              Remove Photo
            </button>

            <button
              className="avatar-modal__cancel"
              onClick={() => setShowAvatarModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfilePage;
