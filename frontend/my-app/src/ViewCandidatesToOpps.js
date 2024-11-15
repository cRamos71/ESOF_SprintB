import React, { useState, useEffect } from 'react';

const OpportunityApplicants = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Simulated data fetching
  useEffect(() => {
    const fetchOpportunities = async () => {
      const mockOpportunities = [
        { id: 1, title: 'Frontend Developer Internship' },
        { id: 2, title: 'Scholarship for Computer Science Students' },
        { id: 3, title: 'Volunteering at Animal Shelter' },
      ];
      setOpportunities(mockOpportunities);
    };

    fetchOpportunities();
  }, []);

  const fetchApplicants = async (opportunityId) => {
    setLoading(true);
    setError('');
    try {
      // Simulated API call to fetch applicants
      const mockApplicants = {
        1: [
          { id: 1, name: 'Alice Johnson', email: 'alice@example.com', appliedOn: '2024-11-01' },
          { id: 2, name: 'Bob Smith', email: 'bob@example.com', appliedOn: '2024-11-05' },
        ],
        2: [
          { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', appliedOn: '2024-11-03' },
        ],
        3: [],
      };

      const fetchedApplicants = mockApplicants[opportunityId] || [];
      setApplicants(fetchedApplicants);
      setSelectedOpportunity(opportunities.find((opp) => opp.id === opportunityId));
    } catch (err) {
      setError('Failed to fetch applicants');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Opportunity Applicants</h2>

      {/* List of Opportunities */}
      <div style={styles.opportunitiesList}>
        <h3 style={styles.subTitle}>Available Opportunities</h3>
        {opportunities.length > 0 ? (
          opportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              style={styles.opportunityItem}
              onClick={() => fetchApplicants(opportunity.id)}
            >
              {opportunity.title}
            </div>
          ))
        ) : (
          <p>No opportunities available.</p>
        )}
      </div>

      {/* Applicants for Selected Opportunity */}
      <div style={styles.applicantsSection}>
        {loading ? (
          <p style={styles.loading}>Loading applicants...</p>
        ) : selectedOpportunity ? (
          <>
            <h3 style={styles.subTitle}>Applicants for {selectedOpportunity.title}</h3>
            {applicants.length > 0 ? (
              <ul style={styles.applicantsList}>
                {applicants.map((applicant) => (
                  <li key={applicant.id} style={styles.applicantItem}>
                    <p><strong>Name:</strong> {applicant.name}</p>
                    <p><strong>Email:</strong> {applicant.email}</p>
                    <p><strong>Applied On:</strong> {new Date(applicant.appliedOn).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No applicants for this opportunity.</p>
            )}
          </>
        ) : (
          <p>Select an opportunity to view applicants.</p>
        )}
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    color: '#007BFF',
    marginBottom: '20px',
  },
  subTitle: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '10px',
  },
  opportunitiesList: {
    width: '100%',
    maxWidth: '600px',
    marginBottom: '20px',
  },
  opportunityItem: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  opportunityItemHover: {
    backgroundColor: '#f1f1f1',
  },
  applicantsSection: {
    width: '100%',
    maxWidth: '600px',
    marginTop: '20px',
  },
  applicantsList: {
    listStyleType: 'none',
    padding: 0,
  },
  applicantItem: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    backgroundColor: '#fff',
  },
  loading: {
    textAlign: 'center',
    color: '#555',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default OpportunityApplicants;

/*Replace the mock data in fetchApplicants and fetchOpportunities with actual API calls:
const response = await fetch('https://your-api.com/opportunities');
const data = await response.json();
setOpportunities(data);*/