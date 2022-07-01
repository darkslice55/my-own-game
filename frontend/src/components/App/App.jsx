import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Main from '../Main';
import Register from '../Register';
import Login from '../Login';
import NavBar from '../NavBar';
import Error from '../Error';
import Profile from '../Profile';
import GameBoard from '../GameBoard';
import { AUTH_LOGIN } from '../../store/auth/actionsTypes';
import Score from '../Score';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch('/auth/user', {})
      .then((data) => data.json())
      .then((data) => {
        dispatch({ type: AUTH_LOGIN, payload: { id: data.id, login: data.login } });
      });
  }, []);

  return (
    <div className="App">
      <NavBar />
      <div className="container" style={{ paddingTop: '100px' }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/error" element={<Error />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/game/play" element={<GameBoard />} />
          <Route path="/game/score" element={<Score />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
