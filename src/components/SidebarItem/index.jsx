import { useState } from "react";
import { Link } from "react-router-dom";
import { updateName } from "../../utils/helper";
import { emptyStateData } from "./../../utils/helper";
import { useStateMachine } from "little-state-machine";

export default function SidebarItem({ item }) {
  const { state, actions } = useStateMachine({ updateName });
  const [open, setOpen] = useState(false);
  const emptyState = () => {
    actions.updateName(emptyStateData);
  };

  if (item.childrens) {
    return (
      <div className={open ? "sidebar-item open" : "sidebar-item"}>
        <div className="sidebar-title" onClick={() => setOpen(!open)}>
          <span>
            {item.icon && <i className={`${item.icon} font-20 pl-2 mr-3`}></i>}
            {`${item.title}`}
          </span>
          <i className="fa fa-angle-down toggle-btn font-18 pt-2"></i>
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <Link
        to={item.path || "#"}
        onClick={() => emptyState()}
        className="sidebar-item plain"
      >
        {item.icon && <i className={`${item.icon} font-20 mr-3`}></i>}
        {`${item.title}`}
      </Link>
    );
  }
}
