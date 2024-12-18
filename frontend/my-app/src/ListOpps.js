import React, { useState, useEffect } from 'react';

const OpportunityList = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);


  const token = sessionStorage.getItem("token");
  const url = "http://localhost:8000/api/work-opportunities";


  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch opportunities');
        }

        const data = await response.json();
        console.log(data);
        setOpportunities(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
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
                <strong>Urgency:</strong> {opportunity.urgency}
              </p>
              <p style={styles.opportunityDetails}>
                <strong>Location:</strong> {opportunity.location}
              </p>
              <p style={styles.opportunityDetails}>
                <strong>Deadline:</strong> {new Date(opportunity.date).toLocaleDateString()}
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
