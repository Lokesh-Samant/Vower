import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import axios from "axios";

const ProfileCard = ({}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
  const fetchProfile = async () => {
     console.log("ProfileCard Rendered");
    try {
      console.log("Fetching profile...");

      const { data } = await axios.get(
        "http://localhost:5000/profile",
        {
          withCredentials: true,
        }
      );

      console.log("Response:", data);

      setUser(data.user);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  fetchProfile();
}, []);

  return (
    <section className="profile-card">
      {/* Avatar */}
      <div className="profile-card__avatar-wrap">
        <img
          src={user?.photo || "https://api.dicebear.com/9.x/initials/svg?seed=User"}
          alt={user?.fullName}
          className={`profile-card__avatar ${imgLoaded ? "profile-card__avatar--loaded" : ""}`}
          onLoad={() => setImgLoaded(true)}
          draggable={false}
        />
        <button
          className="profile-card__camera"
          aria-label="Change profile picture"
        >
          <Camera size={14} strokeWidth={2.4} />
        </button>
      </div>

      {/* Info */}
      <h2 className="profile-card__name">{user?.fullName || "Loading..."}</h2>
      <p className="profile-card__username">@{user?.user_id || ""}</p>

      {/* Edit button */}
      <button
        className="profile-card__edit-btn"
        onClick={() => navigate("/profile/edit")}
      >
        Edit Profile
      </button>
    </section>
  );
};

export default ProfileCard;
