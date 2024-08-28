import axios from "axios";
import Table from "../Table/Table";
import "./users.css";
import { deleteUserApi, getAllUsersApi } from "../../api/userApi";
import { useEffect, useState } from "react";

export default function Users() {
  const [data, setData] = useState();
  const getusers = () => {
    axios
      .get(getAllUsersApi, { withCredentials: true })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getusers();
  }, []);
  const onClickHandler = async (id) => {
    try {
      const res = await axios.delete(`${deleteUserApi}/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        getusers()
        return res.json;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Table
        title="Users"
        thirdth="Email"
        data={data}
        fourthth="role"
        tableType="users"
        onClickFun={onClickHandler}
      />
    </div>
  );
}
