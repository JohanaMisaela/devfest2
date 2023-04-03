import React, { useContext } from "react";
import { UidContext } from "../components/appContext";
import LeftNav from "../components/leftNav";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/Log";
import Trends from "../components/Trends";
import FriendsHint from "../components/Profil/FriendsHint";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        {uid ? 
        <Thread />
        : null}
      </div>
      <div className="right-side">
      {uid ? 
      <div className="right-side-container">
          <div className="wrapper">
            <Trends />
         <div className="wrapper">
                <Trends />
             </div>
        </div>
      </div>
      :null}
      </div>  
    </div>
  );
};

export default Home;
