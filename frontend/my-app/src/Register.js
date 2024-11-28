import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [role, setRole] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    const url = "http://localhost:8000/api/register";
  
    const sending = {
      role: role,
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
  
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sending),
    })
      .then(async (response) => {
        const data = response.json();
        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        }
        return data;
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log("User registered successfully", data.data);
          setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
          setError('');
        } else {
          setError(data.message || "Registration failed");
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        setError(error.message || "An unknown error occurred");
      });
  };
  
  const handleUserTypeChange = (e) => {
    setRole(e.target.value);
    console.log(e.target.value);
  };


  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Register</h2>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <div style={styles.inputGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your name"
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your email"
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your password"
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
            placeholder="Confirm your password"
          />
        </div>
        <div>
          <label>User Type:</label>
          <div>
            <label style={{ marginRight: '10px' }}>
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={handleUserTypeChange}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="company"
                checked={role === "company"}
                onChange={handleUserTypeChange}
              />
              Company
            </label>
          </div>
        </div>
        <button type="submit" style={styles.button}>
          Register
        </button>
        <p className="text-center text-muted mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-primary">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  form: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
  success: {
    color: 'green',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default Register;
