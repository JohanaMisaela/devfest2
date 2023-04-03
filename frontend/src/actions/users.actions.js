import axios from "axios";

export const GTE_USRERS = "GET_USERS";

export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user`)
      .then((res) => dispatch({ type: GTE_USRERS, payload: res.data }))
      .catch((err) => console.log(err));
  };
};
