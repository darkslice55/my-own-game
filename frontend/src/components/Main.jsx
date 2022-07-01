import React from 'react';

function Main({user}) {
    return (
        <div>
        <h1 className="mb-1" style={{textAlign: 'center', color: '#ffffff'}}>Я хочу сыграть с тобой в одну игру</h1>
         {!user && (
            <>
        <form action="/error">
         <button type="submit"  className="buttonMain">Жми!</button>   
         </form>  
         </>
         )}
         {user && ( 
            <div>
            <form action="/game/play">
              <button type="submit"  className="buttonMain">Давай поиграем!</button>   
            </form>  
            </div> 
         )} 
       </div>
    );
}

export default Main;