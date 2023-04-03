import { NavLink } from "react-router-dom";
import "./../styles/pages/index.css";
import b1 from "./../styles/assets/img/bird1.png";
import b2 from "./../styles/assets/img/bird2.png";
import fo from "./../styles/assets/img/forest.png";
import ro from "./../styles/assets/img/rocks.png";
import wa from "./../styles/assets/img/water.png";
import { UidContext } from "./../components/appContext";
import { useSelector } from "react-redux";
import React, { useContext } from "react";
import Carousel from "../components/carousel/Carousel";


function Acceuil() {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
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
       
        <div id="section">
          <h2 id="text">
            <span>Ensemble Changeons </span>
            <br /> Le Monde
          </h2>

          <img src={b1} id="bird1" />
          <img src={b2} id="bird2" />
          <img src={fo} id="forest" />
          {uid ? null : 
          (
            <NavLink to={"/login"} id="btn">
              Log in
            </NavLink>
          )
          
          }
          
          <img src={ro} id="rocks" />
          <img src={wa} id="water" />
        </div>
        <div className="sec">
        <h2 id="text" style={{textAllign:"center"}}>
            <span> </span>
            <br /> Le - saviez vous?
          </h2>
        
        <p style={{textAlign:"center"}}><span><br/>
        Nous sommes tous <b>responsables</b> de la pollution de l'environement.<br/>
        Les polluants proviennent majoritairement des nos activités. 
        </span>
        </p>
        <p style={{textAlign:"center"}}>
          Et seulement nous peuvent y remedier <b> Agisons ensemble
            </b><br/><h1>Changeons le monde!</h1>
        </p>
          <Carousel />
        </div>
      </div>
    </>
  )
}

export default Acceuil
