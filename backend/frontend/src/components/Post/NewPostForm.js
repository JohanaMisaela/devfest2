import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPosts, getPosts } from "../../actions/post.action";
import { isEmpty, timestampParser } from "../Utils";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPisture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const errors = useSelector((state) => state.errorReducer.postError);
  const dispatch = useDispatch();

  const handlePicture = (e) => {
    // prevision d'img
    setPostPisture(URL.createObjectURL(e.target.files[0]));
    // envoyer du file vers bd
    setFile(e.target.files[0]);
    console.log(file);
    setVideo("");
  };

  const handlePost = async () => {
    if (message || postPicture || video) {
      console.log(userData);
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("isEvent", userData.status ? 1 : 0);
      data.append("type", "formation");
      data.append("text", message);
      data.append("isPlainte", !userData.status ? 1 : 0);
      data.append("quartier", userData.quartier);
      if (file) data.append("file", file);
      data.append("video", video);
      console.log('data',data);
      await dispatch(addPosts(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Veuillez entrer un message !");
    }
  };

  const cancelPost = () => {
    setMessage("");
    setVideo("");
    setPostPisture("");
    setFile("");
  };

  const handleVideo = useCallback(() => {
    let findLink = message.split(" ");
    for (let i = 0; i < findLink.length; i++) {
      if (
        findLink[i].includes("https://www.yout") ||
        findLink[i].includes("https://yout")
      ) {
        let embed = findLink[i].replace("watch?v=", "embed/ "); //lire hors de youtube
        setVideo(embed.split("&")[0].split(" ").join(""));
        findLink.splice(i, 1); //hide link video
        setMessage(findLink.join(" "));
        setPostPisture("");
      }
    }
  }, [message]);

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
    handleVideo();
  }, [userData, message, video, handleVideo]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            <p>
              <span>
                {" "}
                {userData.following ? userData.following.length : 0}{" "}
              </span>
              Abonnement
              {userData.following && userData.following.length > 1 ? "s" : ""}
            </p>
            <p>
              <span>
                {" "}
                {userData.followers ? userData.followers.length : 0}{" "}
              </span>
              Abonné
              {userData.followers && userData.followers.length > 1 ? "s" : ""}
            </p>
          </div>
          <NavLink to="/profil">
            <div className="user-info">
              <img src={userData.picture} alt="user-pic" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            ></textarea>
            {message || postPicture || video.length > 20 ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.picture} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="pesudo">
                    <h3> {userData.pseudo} </h3>
                  </div>
                  <span> {timestampParser(Date.now())} </span>
                  <div className="content">
                    <p> {message} </p>
                    <img src={postPicture} alt="" />
                    {video && (
                      <>
                        <iframe
                          src={video}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
                          allowFullScreen
                          title={video}
                        ></iframe>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {isEmpty(video) && (
                  <>
                    <img src="./img/icons/picture.svg" alt="img" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )}
                {video && (
                  <button onClick={() => setVideo("")}>Supprimer video</button>
                )}
              </div>
              {!isEmpty(errors.format) && <p> {errors.format} </p>}
              {!isEmpty(errors.maxSize) && <p> {errors.maxSize} </p>}
              <div className="btn-send">
                {message || postPicture || video.length > 20 ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
