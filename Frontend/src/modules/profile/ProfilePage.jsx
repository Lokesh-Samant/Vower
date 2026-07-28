import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ProfilePage.css';

import ProfileHeader from './components/ProfileHeader';
import ProfileCard from './components/ProfileCard';
import ProfileMenuList from './components/ProfileMenuList';
import BottomNav from './components/BottomNav';

const ProfilePage = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const handleMenuItemClick = (itemId) => {
        const routes = {
            settings: '/settings',
            reservations: '/reservations',
            vehicle: '/vehicle',
            history: '/charging-history',
            help: '/help',
            privacy: '/privacy-policy',
        };
        
        if (routes[itemId]) {
            navigate(routes[itemId]);
        } else {
            console.log('Menu item tapped:', itemId);
        }
    };

    const handleTabChange = (tabId) => {
        const tabRoutes = {
            home: '/home',
            map: '/map',
            reservations: '/reservations',
            notifications: '/notifications',
            profile: '/profile',
        };
        
        if (tabRoutes[tabId]) {
            navigate(tabRoutes[tabId]);
        }
    };

    return (
        <div className="profile-page">
            <ProfileHeader onBack={handleBack} />
            <ProfileCard />
            <div className="profile-divider" />
            <ProfileMenuList onItemClick={handleMenuItemClick} />
            <BottomNav activeTab="profile" onTabChange={handleTabChange} />
        </div>
    );
};

export default ProfilePage;
