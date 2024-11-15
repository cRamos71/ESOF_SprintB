import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student")

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "http://localhost:8000/login"


    const sending = {
        email: email,
        password: password,
        role: role
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(sending),
    })

    .then(async (response) => {
      
      const data = await response.json();

      if(response.ok){
        console.log("Response:", data);
        sessionStorage.setItem("token", data.token)
        sessionStorage.setItem("role", data.userDetails.role)
      }else{
        throw new Error("Login failed!");
      }
    })

    .catch(error => {
        console.earror("Error:", error);
    });
  };

  const handleUserTypeChange = (e) => {
    setRole(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="text-center text-muted mt-3">
          Don't have an account?{" "}
          <a href="/register" className="text-primary">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
