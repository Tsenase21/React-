import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]); // Initialize users as an empty array
  const [user, setUser] = useState({ id: null, name: '', email: '', pin: '' });
  const [currentUserIndex, setCurrentUserIndex] = useState(null); // Track the current user being edited

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = [...users];
    updatedUsers[currentUserIndex] = updatedUser;
    setUsers(updatedUsers);
  };

  const deleteUser = () => {
    if (currentUserIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers.splice(currentUserIndex, 1);
      setUsers(updatedUsers);
      setCurrentUserIndex(null);
      setUser({ id: null, name: '', email: '', pin: '' }); // Reset form after deletion
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.id) {
      updateUser(user);
    } else {
      addUser({ ...user, id: Date.now() }); // Assign a unique ID to new users
    }
    setUser({ id: null, name: '', email: '', pin: '' }); // Reset form after submission
    setCurrentUserIndex(null);
  };

  const handleEdit = (index) => {
    setUser(users[index]);
    setCurrentUserIndex(index);
  };

  return (
    <div className="user">
      <h2>User Management</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={user.name} 
          onChange={(e) => setUser({ ...user, name: e.target.value })} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={user.email} 
          onChange={(e) => setUser({ ...user, email: e.target.value })} 
          required 
        />
        <input 
          type="password" 
          placeholder="PIN" 
          value={user.pin} 
          onChange={(e) => setUser({ ...user, pin: e.target.value })} 
          required 
        />
        <button type="submit">{user.id ? 'Update User' : 'Add User'}</button>
        {user.id && <button type="button" onClick={deleteUser}>Delete User</button>}
      </form>

      <h3>Existing Users</h3>
      {users.length > 0 ? (
        <div>
          <p>
            {users[currentUserIndex]?.name} - {users[currentUserIndex]?.email}
          </p>
          <button onClick={() => handleEdit(0)}>Edit First User</button>
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserManagement;
