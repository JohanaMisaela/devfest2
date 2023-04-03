import React from 'react'
import facebook from './../assets/logo/facebook.png'
import instagram from './../assets/logo/instagram.png'
import twitter from './../assets/logo/twitter.png'
import linkedin from './../assets/logo/linkedin.png'
import github from './../assets/logo/github.png'
import google from './../assets/logo/google.png'

function Footer() {
  return (
    <>
     {/* <!-- Footer --> */}
<footer className="bg-dark text-center text-white">
  {/* <!-- Grid container --> */}
  <div className="container p-4">
    {/* <!-- Section: Social media --> */}
    <section className="mb-4 ml-3">
      {/* <!-- Facebook --> */}
      <a className="mr-3" href="#!" role="button"
        ><img src={facebook} /></a>

      {/* <!-- Twitter --> */}
      <a className="mr-3" href="#!" role="button"
        ><img src={twitter} /></a>
      
      {/* <!-- Instagram --> */}
      <a className="mr-3" href="#!" role="button"
        ><img src={instagram} /></a>

      {/* <!-- Google --> */}
      <a className="mr-3" href="#!" role="button"
        ><img src={google} /></a>

      {/* <!-- Linkedin --> */}
      <a className="mr-3" href="#!" role="button"
        ><img src={linkedin} /></a>

      {/* <!-- Github --> */}
      <a className="mr-3" href="#!" role="button"
        ><img src={github} /></a>
    </section>
    {/* <!-- Section: Social media --> */}

    {/* <!-- Section: Form --> */}
    <section className="">
      <form action="">
        {/* <!--Grid row--> */}
        <div className="row d-flex justify-content-center">
          {/* <!--Grid column--> */}
          <div className="col-auto">
            <p className="pt-2">
              <strong>Abonnez-vous</strong>
            </p>
          </div>
          {/* <!--Grid column--> */}

          {/* <!--Grid column--> */}
          <div className="col-md-5 col-12">
            {/* <!-- Email input --> */}
            <div className="form-outline form-white mb-4">
              <input type="email" id="form5Example21" className="form-control" placeholder='Adresse email'/>
            </div>
          </div>
          {/* <!--Grid column--> */}

          {/* <!--Grid column--> */}
          <div className="col-auto">
            {/* <!-- Submit button --> */}
            <button type="submit" className="btn btn-outline-light mb-4">
              Subscribe
            </button>
          </div>
          {/* <!--Grid column--> */}
        </div>
        {/* <!--Grid row--> */}
      </form>
    </section>
    {/* <!-- Section: Form --> */}

    {/* <!-- Section: Text --> */}
    <section className="mb-4">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum
        repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam
        eum harum corrupti dicta, aliquam sequi voluptate quas.
      </p>
    </section>
    {/* <!-- Section: Text --> */}

    {/* <!-- Section: Links --> */}
    <section className="">
      {/* <!--Grid row--> */}
      <div className="row">
        {/* <!--Grid column--> */}
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase">Links</h5>

          <ul className="list-unstyled mb-0">
            <li>
              <a href="#!" className="text-white">Link 1</a>
            </li>
            <li>
              <a href="#!" className="text-white">Link 2</a>
            </li>
            <li>
              <a href="#!" className="text-white">Link 3</a>
            </li>
            <li>
              <a href="#!" className="text-white">Link 4</a>
            </li>
          </ul>
        </div>
        {/* <!--Grid column--> */}

        {/* <!--Grid column--> */}
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase">Links</h5>

          <ul className="list-unstyled mb-0">
            <li>
              <a href="#!" className="text-white">Link 1</a>
            </li>
            <li>
              <a href="#!" className="text-white">Link 2</a>
            </li>
            <li>
              <a href="#!" className="text-white">Link 3</a>
            </li>
            <li>
              <a href="#!" className="text-white">Link 4</a>
            </li>
          </ul>
        </div>
        {/* <!--Grid column--> */}

        {/* <!--Grid column--> */}
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase">Links</h5>

          <ul className="list-unstyled mb-0">
            <li>
              <a href="#!" className="text-white">Link 1</a>
            </li>
            <li>
              <a href="#!" className="text-white">Link 2</a>
            </li>
            <li>
              <a href="#!" className="text-white">Link 3</a>
            </li>
            <li>
              <a href="#!" className="text-white">Link 4</a>
            </li>
          </ul>
        </div>
        {/* <!--Grid column--> */}
{/*  */}
        {/* <!--Grid column--> */}
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase">Links</h5>

          <ul className="list-unstyled mb-0">
            <li>
              <a href="#!" className="text-white">Link 1</a>
            </li>
            <li>
              <a href="#!" className="text-white">Link 2</a>
            </li>
            <li>
              <a href="#!" className="text-white">Link 3</a>
            </li>
            <li>
              <a href="#!" className="text-white">Link 4</a>
            </li>
          </ul>
        </div>
        {/* <!--Grid column--> */}
      </div>
      {/* <!--Grid row--> */}
    </section>
    {/* <!-- Section: Links --> */}
  </div>
  {/* <!-- Grid container --> */}

  {/* <!-- Copyright --> */}
  <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
    © 2022 Copyright:
    <a className="text-white ml-1" href="https://github.com/devfest_2022">Devfest 2022--HeinFor</a>
  </div>
  {/* <!-- Copyright --> */}
</footer>
{/* <!-- Footer -->  */}
    </>
  )
}

export default Footer
