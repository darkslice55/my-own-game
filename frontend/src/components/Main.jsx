import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

function Main() {
    return (
        <>
        <h1 className="mb-1">Игра</h1>
        <NavBar />
        &nbsp;&nbsp;&nbsp;
        <a className="btn btn-primary btn-xl" href="/auth/register">Регистрация</a>&nbsp;&nbsp;&nbsp;
        <Link className="btn btn-primary btn-xl" to="/login">Войти</Link>
      </>
    );
}

export default Main;