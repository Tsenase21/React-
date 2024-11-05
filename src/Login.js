import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New field for password confirmation
  const [isSignUp, setIsSignUp] = useState(true); // Initially set to true to force sign-up first
  const [isRegistered, setIsRegistered] = useState(false); // Track if the user has signed up
  const [registeredUser, setRegisteredUser] = useState({}); // Store registered user's details

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistered && username === registeredUser.username && password === registeredUser.password) {
      onLogin(); // Call onLogin to set authenticated state to true
    } else {
      alert('Incorrect username or password. Please try again.');
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
    } else if (username && password) {
      alert(`User registered: ${username}`);
      setRegisteredUser({ username, password }); // Save registered username and password
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setIsRegistered(true); // Set to true after successful sign-up
      setIsSignUp(false); // Switch to login after sign-up
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={isSignUp ? handleSignUp : handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        {isSignUp && (
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
          />
        )}
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      
      {!isRegistered && !isSignUp && (
        <p>Please sign up first before logging in.</p>
      )}
      <p>
        {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Login' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
};

export default Login;
