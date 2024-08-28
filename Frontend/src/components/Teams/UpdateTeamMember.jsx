import axios from "axios";
import { useState } from "react";
import { updateTeamMemberApi } from "../../api/userApi";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateTeamMember() {
  const [data, setData] = useState({
    manager: "",
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
      .put(`${updateTeamMemberApi}/${id}`, data, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          nav("/dashboard/team");
        }
      });
  };
  return (
    <div className="continer">
      <h2 className="login-title">Update Manager</h2>
      <form onSubmit={onSubmitHandler} className="login-form">
        <input
          onChange={onChangeHandler}
          value={data.manager}
          placeholder="new manager "
          name="manager"
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
