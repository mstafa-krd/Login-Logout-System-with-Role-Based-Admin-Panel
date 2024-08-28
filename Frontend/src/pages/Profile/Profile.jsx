import { useContext } from "react";
import "./profile.css"
import { UserContext } from "../../context/userContext";

export default function Profile() {
  const user = useContext(UserContext)
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-title">Profile Information</h2>
          <div className="profile-details">
            <div className="profile-item">
              <label className="profile-label">Name:</label>
              <span className="profile-value">{user.user.name}</span>
            </div>
            <div className="profile-item">
              <label className="profile-label">Email:</label>
              <span className="profile-value">{user.user.email}</span>
            </div>
            <div className="profile-item">
              <label className="profile-label">Role:</label>
              <span className="profile-value">{user.user.role}</span>
            </div>
            <div className="profile-item">
              <label className="profile-label">Account Created:</label>
              <span className="profile-value">{user.user.createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    );
}
