import React from 'react';

function Login() {
    return (
        <div>
           <form method='POST' action='/auth/login' className='form' >
        <div className="row">
    <div className="input-field col s3">
      <input id="first_name2" type="text" className="validate" />
      <label className="active" for="first_name2">User Name</label>
    </div>
  </div>
  <div class="row">
    <div class="input-field col s3">
      <input id="password" type="password" class="validate"/>
      <label class="active" for="password">Password</label>
      <form action='/game/play'>
    <button type="submit" className="btn btn-primary">Подтвердить</button>
    </form>
    </div>
  </div>
        </form>
        </div>
    );
}

export default Login;