import React from 'react';

function Register() {
    return (
        <>
        <form method='POST' action='/auth/register' className='form' >
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
    <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
    </form>
    </div>
  </div>
        </form>
        </>
    );
}

export default Register;