import React, { useState } from "react";
import SignInForm from "../Log/SignInForm";
import SignUpForm from "../Log/SignUpForm";
const Log = (props) => {
  const [SignUpModal, setSignUpModal] = useState(props.signup);
  const [SignInModal, setSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else {
      setSignInModal(true);
      setSignUpModal(false);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            className={SignUpModal ? "active-btn" : null}
            onClick={handleModals}
            id="register"
          >
            S'inscrire
          </li>
          <li
            className={SignInModal ? "active-btn" : null}
            onClick={handleModals}
            id="login"
          >
            Se connecter
          </li>
        </ul>
        {SignUpModal && <SignUpForm />}
        {SignInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;
