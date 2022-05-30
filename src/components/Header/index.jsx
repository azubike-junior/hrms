/**
 * App Header
 */
import React, { Component } from "react";
import { useLocation, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import suntrustlogo from "../../assets/img/st_logo.png";
import avatar from "../../assets/img/avatar.png";

function Header() {
  const location = useLocation();

  const imageUrl = JSON.parse(localStorage.getItem("photoPath"));
  const staff = JSON.parse(localStorage.getItem("cachedData"));

  return (
    <div
      className="header d-flex justify-content-between"
      style={{ right: "0px" }}
    >
      {/* Logo */}
      <div>
        <div className="header-left">
          <Link to="#" className="logo">
            <img src={suntrustlogo} width={60} height={55} alt="" />
          </Link>
        </div>
        {/* /Logo */}

        {/* <a
          id="toggle_btn"
          href=""
          style={{
            display: location.pathname.includes("tasks")
              ? "none"
              : location.pathname.includes("compose")
              ? "none"
              : "",
          }}
        >
          <span className="bar-icon">
            <span />
            <span />
            <span />
          </span>
        </a> */}

        {/* Header Title */}
        <div className="page-title-box">
          <h3>HR MANAGEMENT SYSTEM</h3>
        </div>
        {/* /Header Title */}

        <a id="mobile_btn" className="mobile_btn" href="#sidebar">
          <i className="fa fa-bars" />
        </a>
        {/* Header Menu */}
      </div>

      {/* Mobile Menu */}
      <div className=" pt-4">
        <ul>
          <li className="nav-item dropdown has-arrow main-drop">
            <a
              href="#"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
            >
              <span className="user-img">
                <img src={imageUrl ? imageUrl : avatar} alt="" />
                <span className="status online" />
              </span>
              <Link onClick={() => localStorage.clear()} to="/hrms">
                Logout {staff?.firstName}
              </Link>
            </a>
            {/* <div className="dropdown-menu">
              <Link className="dropdown-item" to="/hrms/setupProfile">
                Setup Profile
              </Link>
              <Link
                className="dropdown-item"
                to="/hrms"
                onClick={() => localStorage.clear()}
              >
                Logout
              </Link>
            </div> */}
          </li>
        </ul>
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
            <Link className="dropdown-item" to="/ht/profile/employee-profile">
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
      </div>
      {/* /Mobile Menu */}
    </div>
  );
}

export default withRouter(Header);
