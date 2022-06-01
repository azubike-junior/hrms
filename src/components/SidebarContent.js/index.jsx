import React, { useEffect, useState } from "react";
import hrItems from "../../utils/hrItem.json";
import approverItems from "../../utils/approverItem.json";
import initiatorsItems from "../../utils/initiatorItems.json";
import logoutItem from "../../utils/logoutItem.json";
import SidebarItem from "../SidebarItem";
import "../../assets/css/sidebar.css";
import avatar from "../../assets/img/avatar.png"

export default function SidebarContent() {
  const [role, setRole] = useState("");
  const imageUrl = JSON.parse(localStorage.getItem("photoPath"));

  useEffect(() => {
    const staff = localStorage.getItem("role");
    setRole(staff);
  }, []);

  return (
    <div className="sidebar">
      <li className="submenu">
        <div className="col-lg-12 m-t-10 m-b-20">
          <div className="d-flex align-items-center justify-content-center">
            <img src={imageUrl ? imageUrl : avatar} className="profileImage" />
          </div>
        </div>
      </li>

      {role === "hrAdmin" && (
        <div>
          {hrItems.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
      )}
      {role === "approver" && (
        <div>
          {approverItems.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
      )}
      {role === "initiator" && (
        <div>
          {initiatorsItems.map((item, index) => (
            <SidebarItem key={index} item={item}  />
          ))}
        </div>
      )}
      <div className="sidebar-title">
        <a
          href="/hrms"
          onClick={() => localStorage.clear()}
          className=" text-white"
        >
          <span>
            <i className="fa fa-sign-out font-20 pl-2 mr-4 ml-2 pt-2"></i>
            Logout
          </span>
        </a>
      </div>
    </div>
  );
}
