import { Link } from "react-router-dom";

import "./userTasks.css";
import Table from "../Table/Table";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { deleteTaskApi, getAllTasksApi } from "../../api/taskApi";
import { UserContext } from "../../context/userContext";

export default function UserTasks() {
  const [data, setData] = useState();
  const { user } = useContext(UserContext);

  const getTasks = () => {
    axios
      .get(getAllTasksApi, { withCredentials: true })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getTasks();
  }, []);
  const onClickHandler = async (id) => {
    try {
      const res = await axios.delete(`${deleteTaskApi}/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        getTasks();
        return res.json;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <Table
          title="Tasks"
          thirdth="Discription"
          fourthth="stats"
          tableType="tasks"
          data={data}
          onClickFun={onClickHandler}
        />
      </div>
      {user.role !== "normal-user" && (
        <Link to={"/dashboard/addtask"} className="submit addtask-button">
          Add new task
        </Link>
      )}
    </div>
  );
}
