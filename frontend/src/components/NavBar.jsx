import React from 'react';
import {Link} from 'react-router-dom';

function NavBar() {
    return (
            <nav>
    <div className="nav-wrapper">
      <Link to="/main" className="brand-logo">My own Game</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="sass.html">Sass</Link></li>
        <li><Link to="badges.html">Components</Link></li>
        <li><Link to="collapsible.html">JavaScript</Link></li>
      </ul>
    </div>
  </nav>
    );
}

export default NavBar;