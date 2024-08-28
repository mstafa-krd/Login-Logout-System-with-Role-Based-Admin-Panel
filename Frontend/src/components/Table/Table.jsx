import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";

Table.propTypes = {
  title: PropTypes.string,
  thirdth: PropTypes.string,
  fourthth: PropTypes.string,
  tableType: PropTypes.string,
  onClickFun: PropTypes.any,
  data: PropTypes.array,
};

export default function Table(props) {
  const { user } = useContext(UserContext);

  let filteredUserData;
  // Filter the data as needed
  if (props.tableType === "users") {
    filteredUserData = props.data?.filter((item) => item.email !== user.email);
  } else if (props.tableType === "teams") {
    filteredUserData = props.data?.filter(
      (item) => item.role === "normal-user"
    );
    if (user.role === "manager") {
      filteredUserData = props.data?.filter(
        (item) => item.manager === user.name
      );
    } else if (user.role === "normal-user") {
      filteredUserData = props.data?.filter(
        (item) => item.manager === user.manager
      );
    }
  } else if (props.tableType === "tasks") {
    if (user.role === "manager") {
      filteredUserData = props.data?.filter(
        (item) => item.manager === user.email
      );
    } else if (user.role === "normal-user") {
      filteredUserData = props.data?.filter(
        (item) => item.email === user.email
      );
    } else {
      filteredUserData = props.data;
    }
  }
  useEffect(() => {}, [props.data, user, filteredUserData]);

  return (
    <div className="continer">
      <h2 className="login-title">
        {user.role === "manager" ||
        (user.role === "normal-user" && props.tableType !== "tasks") ? (
          <span>Your Team</span>
        ) : (
          props.title
        )}
      </h2>

      <table className="zebra-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>{props.thirdth}</th>
            <th>{props.fourthth}</th>
            {user.role !== "manager" && <th>Action</th>}
            {props.tableType === "tasks" && user.role === "manager" && (
              <th>Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredUserData?.length === 0 ? (
            props.tableType === "users" || props.tableType === "teams" ? (
              null
            ) : null
          ) : props.tableType === "users" || props.tableType === "teams" ? (
            filteredUserData?.map((item, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                {props.tableType === "users" ? (
                  <td>{item.role}</td>
                ) : (
                  <td>{item.manager}</td>
                )}

                {item.role === "super-admin" && user.role !== "super-admin" ? (
                  <td className="table-action-section">
                    <span style={{ cursor: "default" }}>No Action</span>
                  </td>
                ) : (
                  user.role !== "manager" && (
                    <td className="table-action-section">
                      {user.role !== "normal-user" ? (
                        <Link
                          to={
                            props.tableType === "users"
                              ? `/dashboard/updateuser/${item._id}`
                              : `/dashboard/team/${item._id}`
                          }
                        >
                          <FontAwesomeIcon color="green" icon={faPenToSquare} />
                        </Link>
                      ) : (
                        <span>No Action</span>
                      )}
                      {props.tableType === "users" && (
                        <span onClick={() => props.onClickFun(item._id)}>
                          <FontAwesomeIcon color="red" icon={faTrash} />
                        </span>
                      )}
                    </td>
                  )
                )}
              </tr>
            ))
          ) : props.tableType === "tasks" ? (
            filteredUserData?.map((item, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{item.name}</td>
                <td>{item.discrption}</td>
                <td>{item.stats}</td>
                <td className="table-action-section">
                  <Link to={`/dashboard/task/${item._id}`}>
                    <FontAwesomeIcon color="green" icon={faPenToSquare} />
                  </Link>
                  {user.role !== "normal-user" && (
                    <span onClick={() => props.onClickFun(item._id)}>
                      <FontAwesomeIcon color="red" icon={faTrash} />
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : null}
        </tbody>
      </table>
      {filteredUserData?.length === 0 && <h2 className="no-data">No Data</h2>}
    </div>
  );
}
