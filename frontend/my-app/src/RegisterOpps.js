import React, { useState } from "react";

const RegisterOpportunity = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    schedule: "",
    contract: "",
    location: "",
    deadline: "",
    urgency: "",
    skills: [],
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "skills") {
      const options = e.target.options;
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
        
      setFormData({ ...formData, skills: parseInt(selectedValues) });
      console.log(formData);
    } else {
      // Handle other inputs normally
      setFormData({ ...formData, [name]: value });
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.title ||
      !formData.contract ||
      !formData.description ||
      !formData.category ||
      !formData.location ||
      !formData.category ||
      !formData.urgency ||
      !formData.skills ||
      !formData.schedule ||
      !formData.deadline
    ) {
      setError("Please fill in all fields");
      return;
    }

    const token = sessionStorage.getItem("token");
    const url = "http://localhost:8000/api/registeropportunities";

    const sending = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      work_schedule: formData.schedule,
      contract_type: formData.contract,
      required_skills: formData.skills,
      urgency: formData.urgency,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sending),
    })
      .then(async (response) => {
        const data = response.json();
        console.log(response);
        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        }
        return data;
      })

      .then((data) => {
        console.log(data);
      })

      .catch((error) => {
        console.error("Error during registration:", error);
        setError(error.message || "An unknown error occurred");
      });
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      contract: "",
      deadline: "",
      urgency: "",
      skills: [],
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
          <label htmlFor="category">Type:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select a Type</option>
            <option value="Job">Job</option>
            <option value="Internship">Internship</option>
            <option value="Scholarship">Scholarship</option>
            <option value="Volunteering">Volunteering</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="location">Location:</label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select a location</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Office">Office</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="schedule">Work Schedule:</label>
          <select
            id="schedule"
            name="schedule"
            value={formData.schedule}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select a Schedule</option>
            <option value="Nine">9-5</option>
            <option value="Ten">10-6</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="skills">Skills:</label>
          <select
            id="skills"
            name="skills"
            value={formData.skills} // This should be an array
            onChange={handleChange}
            style={styles.input} 
          >
            <option value="1">JavaScript</option>
            <option value="2">Python</option>
            <option value="3">Java</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="urgency">Urgency:</label>
          <select
            id="urgency"
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select a Urgency</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="contract">Contract Type:</label>
          <select
            id="contract"
            name="contract"
            value={formData.contract}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select a Contract</option>
            <option value="Full">Full-Time</option>
            <option value="Part">Part-Time</option>
          </select>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  form: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "400px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "5px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    height: "80px",
  },
  select: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  success: {
    color: "green",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

export default RegisterOpportunity;
