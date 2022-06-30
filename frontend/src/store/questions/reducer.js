import { QUESTIONS_ANSWER, QUESTIONS_GET } from './actionsTypes';
import { v4 as uuid } from 'uuid';

const initialState = {
  questions: [],
};

export default function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case QUESTIONS_ANSWER: {
      //переписать
      const question = {
        id: uuid(),
        title: action.payload,
        done: false,
      };

      return { ...state, questions: [...state.questions, question] };
    }

    case QUESTIONS_GET: {
      return { ...state, questions: action.payload };
    }

    default:
      return state;
  }
}
