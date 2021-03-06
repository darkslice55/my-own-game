import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { QUESTIONS_GET } from '../store/questions/actionsTypes';
import style from './GameBoard.module.css';
import QuestionCard from './QuestionCard';

function getThemes(questions) {
  const themes = {};
  questions.forEach((question) => {
    if (themes.hasOwnProperty(question.theme)) {
      themes[question.theme].push(question);
    } else {
      themes[question.theme] = [question];
    }
  });
  const topics = [];
  for (let theme in themes) {
    topics.push({ theme, questions: themes[theme] });
  }
  return topics;
}

function GameBoard(props) {
  const navigate = useNavigate();
  const questions = useSelector((state) => state.questions.questions);
  const dispatch = useDispatch();
  const [topics, setTopics] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    fetch('/questions')
      .then((result) => result.json())
      .then((questions) => {
        const newTopics = getThemes(questions);
        setTopics(newTopics);
        setTotalScore(
          questions.reduce((acc, el) => {
            const znak = el.isAnswered ? (el.isRight ? 1 : -1) : 0;
            console.log(znak);
            return acc + Number(el.score) * znak;
          }, 0),
        );
        dispatch({ type: QUESTIONS_GET, payload: questions });
      });
  }, []);

  const answeredQuestion = useCallback((score) => {
    setTotalScore((prev) => prev + score);
  }, []);

  const gameOver = () => {
    fetch('/games');
    navigate('/');
  };

  console.log(questions);

  return (
    <div>
      {topics && (
        <>
          <div className="game-header">
            <button
              type="submit"
              onClick={gameOver}
              className="btnEnd btn-primary style ={{'width:100px', hight:'100px', marginRight:50px}}">
              Завершить игру
            </button>
            <h2 className={style.score}>Текущий счёт: {totalScore}</h2>
          </div>
          {topics.map((topic, id) => (
            <div className={style.parent} key={id}>
              <p className={style.theme}>{topic.theme}</p>
              {topic.questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  answeredQuestion={answeredQuestion}
                />
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default GameBoard;
