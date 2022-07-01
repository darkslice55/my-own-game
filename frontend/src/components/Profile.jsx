import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// function Profile() {
//   const user = useSelector((state) => state.auth);
//     const [statistic, setStatistic] = useState();
//     console.log(user, 'Информация о Юрезе...........................')

//     useEffect(() => {
//       fetch(`/users/${user.id}`)
//         .then((result) => result.json())
//         .then((stat) => {
//           console.log(stat, 'Cтатистика...........................')
//           setStatistic(stat)
//         });
//     }, []);

function getStats(stats) {
  const result = {};
  result.login = stats[0]['User.login'];
  result.number = stats.length;
  result.total = stats.reduce((acc, ell) => acc + Number(ell.total_score), 0);
  result.avg = Math.round((result.total / result.number) * 100) / 100;
  console.log(...stats.map((el) => Number(el.score)));
  result.max = Math.max(...stats.map((el) => Number(el.total_score)));
  result.min = Math.min(...stats.map((el) => Number(el.total_score)));
  return result;
}

function Profile() {
  // const user = useSelector((state) => state.auth);
  const [statistic, setStatistic] = useState();
  // console.log(user, 'Информация о Юрезе...........................')

  useEffect(() => {
    fetch('/users')
      .then((result) => result.json())
      .then((stat) => {
        setStatistic(getStats(stat));
      });
  }, []);

  return (
    <div>
      <h1>Личный кабинет, где тебя никто не найдет.</h1>
      {statistic && (
        <div className="statsBlock">
          <h2>Имя пользователя: {statistic.login}</h2>
          <ul>
            <li className="statInfo">Всего сыграно игр: {statistic.number}</li>
            <li className="statInfo">Всего набрано очков: {statistic.total}</li>
            <li className="statInfo">Среднее количество очков: {statistic.avg}</li>
            <li className="statInfo">Наилучший результат: {statistic.max}</li>
            <li className="statInfo">Наихудший результат: {statistic.min}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;
