import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ name, role, imageUrl, bio, socialLinks }) => {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <img src={imageUrl} alt={`${name}'s profile`} className="profile-image" />
        <h2 className="profile-name">{name}</h2>
        <p className="profile-role">{role}</p>
      </div>
      <div className="profile-body">
        <p className="profile-bio">{bio}</p>
      </div>
      <div className="profile-footer">
        {socialLinks && socialLinks.map((link, index) => (
          <a 
            key={index} 
            href={link.url} 
            className="social-link"
            target="_blank" 
            rel="noopener noreferrer"
          >
            {link.platform}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
