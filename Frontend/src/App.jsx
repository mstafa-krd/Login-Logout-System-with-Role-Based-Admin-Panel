import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DashBoard from "./pages/Dashboard/DashBoard";
import Login from "./pages/Login/Login";
import Users from "./components/Users/Users";
import NewUser from "./components/NewUser/NewUser";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import Teams from "./components/Teams/Teams";
import UserTasks from "./components/userTasks/UserTasks";
import AddTasks from "./components/userTasks/AddTasks";
import Profile from "./pages/Profile/Profile";
import UpdateTeamMember from "./components/Teams/UpdateTeamMember";
import UpdateTaskStates from "./components/userTasks/UpdateTaskStates";
import ProtectedRoute from "./config/ProtectedRoutes";
import NotFound from "./pages/NotFound/NotFound";
import CheckAuth from "./config/CheckAuth";
import LoginRedicrect from "./config/LoginRedicrect";

function App() {
  return (
    <Routes>
      <Route element={<LoginRedicrect />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<CheckAuth />}>
        <Route path="dashboard" element={<DashBoard />}>
          <Route
            element={<ProtectedRoute allowedRoles={["super-admin", "admin"]} />}
          >
            <Route path="users" element={<Users />} />
            <Route path="newuser" element={<NewUser />} />
            <Route path="updateuser/:id" element={<UpdateUser />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                allowedRoles={["super-admin", "admin", "manager"]}
              />
            }
          >
            <Route path="addtask" element={<AddTasks />} />
            <Route path="team/:id" element={<UpdateTeamMember />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                allowedRoles={[
                  "super-admin",
                  "normal-user",
                  "admin",
                  "manager",
                ]}
              />
            }
          >
            <Route path="task/:id" element={<UpdateTaskStates />} />
            <Route path="team" element={<Teams />} />
            <Route path="tasks" element={<UserTasks />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Route>
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
