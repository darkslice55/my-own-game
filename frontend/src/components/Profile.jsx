import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Profile() {
  const user = useSelector((state) => state.auth);
    const [statistic, setStatistic] = useState();
    console.log(user, 'Информация о Юрезе...........................')
  
    useEffect(() => {
      fetch(`/users/${user.id}`)
        .then((result) => result.json())
        .then((stat) => {
          console.log(stat, 'Cтатистика...........................')
          setStatistic(stat)
        });
    }, []);

function Profile() {
    return (
        <div>
            <h1>Личный кабинет, где тебя никто не найдет.</h1>
        </div>
    );
}
}
export default Profile;
