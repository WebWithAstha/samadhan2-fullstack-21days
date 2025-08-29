import './App.css'
import ProfileCard from './components/ProfileCard'

function App() {
  // Sample data for the profile card
  const profileData = {
    name: "Devraj Singh",
    role: "Full Stack Developer",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    bio: "Passionate full-stack developer with expertise in React, Node.js, and modern JavaScript. Love building user-friendly applications.",
    socialLinks: [
      { platform: "GitHub", url: "https://github.com" },
      { platform: "LinkedIn", url: "https://linkedin.com" },
      { platform: "Twitter", url: "https://twitter.com" }
    ]
  };

  return (
    <div className="app-container">
      <h1>Day 6: Profile Card Component</h1>
      <div className="profile-container">
        <ProfileCard 
          name={profileData.name} 
          role={profileData.role} 
          imageUrl={profileData.imageUrl} 
          bio={profileData.bio} 
          socialLinks={profileData.socialLinks} 
        />
      </div>
    </div>
  )
}

export default App
