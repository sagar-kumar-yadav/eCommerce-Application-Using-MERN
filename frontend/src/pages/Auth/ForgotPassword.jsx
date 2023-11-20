import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/v1/auth/forgot-password";
      const res = await axios.post(url, {
        email,
        newPassword,
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
    <Layout title={"Forgot Password - Ecommerce APP"}>
      <div
        className="wrapper"
        style={{
          backgroundImage:
            'url("src/assets/register/bg-registration-form-1.jpg")',
        }}
      >
        <div className="inner mt-20">
          <div className="image-holder">
            <img
              src="src/assets/register/registration-form-1.jpg"
              alt="reg-girl-img"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <h3>Forget Password</h3>

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
                placeholder="Create New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                required
              />
              <i className="zmdi zmdi-lock" />
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
              Reset Password
              <i className="zmdi zmdi-arrow-right" />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
