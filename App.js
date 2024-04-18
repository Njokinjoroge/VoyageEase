import React from 'react';
import UserList from './UserList';
import UserProfile from './UserProfile';

const App = () => {
    return (
        <div className="App">
            {/* Display User List */}
            <UserList />
            <hr />
            {/* Display User Profile */}
            <UserProfile userId="123" />
        </div>
    );
};

export default App;
