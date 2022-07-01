import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
        dispatch({ type: QUESTIONS_GET, payload: questions });
      });
  }, [dispatch]);

  //   const handleClick =

  return (
    <div>
      {topics && (
        <>
          <h2 className={style.score}>Текущий счёт: {totalScore}</h2>
          {topics.map((topic, id) => (
            <div className={style.parent} key={id}>
              <p className={style.theme}>{topic.theme}</p>
              {topic.questions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default GameBoard;
