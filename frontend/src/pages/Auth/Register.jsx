import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import "./auth.css"

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/v1/auth/register";
      const res = await axios.post(url, {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout>
      <div
        className="wrapper"
        style={{
          backgroundImage:
            'url("src/assets/register/bg-registration-form-1.jpg")',
        }}
      >
        <div className="inner mt-40">
          <div className="image-holder">
            <img
              // src="src/assets/register/registration-form-1.jpg"
              src="src/assets/banner/banner11.jpg"
              alt="reg-girl-img"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <h3>Registration Form</h3>
            <div className="form-group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First Name"
                className="form-control"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="form-control"
              />
            </div>

            <div className="form-wrapper">
              <input
                type="number"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                required
              />
              <i className="zmdi zmdi-email" />
            </div>

            <div className="form-wrapper">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required
              />
              <i className="zmdi zmdi-email" />
            </div>

            <div className="form-wrapper">
              <i className="zmdi zmdi-caret-down" style={{ fontSize: 17 }} />
            </div>
            <div className="form-wrapper">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
              />
              <i className="zmdi zmdi-lock" />
            </div>

            <div className="form-wrapper">
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                required
              />
              <i className="zmdi zmdi-email" />
            </div>

            <div className="form-wrapper">
              <input
                type="text"
                placeholder="What is your favorite sports"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                required
              />
              <i className="zmdi zmdi-email" />
            </div>

            <button className="reg-btn">
              Register
              <i className="zmdi zmdi-arrow-right" />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
