import { NavLink } from "react-router-dom";
import "../../../assets/index.css";
import b1 from "./../../../assets/bird1.png";
import b2 from "./../../../assets/bird2.png";
import fo from "./../../../assets/forest.png";
import ro from "./../../../assets/rocks.png";
import wa from "./../../../assets/water.png";
import { useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.css';

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
      <h2>Luttons contre la pollution.</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Assumenda, ducimus recusandae tenetur dolores culpa possimus?
          Odio deserunt atque assumenda ea? Praesentium in nobis deserunt vel?
          Eligendi maiores, officia, minima ducimus consequuntur impedit dicta
          libero eaque totam nostrum optio cum distinctio vitae voluptates
          deserunt nam sed velit laborum aliquid,<br /><br /> perferendis adipisci quod?
          Similique repellat tenetur culpa distinctio porro reprehenderit neque
          commodi odio, rerum eos expedita maxime provident autem ad numquam
          iste incidunt ipsam! Sit fugiat corrupti dolore aliquam eum nihil unde atque veritatis
          laudantium harum nostrum ex et ipsum cum expedita quia magnam laboriosam autem animi,
          esse fuga sed reiciendis adipisci. Perferendis a eum, sed repellat possimus numquam
          odio architecto veritatis, sapiente rem nihil dolores! Ullam quidem iste perferendis
          consequuntur ut hic nemo, amet esse non explicabo atque sequi blanditiis! Ab ducimus
          corporis fugit magni, vero sapiente ad dignissimos, doloribus expedita itaque officia,
          animi voluptatem veritatis! Porro atque labore, doloribus doloremque impedit laboriosam
          expedita sint!Voluptas maxime odio facere <br /><br /> inventore optio aspernatur, praesentium
          consequatur commodi assumenda tenetur accusamus vitae dolorem illo incidunt,
          accusantium sequi nemo recusandae blanditiis dolor alias dignissimos quam.
          Tempore placeat eveniet exercitationem in ipsam itaque a dolore delectus provident
          ipsa ullam atque temporibus officiis rerum qui dolores iure consequuntur doloribus
          ipsum voluptas, dolor quo! Labore explicabo dolorem maiores similique dignissimos a
          fugiat illo doloribus minus sit hic exercitationem eveniet eaque molestias corporis
          inventore tempore maxime quaerat ullam, dolore iure. At deleniti vero dolor error quo
          obcaecati sint molestias ad repellat velit enim quidem nam qui pariatur dolores minus,
          distinctio ipsam numquam, soluta quibusdam quisquam labore amet. Ipsum labore
          cum delectus adipisci quibusdam rerum, obcaecati beatae.
          <br /><br />

        </p>
      </div>
    </div>
    </>
  );
}

export default App;
