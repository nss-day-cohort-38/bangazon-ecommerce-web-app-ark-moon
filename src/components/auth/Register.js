import React, { useState, useRef } from "react";
import authManager from "../../modules/authManager.js";

const Login = ({ routerProps }) => {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const password = useRef();

  const handleFieldChange = (evt) => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const customerCreds = {
      username: credentials.username,
      password: credentials.password,
      first_name: credentials.first_name,
      last_name: credentials.last_name,
      email: credentials.email,
      address: credentials.address,
      phone_number: credentials.phone_number,
    };
    //   Login User
    authManager.registerUser(customerCreds).then(() => {
      //   if("valid" in parsedResponse && parsedResponse.valid && "token" in parsedResponse) {
      //       sessionStorage.setItem("token", parsedResponse.token)
      setIsLoggedIn(true);
      routerProps.history.push("/");
    });
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <fieldset>
          <label htmlFor="username">Username</label>
          <input
            onChange={handleFieldChange}
            type="text"
            id="username"
            placeholder="Username"
            value={credentials.username}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input
            ref={password}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="form-control"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="first_name">First Name</label>
          <input
            onChange={handleFieldChange}
            type="text"
            id="first_name"
            placeholder="First Name"
            value={credentials.first_name}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="last_name">Last Name</label>
          <input
            onChange={handleFieldChange}
            type="text"
            id="last_name"
            placeholder="Last Name"
            value={credentials.last_name}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleFieldChange}
            type="text"
            id="email"
            placeholder="Email"
            value={credentials.email}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="address">Address</label>
          <input
            onChange={handleFieldChange}
            type="text"
            id="address"
            placeholder="Address"
            value={credentials.address}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="phone_number">Phone Number</label>
          <input
            onChange={handleFieldChange}
            type="text"
            id="phone_number"
            placeholder="Phone Number"
            value={credentials.phone_number}
          />
        </fieldset>
        <fieldset>
          <button type="Submit">Register</button>
        </fieldset>
      </form>
    </>
  );
};

export default Login;
