import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [activeInfo, setActiveInfo] = useState('name');

  useEffect(() => {
    fetchRandomUser();
  }, []);

  const fetchRandomUser = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      setUser(data.results[0]);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const renderActiveInfo = () => {
    if (!user) return null;

    switch (activeInfo) {
      case 'name':
        return `${user.name.first} ${user.name.last}`;
      case 'email':
        return user.email;
      case 'phone':
        return user.phone;
      case 'location':
        return `${user.location.city}, ${user.location.country}`;
      case 'dob':
        return new Date(user.dob.date).toLocaleDateString();
      case 'age':
        return user.dob.age;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <h1>Random User Generator</h1>
      <button onClick={fetchRandomUser}>Generate</button>

      {user && (
        <div className="user-info">
          <img src={user.picture.large} alt="User" className="round-image" />
          <div className="icon-container">
            <i className="icon" onClick={() => setActiveInfo('name')}>👤</i>
            <i className="icon" onClick={() => setActiveInfo('email')}>📧</i>
            <i className="icon" onClick={() => setActiveInfo('phone')}>📞</i>
            <i className="icon" onClick={() => setActiveInfo('location')}>📍</i>
            <i className="icon" onClick={() => setActiveInfo('dob')}>🎂</i>
            <i className="icon" onClick={() => setActiveInfo('age')}>👵</i>
          </div>
          <div className="active-info">
            {renderActiveInfo()}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
