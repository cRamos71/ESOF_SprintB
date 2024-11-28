import React, { useEffect, useState } from "react";

const CandidaturesPage = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem("token");
  const url = "http://localhost:8000/api/candidatures";

  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        
        // Log the data to check the structure
        console.log(data);

        // Check if the data is in the expected format (array of candidatures)
        if (Array.isArray(data)) {
          setCandidatures(data); // Set the candidatures if it's an array
        } else {
          throw new Error('Unexpected response format');
        }

      } catch (err) {
        setError(err.message || "An error occurred");
      }
    };

    fetchCandidatures();
  }, [token]); // Adding token as dependency to refetch when token changes

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Candidatures</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : candidatures.length === 0 ? (
        <p>No candidatures found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Candidature ID</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Student Name</th> {/* Updated */}
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Opportunity Title</th> {/* Updated */}
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {candidatures.map((candidature) => (
              <tr key={candidature.candidature_id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{candidature.candidature_id}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{candidature.student_name}</td> {/* Updated */}
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{candidature.email}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{candidature.opportunity_title}</td> {/* Updated */}
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{candidature.status}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {new Date(candidature.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CandidaturesPage;
