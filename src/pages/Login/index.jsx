/**
 * Signin Firebase
 */

import React, { Component, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import logo from "../../assets/img/st_logo.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LoginHeader from "../../components/LoginHeader";
import { login } from "../../services/Authentication/login";
import Loader from "../../components/Loader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState("");
  const { response, error, loading } = useSelector(
    (state) => state.authenticationManager.loginReducer
  );

  const history = useHistory();

  const loginHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return setInputError("Please fill the required fields");
    }
    const data = {
      email,
      password,
      history,
    };
    dispatch(login(data));
    setInputError("");
  };

  // console.log(">>>>>>>response from page", response, error);
  return (
    <>
      <Helmet>
        <title>Login - HRMS Admin Template</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div>
        <LoginHeader />
        {/* {response?.status === 200 &&
          history.push("/hrms/Appraisals")} */}
        <div className="vertical-align-wrap">
          <div className="vertical-align-middle auth-main">
            <div className="auth-box mt-4">
              <div className="top">
                <div className="image">
                  <img
                    src={logo}
                    style={{ width: "110px", height: "100px" }}
                    alt="User"
                  />
                </div>
              </div>

              <div className="card">
                <div className="header text-center font-weight-700">
                  <div className="lead mx-auto">Login to your account</div>
                </div>
                <div className="body">
                  {error && (
                    <p className="text-danger text-center mx-auto">{error}</p>
                  )}
                  <p className="text-danger text-center mx-auto">
                    {inputError}
                  </p>

                  <form className="form-auth-small" onSubmit={loginHandler}>
                    <div className="form-group">
                      <label className="control-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        value={email}
                        placeholder="Enter your username"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="control-label">Password</label>
                      <input
                        type="password"
                        value={password}
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-suntrust btn-lg btn-block"
                    >
                      {loading ? <Loader /> : "LOGIN"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
