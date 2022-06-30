import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Main from '../Main';
import Register from '../Register';
import Login from '../Login';
import NavBar from '../NavBar';
import store from '../../store';
import GameBoard from '../GameBoard';

function App() {
  return (
    <Provider store={store}>
      <NavBar />
      <Routes>
        <Route path="/" element={<GameBoard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Provider>
  );
}

export default App;
