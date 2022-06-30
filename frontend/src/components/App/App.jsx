import {
     Routes,
     Route,
     } from 'react-router-dom';


import './App.css';
import Main from '../Main';
import Register from '../Register';
import Login from '../Login';
import NavBar from '../NavBar';
import Error from '../Error';
import Profile from '../Profile';
import GameBoard from '../GameBoard';


function App({user}) {
    return (
        <div className='App'>
        <NavBar user={user} />
        <div className='container'style={{paddingTop:'100px'}} >
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/error' element={<Error />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/game/play' element ={<GameBoard />} />
        </Routes>
        </div>
      </div>
    );
}

export default App;