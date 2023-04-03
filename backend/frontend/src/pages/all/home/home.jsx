import { NavLink } from "react-router-dom";
import "../../../assets/index.css";
import b1 from "./../../../assets/bird1.png";
import b2 from "./../../../assets/bird2.png";
import fo from "./../../../assets/forest.png";
import ro from "./../../../assets/rocks.png";
import wa from "./../../../assets/water.png";
import { useEffect } from "react";

function App() {
  const text = document.getElementById("text");
  const bird1 = document.getElementById("bird1");
  const bird2 = document.getElementById("bird2");
  const btn = document.getElementById("btn");
  const rocks = document.getElementById("rocks");
  const forest = document.getElementById("forest");
  const water = document.getElementById("water");
  const header = document.getElementById("header");

  const scroll = () => {
    const value = window.scrollY;
    text.style.top = 50 + value * -0.5 + "%";
    bird1.style.top = value * -1.5 + "px";
    bird1.style.left = value * 2 + "px";
    bird2.style.top = value * -1.5 + "px";
    bird2.style.top = value * -5 + "px";
    btn.style.marginTop = value * 1.5 + "px";
    rocks.style.top = value * -0.12 + "px";
    forest.style.top = value * 0.25 + "px";
    header.style.top = value * -0.5 + "px";
  };
  window.addEventListener("scroll", scroll);
  return (
    <>
      <div className="App">
        <div>
          <header id="header">
            <a className="logo">
              <NavLink activeClassName="active" to={`/`}>
                HeinFor
              </NavLink>
            </a>
            <ul>
              <li>
                <a href="" className="active">
                  <NavLink activeClassName="active" to={`/`}>
                    Accueil
                  </NavLink>
                </a>
              </li>
              <li>
                <a href="#sec">
                  <NavLink activeClassName="active" to={`/events`}>
                    Evènnement
                  </NavLink>
                </a>
              </li>
              <li>
                <a href="">Contact</a>
              </li>
            </ul>
          </header>
        </div>
        <div id="section">
          <h2 id="text">
            <span>Ensemble Changeons </span>
            <br /> Le Monde
          </h2>

        <img src={b1} id="bird1" />
        <img src={b2} id="bird2" />
        <img src={fo} id="forest" />
        <NavLink to={"/login"} id="btn">Log in</NavLink>
        <img src={ro} id="rocks" />
        <img src={wa} id="water" />
      </div>
      <div className="sec">
      <h2 id="text">
            <span> </span>
            <br /> Le-saviez vous?
          </h2>
        
        <p id="texte"><span>
        Nous sommes tous <b>responsables</b> de la pollution de l'environement.
        Les polluants proviennent majoritairement des nos activités. 
        </span>
        </p>
        <p id="text">
          Et seulement nous peuvent y remedier <b>Agisons ensemble</b>Changeons le monde!
        </p>
      </div>
    </div></>
  );
}

export default App;
