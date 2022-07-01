import React, { useState, useEffect } from 'react';

function getStats(stats) {
  const users = {};
  stats.forEach((stat) => {
    if (users.hasOwnProperty(stat['User.login'])) {
      const { total, number } = users[stat['User.login']];
      users[stat['User.login']] = {
        login: stat['User.login'],
        total: total + stat.total_score,
        number: number + 1,
      };
    } else {
      users[stat['User.login']] = { login: stat['User.login'], total: stat.total_score, number: 1 };
    }
  });
  return Object.values(users).sort((a, b) => b.total - a.total);
}

function Score() {
  const [raiting, setRaiting] = useState();

  useEffect(() => {
    fetch('/games/raitings')
      .then((result) => result.json())
      .then((stat) => {
        console.log('sss', getStats(stat));
        console.log('STATS', stat);
        setRaiting(getStats(stat));
      });
  }, []);

  return (
    <>
      <h1>Рейтинг</h1>
      <table className="raiting">
        <tr>
          <th>Пользователь</th>
          <th>Средний результат</th>
          <th>Суммарный результат</th>
          <th>Всего сыграно</th>
        </tr>
        {raiting && (
          <>
            {raiting.map((el, id) => (
              <tr key={id}>
                <td>{el.login}</td>
                <td>{Math.round(el.total / el.number)}</td>
                <td>{el.total}</td>
                <td>{el.number}</td>
              </tr>
            ))}
          </>
        )}
        <tr>
          <td>...</td>
        </tr>
      </table>
    </>
  );
}

export default Score;
