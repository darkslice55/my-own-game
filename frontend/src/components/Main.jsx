import React from 'react';
import { useSelector } from 'react-redux';

function Main() {
  const user = useSelector((state) => state.auth);
  return (
    <div>
      <h1 className="mb-1" style={{ textAlign: 'center', color: '#ffffff' }}>
        Я хочу сыграть с тобой в одну игру
      </h1>
      {!user.login && (
        <>
          <form action="/error">
            <button type="submit" className="buttonMain">
              Жми!
            </button>
          </form>
        </>
      )}
      {user.login && (
        <div>
          <form action="/game/play">
            <button type="submit" className="buttonMain">
              Давай поиграем!
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Main;
