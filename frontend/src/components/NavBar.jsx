import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AUTH_LOGOUT } from '../store/auth/actionsTypes';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  console.log(user);
  const hendlerLogout = useCallback(() => {
    fetch('/auth/logout', {})
      .then((data) => data.json())
      .then((data) => {
        dispatch({ type: AUTH_LOGOUT, payload: {} });
        navigate('/');
      });
  });

  return (
    <nav>
      <div className="nav-wrapper" style={{ backgroundColor: 'black' }}>
        <Link to="/" className="logo" style={{ fontSize: '30px' }}>
          My own Game
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {user.login ? (
            <>
              <li>
                <Link to="/profile">{user.login}</Link>
              </li>
              <li>
                <Link to="/score">Рейтинг</Link>
              </li>
              <li>
                <a onClick={hendlerLogout}>Вернуться в реальность</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/auth/register">Получить допуск к игре</Link>
              </li>
              <li>
                <Link to="/auth/login">Войти в игру</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
