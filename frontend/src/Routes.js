import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./component/Login/Login.jsx";
import Register from "./component/Register/Register.jsx";
import AdminDashboard from "./component/AdminDashboard/AdminDashboard.jsx";
import UserDashboard from "./component/UserDashboard/UserDashboard.jsx";
import AddTask from "./component/Addtask/AddTask.jsx";
function ProjectRouter() {
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Admin Routes */}
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/AddTask" element={<AddTask />} />
            {/* USer Routes */}
            <Route path="/userdashboard" element={<UserDashboard />} />
        </Routes>
    );
}
export default ProjectRouter;
