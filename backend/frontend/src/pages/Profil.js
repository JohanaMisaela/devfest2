import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/appContext";
import UpdateProfil from "../components/Profil/updateProfil";

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-conainer">
            <img src="./img/log.svg" alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
