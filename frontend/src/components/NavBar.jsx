import React from 'react';
import {Link} from 'react-router-dom';

function NavBar({user}) {
    return (
            <nav>
    <div className="nav-wrapper" style={{backgroundColor:'black'}}>
      <Link to="/" className="logo" style={{fontSize:'30px'}}>My own Game</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      {user ?  (
      <>
        <li><Link to="/profile">{user.userName}</Link></li>
        <li><Link to="/score">Рейтинг</Link></li>
        <li><Link to="/">Вернуться в реальность</Link></li>
        </>
      ):(
        <>
        <li><Link to="/auth/register">Получить допуск к игре</Link></li>
        <li><Link to="/auth/login">Войти в игру</Link></li>
        </>
      )}
        </ul>
    </div>
  </nav>
    );
}

export default NavBar;