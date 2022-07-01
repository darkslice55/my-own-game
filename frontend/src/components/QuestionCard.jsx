import React from 'react';
import { useState, useEffect } from 'react';
import style from './QuestionCard.module.css';

function QuestionCard({ question }) {
  const [isModal, setModal] = useState(false);
  return (
    <>
      <p key={question.id} className={style.question} onClick={() => setModal(true)}>
        {question.score}
      </p>
      {isModal && (
        <div className={style.modal}>
          <div className={style.modalDialog}>
            <h2 className={style.modalHeader}>Вопрос за {question.score}</h2>
            <p>{question.description}</p>
            <input />
            <button onClick={() => setModal(false)}>Ответить</button>
          </div>
        </div>
      )}
    </>
  );
}

export default QuestionCard;
