import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.action";
import FollowHandler from "../Profil/FollowHandler";
import { isEmpty, timestampParser } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";

const CardComments = ({ post }) => {
  const [text, setTex] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComments = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo))
        .then(() => dispatch(getPosts()))
        .then(() => setTex(""));
    }
  };

  return (
    <div className="comments-container">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="left-part">
              <img
                src={
                  isEmpty(usersData[0])
                    ? usersData.users
                        .map((user) => {
                          if (user._id === comment.commenterId)
                            return user.picture;
                          else return null;
                        })
                        .join("")
                    : null
                }
                alt="commenter-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3> {comment.commenterPseudo} </h3>
                  {comment.commenterId !== userData._id && (
                    <FollowHandler
                      type="card"
                      idToFollow={comment.commenterId}
                    />
                  )}
                </div>
                <span> {timestampParser(comment.timestamp)} </span>
              </div>
              <p> {comment.text} </p>
              <EditDeleteComment comment={comment} postId={post._id} />
            </div>
          </div>
        );
      })}
      {userData._id && (
        <form action="" onSubmit={handleComments} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setTex(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire "
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
};

export default CardComments;
