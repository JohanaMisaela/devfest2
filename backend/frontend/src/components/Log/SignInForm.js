import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        pwd: password,
      },
    })
      .then((res) => {
        console.log(res);
        // if (res.data.errors) {
        //   emailError.innerHTML = res.errors.email;
        //   passwordError.innerHTML = res.errors.password;
        // } else {
        window.location = "/home";
        // }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data) {
          emailError.innerHTML = err.response.data.errors.email;
          passwordError.innerHTML = err.response.data.errors.password;
        }
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <br/>
      <br/>
      <br/>
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
