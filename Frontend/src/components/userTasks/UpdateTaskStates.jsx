import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateTaskStateApi } from "../../api/taskApi";

export default function UpdateTaskstates() {
  const [data, setData] = useState({
    stats: "",
  });
  const nav = useNavigate();
  const { id } = useParams(); //get the id from the router

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(`${updateTaskStateApi}/${id}`, data, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          nav("/dashboard/tasks");
        }
      });
  };
  return (
    <div className="continer">
      <h2 className="login-title">Update Task Stats</h2>
      <form onSubmit={onSubmitHandler} className="login-form">
        <input
          onChange={onChangeHandler}
          value={data.stats}
          placeholder="new stats "
          name="stats"
          type="text"
          required
        />

        <button type="submit" className="submit">
          Update
        </button>
      </form>
    </div>
  );
}
