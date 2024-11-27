import React, { useState, useEffect } from 'react';

const OpportunityFilter = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filters, setFilters] = useState({
    urgency: '',
    location: '',
    work_schedule: '',
  });

  const token = sessionStorage.getItem('token');
  const url = 'http://localhost:8000/api/opportunities/filter';

  const fetchOpportunities = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(filters), // Directly use filters for the body
      });

      if (!response.ok) {
        throw new Error('Failed to fetch opportunities');
      }

      const data = await response.json();

      // Validate API response as an array
      if (Array.isArray(data)) {
        setOpportunities(data);
      } else {
        console.error('API response is not an array:', data);
        setOpportunities([]);
      }
    } catch (err) {
      console.error('Error fetching opportunities:', err.message);
    }
  };

  // Trigger API call when filters change
  useEffect(() => {
    fetchOpportunities();
  }, [filters]); // Dependency ensures refetch on filter changes

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesUrgency = filters.urgency
      ? opportunity.urgency === filters.urgency
      : true;
    const matchesLocation = filters.location
      ? opportunity.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;
    const matchesWorkSchedule = filters.work_schedule
      ? opportunity.work_schedule === filters.work_schedule
      : true;

    return matchesUrgency && matchesLocation && matchesWorkSchedule;
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
          <select
            id="location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            style={styles.select}
          >
            <option value="">All</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Office">Office</option>
          </select>
        </div>
        <div style={styles.filterGroup}>
          <label htmlFor="work_schedule" style={styles.label}>Work Schedule:</label>
          <select
            id="work_schedule"
            name="work_schedule"
            value={filters.work_schedule}
            onChange={handleFilterChange}
            style={styles.select}
          >
            <option value="">All</option>
            <option value="Nine">9-5</option>
            <option value="Ten">10-6</option>
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
                <strong>Work Schedule:</strong> {opportunity.work_schedule}
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
