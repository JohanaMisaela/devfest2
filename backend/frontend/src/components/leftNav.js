import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const LeftNav = () => {
  const [isActiveHome, setIsActiveHome] = useState(false);
  const [isActiveTrending, setIsActiveTrending] = useState(false);
  const [isActiveProfil, setIsActiveProfil] = useState(false);
  useEffect(() => {
    if (window.location.href === "http://localhost:3000/") {
      setIsActiveHome(true);
    }
    if (window.location.href === "http://localhost:3000/profil") {
      setIsActiveProfil(true);
    }
    if (window.location.href === "http://localhost:3000/trending") {
      setIsActiveTrending(true);
    }
  }, []);
  return (
    <div className="left-nav-container">
      {/* <div className="icons">
        <div className="icons-bis">
          <NavLink to="/" className={isActiveHome ? "active-left-nav" : ""}>
            <img src="./img/icons/home.svg" alt="home" />
          </NavLink>
          <br />
          <NavLink
            to="/trending"
            className={isActiveTrending ? "active-left-nav" : ""}
          >
            <img src="./img/icons/rocket.svg" alt="trending" />
          </NavLink>
          <br />
          <NavLink
            to="/profil"
            className={isActiveProfil ? "active-left-nav" : ""}
          >
            <img src="./img/icons/user.svg" alt="profil" />
          </NavLink>
        </div>
      </div> */}
    </div>
  );
};

export default LeftNav;
