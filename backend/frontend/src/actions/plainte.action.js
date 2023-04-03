import axios from "axios";

export const GET_PLAINTES = "GET_PLAINTES";

export const getplaintes = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/plainte/`)
      .then((res) => {
        // console.log("action", res);
        //  const array = res.data.post.slice(0, num);
        dispatch({ type: GET_PLAINTES, payload: res.data });
      });
  };
};
