/**
 * App Header
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import suntrustlogo from "../../assets/img/st_logo.png";

function LoginHeader() {
  return (
    <div className="login-header" style={{ right: "0px" }}>
      {/* Logo */}
      <div className="header-left">
        <Link to="#" className="logo">
          <img src={suntrustlogo} width={60} height={55} alt="" />
        </Link>
      </div>

      {/* Header Title */}
      <div className="page-title-box">
        <h3>HR Management System</h3>
      </div>
      {/* /Header Title */}

      <a id="mobile_btn" className="mobile_btn" href="#sidebar">
        <i className="fa fa-bars" />
      </a>
      {/* Header Menu */}

      {/* Mobile Menu */}
      <div className="dropdown mobile-user-menu">
        <a
          href="#"
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa fa-ellipsis-v" />
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <Link className="dropdown-item" to="/app/profile/employee-profile">
            My Profile
          </Link>
          <Link className="dropdown-item" to="/settings/companysetting">
            Settings
          </Link>
          <Link className="dropdown-item" to="/login">
            Logout
          </Link>
        </div>
      </div>
      {/* /Mobile Menu */}
    </div>
  );
}

export default withRouter(LoginHeader);
