import React from 'react';
import './App.css';
import Profile from './components/Profile';


function App() {
  const userId = 1; // Replace this with the actual user ID

  return (
    <div className="App">
      <Profile userId={userId} />
    </div>
  );
}

export default App;