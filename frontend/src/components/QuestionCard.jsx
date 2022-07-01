import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import style from './QuestionCard.module.css';

function QuestionCard({ question }) {
  //   const dispatch = useDispatch();
  const [isModal, setModal] = useState(false);
  const [isAnswered, setAnswered] = useState(false);
  const [rightAnswer, setRightAnswer] = useState('');
  const [value, setValue] = React.useState('');

  const handleClick = useCallback(() => {
    console.log('value', value);
    setAnswered(true);
    console.log('value', value);
    fetch(`/questions/${question.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        timer: 100,
        answer: value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => result.json())
      .then((answer) => {
        console.log(answer);
        setRightAnswer(answer);
      });
  }, [value, rightAnswer]);

  return (
    <>
      <p
        className={isAnswered ? style.answered : style.question}
        onClick={!isAnswered && (() => setModal(true))}>
        {question.score}
      </p>
      {isModal && (
        <div className={style.modal}>
          <div className={style.modalDialog}>
            <h2 className={style.modalHeader}>Вопрос за {question.score}</h2>
            <p>{question.description}</p>
            {!isAnswered ? (
              <>
                <input
                  type="text"
                  placeholder="Введите задачу"
                  style={{ width: 400 }}
                  id="input"
                  name="input"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                />
                <button onClick={handleClick}>Ответить</button>
              </>
            ) : (
              <>
                {rightAnswer.result ? (
                  <p> Вы ответили верно!</p>
                ) : (
                  <>
                    <p> Вы ответили неверно и глупо!</p>
                    <p>Правильный ответ: {rightAnswer.answer}</p>
                  </>
                )}
                <button onClick={() => setModal(false)}>Продолжить</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default QuestionCard;
