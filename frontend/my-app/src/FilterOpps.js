import React, { useState, useEffect } from 'react';

const OpportunityFilter = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filters, setFilters] = useState({
    urgency: '',
    location: '',
    workMode: '',
  });

  // Simulated data fetching
  useEffect(() => {
    const fetchOpportunities = async () => {
      const mockData = [
        {
          id: 1,
          title: 'Frontend Developer Internship',
          description: 'React internship opportunity.',
          location: 'Remote',
          workMode: 'Remote',
          urgency: 'High',
        },
        {
          id: 2,
          title: 'Scholarship for CS Students',
          description: 'Fully funded scholarship.',
          location: 'USA',
          workMode: 'On-Site',
          urgency: 'Medium',
        },
        {
          id: 3,
          title: 'Volunteering at Animal Shelter',
          description: 'Help animals in need.',
          location: 'Local',
          workMode: 'On-Site',
          urgency: 'Low',
        },
      ];
      setOpportunities(mockData);
    };

    fetchOpportunities();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesUrgency = filters.urgency
      ? opportunity.urgency === filters.urgency
      : true;
    const matchesLocation = filters.location
      ? opportunity.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;
    const matchesWorkMode = filters.workMode
      ? opportunity.workMode === filters.workMode
      : true;

    return matchesUrgency && matchesLocation && matchesWorkMode;
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Filter Opportunities</h2>

      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.filterGroup}>
          <label htmlFor="urgency" style={styles.label}>Urgency:</label>
          <select
            id="urgency"
            name="urgency"
            value={filters.urgency}
            onChange={handleFilterChange}
            style={styles.select}
          >
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div style={styles.filterGroup}>
          <label htmlFor="location" style={styles.label}>Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            style={styles.input}
            placeholder="Enter location"
          />
        </div>
        <div style={styles.filterGroup}>
          <label htmlFor="workMode" style={styles.label}>Work Mode:</label>
          <select
            id="workMode"
            name="workMode"
            value={filters.workMode}
            onChange={handleFilterChange}
            style={styles.select}
          >
            <option value="">All</option>
            <option value="Remote">Remote</option>
            <option value="On-Site">On-Site</option>
          </select>
        </div>
      </div>

      {/* Opportunities */}
      <div style={styles.opportunities}>
        {filteredOpportunities.length > 0 ? (
          filteredOpportunities.map((opportunity) => (
            <div key={opportunity.id} style={styles.opportunity}>
              <h3 style={styles.opportunityTitle}>{opportunity.title}</h3>
              <p>{opportunity.description}</p>
              <p>
                <strong>Location:</strong> {opportunity.location}
              </p>
              <p>
                <strong>Work Mode:</strong> {opportunity.workMode}
              </p>
              <p>
                <strong>Urgency:</strong> {opportunity.urgency}
              </p>
            </div>
          ))
        ) : (
          <p style={styles.noResults}>No opportunities match your filters.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#007BFF',
  },
  filters: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  filterGroup: {
    flex: '1',
    margin: '0 10px',
    textAlign: 'center',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  select: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  opportunities: {
    marginTop: '20px',
  },
  opportunity: {
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  opportunityTitle: {
    margin: 0,
    color: '#333',
  },
  noResults: {
    textAlign: 'center',
    color: '#555',
  },
};

export default OpportunityFilter;

/*Replace the mock data with an actual API call in fetchOpportunities if needed:
const response = await fetch('https://your-api.com/opportunities');
const data = await response.json();
setOpportunities(data);*/