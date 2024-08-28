import { useState } from "react";
import "./addTask.css";
import axios from "axios";
import { createTaskApi } from "../../api/taskApi";
import { useNavigate } from "react-router-dom";
export default function AddTasks() {
  const [data, setData] = useState({
    name: "",
    discrption: "",
    manager: "",
    email: "",
    stats:"in Progress"
  });
  const nav = useNavigate()
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios
      .post(createTaskApi, data, { withCredentials: true })
      .then((res) => {
        setData(res.data);
        nav("/dashboard/tasks")
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="continer">
      <h2 className="login-title">Add task</h2>
      <form onSubmit={onSubmitHandler} className="login-form">
        <input
          onChange={onChangeHandler}
          value={data.name}
          placeholder="task assignee name"
          name="name"
          type="text"
          required
        />
        <textarea
          onChange={onChangeHandler}
          value={data.discrption}
          placeholder="Task Discrption"
          name="discrption"
          type="text"
          required
        />
        <input
          onChange={onChangeHandler}
          value={data.email}
          placeholder="task assignee email"
          name="email"
          type="email"
          required
        />
        <input
          onChange={onChangeHandler}
          value={data.manager}
          placeholder="task manager email"
          name="manager"
          type="email"
          required
        />

        <button type="submit" className="submit">
          Add
        </button>
      </form>
    </div>
  );
}
