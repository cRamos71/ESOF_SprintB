import React from 'react';

const Logout = ({ onLogout }) => {

  const url =  "http://localhost:8000/api/logout";

  const token = sessionStorage.getItem('token');

  const handleLogout = async () => {
    
    try{
      const response = await fetch(url, {
        method: 'POST',
        headers:{
          
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if(!response.ok){
        console.error('Error during logout:', data);
        throw new Error('Error fetching the logout');
      }
  
      alert('Sucess');
      console.log('Logout:', data);
    
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');

      window.location.href = '/login';

    }catch(error){
      console.error('Error during logout:', error);
    }
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
