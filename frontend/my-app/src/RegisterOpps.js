import React, { useState } from 'react';

const RegisterOpportunity = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    deadline: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.description || !formData.category || !formData.location || !formData.deadline) {
      setError('Please fill in all fields');
      return;
    }

    // Simulate API call
    console.log('New Opportunity Registered:', formData);
    setError('');
    setSuccess('Opportunity registered successfully!');

    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      location: '',
      deadline: '',
    });
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Register New Opportunity</h2>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <div style={styles.inputGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter opportunity title"
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
            placeholder="Enter opportunity description"
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select a category</option>
            <option value="Job">Job</option>
            <option value="Internship">Internship</option>
            <option value="Scholarship">Scholarship</option>
            <option value="Volunteering">Volunteering</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter location"
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="deadline">Application Deadline:</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Submit Opportunity
        </button>
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
    width: '400px',
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
  textarea: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    height: '80px',
  },
  select: {
    width: '100%',
    padding: '8px',
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
    fontSize: '16px',
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

export default RegisterOpportunity;
