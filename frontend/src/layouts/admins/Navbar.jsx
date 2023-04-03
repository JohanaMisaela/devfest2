import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
function Navbar() {
   return (
    <>
     <nav>
  <ul>
    <li><Link to={'/dashboard'}>Acceuil</Link></li>
    <li><Link to={'/events'}>Evenements</Link></li>
    <li><Link to={'/complaints'}>Plaintes</Link></li>
    <li><Link to={''}>Badges</Link></li>
    <li><Link to={''}>Crédits</Link></li>
    <li><Link to={''}>Déconnexion</Link></li>
  </ul>
</nav>
<div className='espace'>

</div>
    </>
  )
}

export default Navbar
