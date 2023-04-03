import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/all/home/home";
import Dashboard from "./pages/admins/Dashboard.jsx";
import Login from "./pages/all/auth/Login";
import Register from "./pages/all/auth/Register";
import Event from "./pages/admins/events/events_table";
import User from "./pages/admins/users/users_table";
import Complaint from "./pages/admins/plaintes/plainte_table";
import AddComplaint from "./pages/clients/complaints/complaint";
import AddEvent from "./components/admins/addEvent";
import AddBadge from "./pages/admins/badge/addBadge";
import AttribBadge from "./pages/admins/badge/attribBadge";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { getUser } from "./actions/user.actions";
import { UidContext } from "./utils/appContext";


function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setUid(res.data);
        })
        .catch((err) => {
          console.log("No Token");
        });
    };
    fetchToken();

    if (uid) {
      dispatch(getUser(uid));
    }
  }, [uid, dispatch]);
  return (
    <>
      <UidContext.Provider value={uid}>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/events" element={<Event />} />
              <Route path="/users" element={<User />} />
              <Route path="/complaints" element={<Complaint />} />
              <Route path="/addBadge/:id" element={<AddBadge />} />
              <Route path="/attribBadge/:id" element={<AttribBadge />} />
              <Route path="/complaints/add" element={<AddComplaint />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addEvent" element={<AddEvent />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UidContext.Provider>
    </>
  );
}

export default App;
