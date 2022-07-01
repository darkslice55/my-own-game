import React from 'react';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import style from './QuestionCard.module.css';
import { QUESTIONS_ANSWER } from '../store/questions/actionsTypes';

function QuestionCard({ question, answeredQuestion }) {
  const dispatch = useDispatch();
  const [isModal, setModal] = useState(false);
  const [isAnswered, setAnswered] = useState(false);
  const [rightAnswer, setRightAnswer] = useState('');
  const [value, setValue] = React.useState('');
  const [timer, setTimer] = React.useState(60);
  const [started, setStarted] = React.useState(true);

  React.useEffect(() => {
    if (started) {
      const interval = setInterval(() => setTimer((curTime) => curTime - 1), 1000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [started]);

  setTimer(60);

  const handleClick = useCallback(() => {
    setAnswered(true);
    setStarted(false);
    fetch(`/questions/${question.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        timer,
        answer: value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => result.json())
      .then((answer) => {
        setRightAnswer(answer);
        dispatch({ type: QUESTIONS_ANSWER, payload: { id: question.id } });
      });
  }, [value, rightAnswer]);

  const handleClickOnAnswer = useCallback(() => {
    setModal(false);
    const score = rightAnswer.result ? Number(question.score) : -Number(question.score);
    answeredQuestion(score);
  }, [rightAnswer, answeredQuestion]);

  return (
    <>
      <p
        className={isAnswered ? style.answered : style.question}
        onClick={!isAnswered ? () => setModal(true) : undefined}>
        {question.score}
      </p>
      {isModal && (
        <div className={style.modal}>
          <div className={style.modalDialog}>
            <h2 className={style.modalHeader}>
              Вопрос за {question.score} {timer}
            </h2>
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
                <button onClick={handleClickOnAnswer}>Продолжить</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default QuestionCard;
