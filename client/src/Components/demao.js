import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUserInfo } from '../api/userApi';

const UserIcon = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      if (user) {
        try {
          const data = await fetchUserInfo(user.id);
          setUserInfo(data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getUserInfo();
  }, [user]);

  const handleIconClick = () => {
    setShowInfo((prev) => !prev);
  };

  if (!user) return null;

  return (
    <div>
      <div onClick={handleIconClick}>
        <img src="path_to_user_icon" alt="User Icon" />
        {user.firstName}
      </div>
      {showInfo && userInfo && (
        <div className="user-info">
          <p>First Name: {userInfo.firstName}</p>
          <p>Email: {userInfo.email}</p>
          <p>Points: {userInfo.points}</p>
        </div>
      )}
    </div>
  );
};

export default UserIcon;
// src/App.js
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar'; // Assuming you have a Navbar component

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      {/* Other components */}
    </AuthProvider>
  );
};

export default App;
