import React from 'react';
import {Link} from 'react-router-dom';

function NavBar() {
    return (
            <nav>
    <div className="nav-wrapper" style={{backgroundColor:'black'}}>
      <Link to="/main" className="logo">My own Game</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/">Вернуться в реальность</Link></li>
        <li><Link to="/register">Получить допуск к игре</Link></li>
        <li><Link to="/login">Войти в игру</Link></li>
      </ul>
    </div>
  </nav>
    );
}

export default NavBar;