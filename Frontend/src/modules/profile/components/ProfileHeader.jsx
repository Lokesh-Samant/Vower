import React from 'react';
import { ArrowLeft } from 'lucide-react';

const ProfileHeader = ({ onBack }) => {
    return (
        <header className="profile-header">
            <button
                className="profile-header__back"
                onClick={onBack}
                aria-label="Go back"
            >
                <ArrowLeft size={22} strokeWidth={2.2} />
            </button>
            <h1 className="profile-header__title">Profile</h1>
        </header>
    );
};

export default ProfileHeader;
