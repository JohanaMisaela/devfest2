import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [firstname, setFirstname] = useState("");
  let [quartier, setQuartier] = useState("");
  let [sexe, setSexe] = useState();
  let [pwd, setpwd] = useState();
  let [pwd_confirmed, setpwdConfirmed] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, firstname, sexe, quartier, email, pwd };
    //   console.log(data);
    const res = await axios({
      method: "POST",
      url: `http://localhost:5000/api/user/signup`,
      data: data,
    });
    console.log("data", res.data);
    console.log("status", res.status);

    if (res.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Logged successfully",
        showConfirmButton: true,
      });
      navigate("/dashboard");
    }
    if (res.status === 200) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        // text: 'Bad credentials!',
        text: res.data.message,
      });
    }
  };

  return (
    <>
      <NavLink to={"/"}>Revenir</NavLink>
      <form action="#" method="post" onSubmit={handleSubmit}>
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: 1 + "rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: 1 + "rem" + 0 + 0 + 1 + "rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <div>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <span className="h1 fw-bold mb-0">
                            <img
                              alt=""
                              className="img-fluid mr-5"
                              style={{ width: 100 + "px" }}
                            />
                          </span>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: 1 + "px" }}
                        >
                          Créer un compte
                        </h5>

                        <div className="form-outline mb-4">
                          <input
                            name="login"
                            type="Name"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            placeholder="Nom"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            name="login"
                            type="Name"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            placeholder="Prenom"
                            required
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            name="login"
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            placeholder="Addresse email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <select
                            name="status"
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            value={sexe}
                            onChange={(e) => setSexe(e.target.value)}
                          >
                            <option value="">Sexe</option>
                            <option value={0}>Feminin</option>
                            <option value={1}>Masxulin</option>
                          </select>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            name="login"
                            type="Name"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            placeholder="Quartier"
                            required
                            value={quartier}
                            onChange={(e) => setQuartier(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            name="pwd"
                            type="pwd"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            placeholder="Mot de passe"
                            required
                            value={pwd}
                            onChange={(e) => setpwd(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            name="pwd"
                            type="pwd"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            placeholder="Confirmer votre mot de passe"
                            required
                            value={pwd_confirmed}
                            onChange={(e) => setpwdConfirmed(e.target.value)}
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                            name="connect"
                          >
                            S'inscrire
                          </button>
                        </div>

                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Vous avez déja un compte?
                          <NavLink to={"/login"} className="text-info">
                            Se connecter
                          </NavLink>
                        </p>
                        <a href="#!" className="small text-muted">
                          Bienvenu à ***** .
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Register;
