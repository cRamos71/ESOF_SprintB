import React from 'react';

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    // Perform logout actions (e.g., clearing local storage, cookies, etc.)
    localStorage.removeItem('authToken'); // Example: Clear auth token
    console.log('User logged out');
    onLogout(); // Notify parent component or handle further actions
  };

  return (
    <div style={styles.container}>
      <h2>Are you sure you want to log out?</h2>
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    textAlign: 'center',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
  },
};

export default Logout;
