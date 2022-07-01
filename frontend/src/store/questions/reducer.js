import { QUESTIONS_ANSWER, QUESTIONS_GET } from './actionsTypes';
import { v4 as uuid } from 'uuid';

const initialState = {
  questions: [],
};

export default function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case QUESTIONS_ANSWER: {
      //переписать
      const newState = state.questions.map((question) => {
        if (question.id === action.payload.id) {
          question.isAnswered = true;
          return question;
        }
        return question;
      });

      return { ...state, questions: newState };
    }

    case QUESTIONS_GET: {
      return { ...state, questions: action.payload };
    }

    default:
      return state;
  }
}
