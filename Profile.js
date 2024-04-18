import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import { AiOutlineCamera } from 'react-icons/ai'; 

const firebaseConfig = {
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Placeholder image URL
const placeholderImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6YvRump6DC1zR3Bu5fz9358Gcgviuu5nag&s'; // Placeholder image URL

const Profile = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken();
        const response = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDisplayName(response.data.displayName);
        setEmail(response.data.email);
        setPhotoURL(response.data.photoURL);
      } else {
        console.error('No user authenticated.');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken();
        await axios.put('/api/profile', { displayName, email }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchProfile();
      } else {
        console.error('No user authenticated.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken();
        await axios.delete('/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Redirect or perform logout after deleting profile
      } else {
        console.error('No user authenticated.');
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoURL(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
      setShowCamera(false);
    }
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-silhouette" onClick={() => setShowCamera(true)}>
        {showCamera && (
          <div className="camera-icon-container">
            <label htmlFor="photoUpload">
              <AiOutlineCamera className="camera-icon" /> {/* Use the camera icon */}
            </label>
            <input
              type="file"
              accept="image/*"
              id="photoUpload"
              style={{ display: 'none' }}
              onChange={handlePhotoUpload}
            />
          </div>
        )}
        <img src={photoURL || placeholderImage} alt="Profile" className="profile-image" />
        <div className="change-delete-buttons">
          {photoURL && (
            <button onClick={() => setPhotoURL('')} className="delete-photo-button">
              Delete Photo
            </button>
          )}
        </div>
      </div>
      <div className="profile-details">
        <label>Display Name:</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="profile-input" // Add profile-input class to the input
        />
      </div>
      <div className="profile-details">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="profile-input" // Add profile-input class to the input
        />
      </div>
      <button onClick={handleUpdateProfile}>Save Profile</button> {/* Changed to "Save Profile" button */}
      <button onClick={handleDeleteProfile}>Delete Profile</button>
    </div>
  );
};

export default Profile;
