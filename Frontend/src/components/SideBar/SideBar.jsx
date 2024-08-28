import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sideBar.css"; // Include your styles here
import {
  faListCheck,
  faPeopleGroup,
  faRightFromBracket,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faIdCard } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { logoutApi } from "../../api/userApi";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const SideBar = () => {
  const user = useContext(UserContext);
  const role = user.user.role;
  const nav = useNavigate();

  const logoutHandler = () => {
    axios
      .get(logoutApi, { withCredentials: true })
      .then(() => {
        localStorage.removeItem("user")
        nav("/login");
      })
      .catch((err) => {
        alert("Error in logout", err);
      });
  };
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <nav className="nav">
          {role === "super-admin" || role === "admin" ? (
            <>
              <Link to="/dashboard/users" className="nav-links">
                <span>
                  <FontAwesomeIcon icon={faUsers} />
                </span>
                <span className="sideBar-text">View All Users</span>
              </Link>
              <Link to="/dashboard/newuser" className="nav-links">
                <span>
                  <FontAwesomeIcon icon={faUserPlus} />
                </span>
                <span className="sideBar-text"> Add New User</span>
              </Link>
            </>
          ) : null}
          <Link to="/dashboard/team" className="nav-links">
            <span>
              <FontAwesomeIcon icon={faPeopleGroup} />
            </span>
            <span className="sideBar-text"> Manage Teams</span>
          </Link>
          <Link to="/dashboard/tasks" className="nav-links">
            <span>
              <FontAwesomeIcon icon={faListCheck} />
            </span>
            <span className="sideBar-text"> Tasks</span>
          </Link>
          <Link to="/dashboard/profile" className="nav-links">
            <span>
              <FontAwesomeIcon icon={faIdCard} />
            </span>
            <span className="sideBar-text"> View Profile</span>
          </Link>
          <div onClick={logoutHandler} className="nav-links">
            <span>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </span>
            <span className="sideBar-text"> Logout</span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
