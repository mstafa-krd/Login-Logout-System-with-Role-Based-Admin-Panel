import { useContext, useEffect, useState } from "react";
import "./user.css";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { createUserApi, getUserApi, updateUserApi } from "../../api/userApi";
import { UserContext } from "../../context/userContext";

User.propTypes = {
  title: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};

export default function User(props) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState();
  const [userExist, setUserExist] = useState();
  const { id } = useParams(); //get the id from the router
  const nav = useNavigate();
  const user = useContext(UserContext);
  
  useEffect(() => {
    if (props.state === "update") {
      try {
        axios
          .get(`${getUserApi}/${id}`, {
            withCredentials: true,
          })
          .then((res) => {
            if (res) {
              setData({
                name: res.data.name,
                email: res.data.email,
                password: res.data.password,
                role: res.data.role,
              });
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (userExist) {
      //make the logic for the user exist or not

      setUserExist(true);
    }
    if (data.password < 8) {
      setError(true);
    }

    if (props.state === "update") {
      //update the user

      axios
        .put(`${updateUserApi}/${id}`, data, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            nav("/dashboard/users");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //create new user
      axios
        .post(`${createUserApi}`, data, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            nav("/dashboard/users");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <div>
        <h2 className="login-title">{props.title}</h2>
        <form onSubmit={onSubmitHandler} className="login-form">
          <input
            onChange={onChangeHandler}
            value={data.name}
            placeholder="Name"
            name="name"
            type="text"
            required
          />
          <input
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Email"
            name="email"
            type="email"
            required
          />
          <input
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Password"
            name="password"
            type="password"
            required
          />
          <h5 style={{ color: "#3432b3", fontWeight: "bold" }}>
            Select user role:
          </h5>
          <div className="role">
            {user.user.role !== "admin" && (
              <label htmlFor="super-admin">
                <input
                  onChange={onChangeHandler}
                  value="super-admin"
                  name="role"
                  type="radio"
                  checked={data.role === "super-admin"}
                  required
                />
                <span>Super Admin</span>
              </label>
            )}
            <label htmlFor="admin">
              <input
                onChange={onChangeHandler}
                value="admin"
                name="role"
                type="radio"
                checked={data.role === "admin"}
                required
              />
              <span>Admin</span>
            </label>
            <label htmlFor="manager">
              <input
                onChange={onChangeHandler}
                value="manager"
                name="role"
                type="radio"
                required
                checked={data.role === "manager"}
              />
              <span>Manager</span>
            </label>
            <label htmlFor="normal-user">
              <input
                onChange={onChangeHandler}
                value="normal-user"
                name="role"
                type="radio"
                required
                checked={data.role === "normal-user"}
              />
              <span>Normal User</span>
            </label>
          </div>
          {userExist && (
            <span className="error">
              A user with this email adress already exist
            </span>
          )}
          {error && (
            <span className="error">
              password should be no less than 8 characters
            </span>
          )}

          <button type="submit" className="submit">
            {props.buttonTitle}
          </button>
        </form>
      </div>
    </div>
  );
}
