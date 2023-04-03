import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../components/appContext";
import LeftNav from "../components/leftNav";
import { isEmpty } from "../components/Utils";
import Card from "../components/Post/Card";
import Trends from "../components/Trends";
import FriendsHint from "../components/Profil/FriendsHint";

const Trending = () => {
  const uid = useContext(UidContext);
  const trendList = useSelector((state) => state.trendingReducer);
  return (
    <div className="trending-page">
      <LeftNav /> 
      <div className="main">
        <ul>
          {!isEmpty(trendList[0])
            ? trendList[0].map((post) => <Card post={post} key={post._id} />)
            : null}
        </ul>
      </div>
      <div className="right-side">
        <div className="ritgh-side-container">
          <Trends />
          {uid && <FriendsHint />}
        </div>
      </div>
    </div>
  );
};

export default Trending;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { isEmpty } from "./Utils";
// import { getTrends } from "../actions/post.action";
// import { NavLink } from "react-router-dom";

// const Trends = () => {
//   const posts = useSelector((state) => state.allPostReducer);
//   const usersData = useSelector((state) => state.usersReducer);
//   const trendList = useSelector((state) => state.trendingReducer);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!isEmpty(posts.post)) {
//       const postArray = Object.keys(posts).map((i) => posts[i]);
//       let sortedArray = postArray.sort((a, b) => {
//         return b.likers.length - a.likers.length;
//       });
//       sortedArray.length = 3;
//       dispatch(getTrends(sortedArray));
//     }
//     console.log(trendList[0]);

//   }, [posts, dispatch]);

//   return (
//     <div className="trending-container">
//       <h4>Trending</h4>
//       <NavLink to="/trending">
//         <ul>
//           {trendList.length &&
//             trendList[0].map((post) => {
              
//               return (
//                 <li key={post._id}>
//                   <div>
//                     {post.image && <img src={post.image} alt="post-pic" />}
//                     {post.video && (
//                       <iframe
//                         src={post.video}
//                         frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                         title={post._id}
//                       ></iframe>
//                     )}
//                     {isEmpty(post.image) && isEmpty(post.video) && (
//                       <img
//                         src={
//                           isEmpty(usersData[0])
//                             ? usersData.users
//                                 .map((user) => {
//                                   if (user._id === post.posterId)
//                                     return user.picture;
//                                   else return null;
//                                 })
//                                 .join("")
//                             : null
//                         }
//                         alt="profil-pic"
//                       />
//                     )}
//                   </div>
//                   <div className="trend-content">
//                     <p> {post.text} </p>
//                     <span>Lire</span>
//                   </div>
//                 </li>
//               );
//             })}
//         </ul>
//       </NavLink>
//     </div>
//   );
// };

// export default Trends;