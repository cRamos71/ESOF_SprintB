import React, { useState } from "react";
import { jwtDecode } from 'jwt-decode';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student")

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!role){
      console.log("no role");
      return;
    }

    const url = "http://localhost:8000/api/login";


    const sending = {
        email: email,
        password: password,
        role: role
    }

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sending),
    })

    .then(async (response) => {
      
      const data = await response.json();

      if(!response.ok){
        throw new Error(`Server Error: ${response.status}`);
      }else{
        if(data.token){
          sessionStorage.setItem("token", data.token);
          console.log("Login successful", data);
          try {
            const decodedToken = jwtDecode(data.token);
            const role = decodedToken.role;

            if (role) {
              sessionStorage.setItem('role', role);
            } else {
              console.error('Role not found in the token');
            }

          } catch (error) {
            console.error('Failed to decode JWT', error);
          }
        }
      }
    })

    .catch(error => {
        console.error("Error:", error);
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
