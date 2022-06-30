import React from 'react';

function Error() {
    return (
        <div>
            <h1>Кажется ты еще не готов!</h1>
            <h1>Для начала я хочу узнать твое имя!</h1>
            <div className='wrapper'>
            <form action='/auth/register'>
            <button type="submit" className="btn btn-primary">Я новый игрок</button>
            </form>
            
            <form action='/auth/login'>
            <button type="submit" className="btn btn-primary">Я частый гость</button>
            </form>
            </div>
        </div>
    );
}

export default Error;