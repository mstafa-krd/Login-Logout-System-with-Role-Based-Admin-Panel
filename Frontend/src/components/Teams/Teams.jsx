import axios from "axios";
import Table from "../Table/Table";
import {  getAllUsersApi } from "../../api/userApi";
import { useEffect, useState } from "react";

export default function Teams() {
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



  return (
    <div>
      <Table
        title="Teams"
        thirdth="Email"
        fourthth="Manager"
        tableType="teams"
        data={data}
      />
    </div>
  );
}
