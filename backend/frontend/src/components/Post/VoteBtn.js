import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../appContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.action";

const VoteButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.likers && post.likers !== null) {
      if (post.likers.includes(uid)) setLiked(true);
      else setLiked(false);
    }
  }, [uid, post.likers, liked]);

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
  };

  return (
    <div className="like-container">
      {uid === null && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div> Connectez-vous pour aimez un post ! </div>
        </Popup>
      )}
      {uid && liked === false && (
        <span style={{backgroundColor: "green", color: "white", borderRadius: "50%", padding: "2px 5px ", marginRight: 250+"px", marginLeft: "-45px",cursor: "pointer"}} onClick={like}><i class="material-icons ">check</i></span>
      )}
      {uid && liked && (
        <>
        <span style={{backgroundColor: "red", color: "white", borderRadius: "50%", padding: "2px 5px ",marginRight: 250+"px", marginLeft: "-45px", cursor: "pointer"}} onClick={unlike}><i class="material-icons ">close</i></span>

        </>
      )}
      <span> {post.likers ? post.likers.length : 0} </span>
    </div>
  );
};

export default VoteButton;
