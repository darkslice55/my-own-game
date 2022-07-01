import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AUTH_LOGIN } from '../store/auth/actionsTypes';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('first');

  const getData = React.useCallback(
    (event) => {
      event.preventDefault();
      const login = event.target.login.value;
      const password = event.target.password.value;
      fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          login,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          // проверка что мы залогинились
          dispatch({ type: AUTH_LOGIN, payload: { id: data.id, login: data.login } });
          navigate('/game/play');
        });
    },
    [dispatch],
  );

  return (
    <>
      <form method="POST" className="form" onSubmit={getData}>
        <div className="row">
          <div className="input-field col s3">
            <input
              id="first_name2"
              type="text"
              name="login"
              className="validate"
              autoComplete="off"
            />
            <label className="active" htmlFor="first_name2">
              User Name
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s3">
            <input
              id="password"
              type="password"
              name="password"
              className="validate"
              autoComplete="off"
            />
            <label className="active" htmlFor="password">
              Password
            </label>
            <button type="submit" className="btn btn-primary">
              Подтвердить
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;

// import React from 'react';

// function Login() {
//     return (
//         <div>
//            <form method='POST' action='/auth/login' className='form' >
//         <div className="row">
//     <div className="input-field col s3">
//       <input id="first_name2" type="text" className="validate" />
//       <label className="active" for="first_name2">User Name</label>
//     </div>
//   </div>
//   <div class="row">
//     <div class="input-field col s3">
//       <input id="password" type="password" class="validate"/>
//       <label class="active" for="password">Password</label>
//       <form action='/game/play'>
//     <button type="submit" className="btn btn-primary">Подтвердить</button>
//     </form>
//     </div>
//   </div>
//         </form>
//         </div>
//     );
// }

// export default Login;
