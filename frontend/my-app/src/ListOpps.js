import React, { useState, useEffect } from 'react';

const OpportunityList = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Simulate fetching data from an API
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        // Replace with actual API call
        const mockData = [
          {
            id: 1,
            title: 'Frontend Developer Internship',
            description: 'Work with React and JavaScript to create amazing user interfaces.',
            category: 'Internship',
            location: 'Remote',
            deadline: '2024-12-01',
          },
          {
            id: 2,
            title: 'Scholarship for Computer Science Students',
            description: 'A fully funded scholarship for students passionate about technology.',
            category: 'Scholarship',
            location: 'USA',
            deadline: '2024-11-30',
          },
          {
            id: 3,
            title: 'Volunteering at Animal Shelter',
            description: 'Help care for animals in need and make a difference.',
            category: 'Volunteering',
            location: 'Local',
            deadline: '2024-12-15',
          },
        ];

        // Simulate a delay
        setTimeout(() => {
          setOpportunities(mockData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch opportunities');
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading opportunities...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Available Opportunities</h2>
      {opportunities.length > 0 ? (
        <ul style={styles.list}>
          {opportunities.map((opportunity) => (
            <li key={opportunity.id} style={styles.listItem}>
              <h3 style={styles.opportunityTitle}>{opportunity.title}</h3>
              <p style={styles.opportunityDescription}>{opportunity.description}</p>
              <p style={styles.opportunityDetails}>
                <strong>Category:</strong> {opportunity.category}
              </p>
              <p style={styles.opportunityDetails}>
                <strong>Location:</strong> {opportunity.location}
              </p>
              <p style={styles.opportunityDetails}>
                <strong>Deadline:</strong> {new Date(opportunity.deadline).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No opportunities available at the moment.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#007BFF',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '20px',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  opportunityTitle: {
    margin: 0,
    color: '#333',
  },
  opportunityDescription: {
    margin: '10px 0',
    color: '#555',
  },
  opportunityDetails: {
    margin: '5px 0',
    color: '#777',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#555',
  },
  error: {
    textAlign: 'center',
    fontSize: '18px',
    color: 'red',
  },
};

export default OpportunityList;

/*Replace the mockData array with an actual API call to fetch opportunities.
const response = await fetch('https://your-api.com/opportunities');
const data = await response.json();
setOpportunities(data);*/