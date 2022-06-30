import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { QUESTIONS_GET } from '../store/questions/actionsTypes';
import style from './GameBoard.module.css';

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
    <div className={style.parent}>
      {topics &&
        topics.map((topic, id) => (
          <div key={id}>
            <h2>{topic.theme}</h2>
            {topic.questions.map((question) => (
              <p key={question.id}>{question.score}</p>
            ))}
          </div>
        ))}
    </div>
  );
}

export default GameBoard;
