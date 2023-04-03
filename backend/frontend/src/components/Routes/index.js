import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import Navbar from "../Navbar";
import Acceuil from "../../pages/Acceuil";
import Event from "../../pages/admins/events/events_table";
import User from "../../pages/admins/users/users_table";
import Complaint from "../../pages/admins/plaintes/plainte_table";
import AddComplaint from "../../pages/clients/complaints/complaint";
import AddBadge from "../../pages/admins/badge/addBadge";
import AttribBadge from "../../pages/admins/badge/attribBadge";
const index = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Acceuil />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="*" element={<Home />} />
        <Route path="/events" element={<Event />} />
        <Route path="/users" element={<User />} />
        <Route path="/complaints" element={<Complaint />} />
        <Route path="/addBadge/:id" element={<AddBadge />} />
        <Route path="/attribBadge/:id" element={<AttribBadge />} />
        <Route path="/complaints/add" element={<AddComplaint />} />
      </Routes>
    </Router>
  );
};

export default index;
