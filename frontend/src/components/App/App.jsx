import { Provider } from 'react-redux';
import {
     BrowserRouter,
     Routes,
     Route,
     } from 'react-router-dom';


import './App.css';
import Main from '../Main';
import Register from '../Register';
import Login from '../Login';
import NavBar from '../NavBar';


function App() {
    return (
        <>
        <NavBar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Login />} />

        </Routes>
      </>
    );
}

export default App;