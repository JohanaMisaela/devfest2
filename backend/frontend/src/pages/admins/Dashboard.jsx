import React, { useEffect } from "react";
import Navbar from "../../layouts/admins/Navbar";
import PostItem from "./../../components/admins/postItem";
import AddPost from "./../../components/admins/addPost";
import * as AOS from "aos";
import "./../../assets/dashboard.css";
import Feuille from'./../../assets/feuilles.png'
function Dashboard() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    
    <div id="feuille">
      
      <div>
      <Navbar />
      
      <AddPost/>
      <section className="light">
	<div className="container py-2">
		<div className="h1 text-center text-dark" id="pageHeaderTitle"></div>

            <article className="postcard light blue">
              <a className="postcard__img_link" href="#">
                <img
                  className="postcard__img"
                  src="https://picsum.photos/1000/1000"
                  alt="Image Title"
                />
              </a>
              <div className="postcard__text t-dark">
                <h1 className="postcard__title blue">
                  <a href="#">Type de publication</a>
                </h1>
                <div className="postcard__subtitle small">
                  <span>Nom de la personne</span> <br />
                  <span>personne@gmail.com</span>
                </div>
                <div className="postcard__bar"></div>
                <div className="postcard__preview-txt">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi, fugiat asperiores inventore beatae accusamus odit
                  minima enim, commodi quia, doloribus eius! Ducimus nemo
                  accusantium maiores velit corrupti tempora reiciendis
                  molestiae repellat vero. Eveniet ipsam adipisci illo iusto
                  quibusdam, sunt neque nulla unde ipsum dolores nobis enim
                  quidem excepturi, illum quos!
                </div>
                <div className="postcard__subtitle small">
                  <time dateTime="2020-05-25 12:00:00">
                    <i className="fas fa-calendar-alt mr-2"></i>Mon, May 25th
                    2020
                  </time>
                </div>
                <ul className="postcard__tagbox">
                  <li className="tag__item play blue">
                    <a href="#">
                      <i className="fas fa-play mr-2"></i>J'aime
                    </a>
                  </li>
                  <li className="tag__item">
                    <a href="#">
                      <i className="fa-thin fa-comments mr-2"></i>Commentaire
                    </a>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
