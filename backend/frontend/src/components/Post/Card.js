import React, { useEffect, useState } from "react";
import { dateParsers, isEmpty } from "../Utils";
import { useDispatch, useSelector } from "react-redux";
import FollowHandler from "../Profil/FollowHandler";
import LikeButton from "./LikeButton";
import { updatePost } from "../../actions/post.action";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";
import VoteButton from "./VoteBtn";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [bol, setbol] = useState(Boolean);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setTShowComments] = useState(false);

  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData.users)
                  ? usersData.users
                      .map((user) => {
                        if (user._id === post.posterId) return user.picture;
                        else return null;
                      })
                      .join("")
                  : null
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData.users)
                    ? usersData.users.map((user) => {
                        if (user._id === post.posterId) return user.name;
                        else return null;
                      })
                    : null}
                </h3>
                {post.posterId !== userData._id && (
                  <FollowHandler id={post.posterId} type="card" />
                )}
              </div>
              <span>
                {" "}
                {dateParsers(post.createdAt)} <br />{" "}
              </span>
              <br />
              {post.isPlainte ? "Sondage" : "Publication"}
            </div>
            {isUpdated === false ? (
              <p> {post.text} </p>
            ) : (
              <div className="update-post">
                <textarea
                  value={textUpdate}
                  onChange={(e) => setTextUpdate(e.target.value)}
                >
                  {" "}
                </textarea>
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    {" "}
                    Valider la modification
                  </button>
                </div>
              </div>
            )}

            {post.image && (
              <img src={post.image} alt={post.image} className="card-pic" />
            )}
            {post.video && (
              <iframe
                src={post.video}
                width="500"
                height="300"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
                frameBorder="0"
              ></iframe>
            )}

            <>
              {userData._id === post.posterId && (
                <div className="button-container">
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <img src="./img/icons/edit.svg" alt="edit" />
                  </div>
                  <DeleteCard post={post._id} />
                </div>
              )}

              <div className="card-footer">
                <div className="comment-icon">
                  <img
                    src="./img/icons/message1.svg"
                    onClick={() => setTShowComments(!showComments)}
                    alt="comment"
                  />
                  <span> {post.comments.length} </span>
                </div>
                <LikeButton post={post} />
                {/* {!post.isPlainte ? (
                  ''
                ) : (
<<<<<<< HEAD
                  <VoteButton post={post}/>
                )}
=======
                  <input type="radio" value={() => setbol(!bol)} />
                )} */}
>>>>>>> b538b43a257e4c7b8f9c7fcd1d4a005bc80f1c46
                <img src="./img/icons/share.svg" alt="share " />
              </div>
              {showComments && <CardComments post={post} />}
            </>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
