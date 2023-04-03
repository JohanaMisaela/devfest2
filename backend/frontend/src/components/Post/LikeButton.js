import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../appContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.action";

const LikeButton = ({ post }) => {
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
        <>
        { post.isPlainte ?
        <Popup
          trigger={<img src="" alt="vote" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
        <div> Connectez-vous pour voter un sondage ! </div>
        </Popup>
        :
        <Popup
        trigger={<img src="./img/icons/heart.svg" alt="like" />}
        position={["bottom center", "bottom right", "bottom left"]}
        closeOnDocumentClick
      >
      <div> Connectez-vous pour aimez un post ! </div>
      </Popup>
      }</>
          
      )}
      {uid && liked === false && (
        <>
        { post.isPlainte ? 
          <img src="" alt="vote" onClick={like} /> : 
          <img src="./img/icons/heart.svg" alt="like" onClick={like} />}
        </>
      )}
      {uid && liked && (
        <>
        { post.isPlainte ? 
          <img
            alt="unvote"
            onClick={unlike} />
            : 
            <img
            src="./img/icons/heart-filled.svg"
            alt="unlike"
            onClick={unlike} />
          }
        </>
      )}
      <span> {post.likers ? post.likers.length : 0} </span>
    </div>
  );
};

export default LikeButton;
