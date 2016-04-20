import { CALL_API } from 'redux/middleware/api'
import Immutable from 'immutable'
// Constants
export const QUIZ_REQUEST = 'QUIZ_REQUEST'
export const QUIZ_SUCCESS = 'QUIZ_SUCCESS'
export const QUIZ_FAILED = 'QUIZ_FAILED'
export const QUESTION_REQUEST = 'QUESTION_REQUEST'
export const QUESTION_SUCCESS = 'QUESTION_SUCCESS'
export const QUESTION_FAILED = 'QUESTION_FAILED'
export const SET_SHOWALL = 'SET_SHOWALL'
export const SHOW_NEW_QUIZ = 'SHOW_NEW_QUIZ'
export const HIDE_QUIZ = 'HIDE_QUIZ'
export const SAVE_QUIZ_REQUEST = 'SAVE_QUIZ_REQUEST'
export const SAVE_QUIZ_SUCCESS = 'SAVE_QUIZ_SUCCESS'
export const SAVE_QUIZ_ERROR = 'SAVE_QUIZ_ERROR'
// New constants for saving a question and stuff
export const SAVE_QUESTION_REQUEST = 'SAVE_QUESTION_REQUEST'
export const SAVE_QUESTION_SUCCESS = 'SAVE_QUESTION_SUCCESS'
export const SAVE_QUESTION_ERROR = 'SAVE_QUESTION_ERROR'
export const SHOW_NEW_QUESTION = 'SHOW_NEW_QUESTION'
export const HIDE_QUESTION = 'HIDE_QUESTION'
export const SHOW_EDIT_QUIZ = 'SHOW_EDIT_QUIZ'
// Actions
const setShowAll = (value) => {
  return {
    type: SET_SHOWALL,
    payload: value
  }
}

const hideModal = () => {
  return {
    type: HIDE_QUIZ
  }
}

const showEditQuizModal = (id) => {
  return {
    type: SHOW_EDIT_QUIZ,
    payload: id
  }
}
const showNewQuizModal = () => {
  return {
    type: SHOW_NEW_QUIZ
  }
}

const saveQuiz = (quiz) => {
  return {
    [CALL_API]: {
      types: [ SAVE_QUIZ_REQUEST, SAVE_QUIZ_SUCCESS, SAVE_QUIZ_ERROR ],
      endpoint: '/api/secured/quizzes/',
      method: 'POST',
      body: quiz
    },
    quiz
  }
}

const getQuestions = (quizId) => {
  return {
    [CALL_API]: {
      types: [ QUESTION_REQUEST, QUESTION_SUCCESS, QUESTION_FAILED ],
      endpoint: `/api/secured/quizzes/${quizId}/Questions`,
      method: 'GET'
    },
    quizId
  }
}

const getQuizzes = () => {
  return {
    [CALL_API]: {
      types: [ QUIZ_REQUEST, QUIZ_SUCCESS, QUIZ_FAILED ],
      endpoint: '/api/secured/quizzes/',
      method: 'GET'
    }
  }
}
// Saving questions!
const saveQuestion = (quizId, question) => {
  question.QuizId = quizId
  return {
    [CALL_API]: {
      types: [ SAVE_QUESTION_REQUEST, SAVE_QUESTION_SUCCESS, SAVE_QUESTION_ERROR ],
      endpoint: `/api/secured/quizzes/${quizId}/questions`,
      method: 'POST',
      body: question
    },
    question
  }
}
// more modals
const showNewQuestionModal = () => {
  return {
    type: SHOW_NEW_QUESTION
  }
}
const hideQuestionModal = () => {
  return {
    type: HIDE_QUESTION
  }
}

export const actions = {
  getQuizzes,
  setShowAll,
  hideModal,
  showNewQuizModal,
  saveQuiz,
  showEditQuizModal,
  getQuestions,
  saveQuestion,
  showNewQuestionModal,
  hideQuestionModal
}

// Reducer
const initialState = {showAll: false, questions: Immutable.Map(), showQuestionModal: false,
  showModal: false, requesting: false, quizzes: []}
export default function quizReducer (state = initialState, action) {
  switch (action.type) {
    case SHOW_NEW_QUIZ:
      return {...state, showModal: true, editId: null}
    case SHOW_EDIT_QUIZ:
      return {...state, showModal: true, editId: action.payload}
    case HIDE_QUIZ:
      return {...state, showModal: false}
    case SHOW_NEW_QUESTION:
      return {...state, showQuestionModal: true}
    case HIDE_QUESTION:
      return {...state, showQuestionModal: false}
    case SAVE_QUESTION_SUCCESS:
      // I may have fixed the bug... but we will only know once we try it!
      // Should be grabbing the immutable list and pushing a new item into it
      // then updating questions with the new question
      const newQuestion = Immutable.fromJS({...action.question, id: action.payload.id})
      let questions = state.questions.get(newQuestion.get('QuizId'))
      return {...state, questions: state.questions.set(newQuestion.get('QuizId'),
        questions.push(newQuestion)), showQuestionModal: false}
    case SAVE_QUIZ_SUCCESS:
      const newQuiz = {...action.quiz, id: action.payload.id}
      const quizzes = [...state.quizzes.filter((quiz) => quiz.id !== action.payload.id), newQuiz]
      return {...state, quizzes, showModal: false}
    case QUESTION_REQUEST:
      return {...state, requesting: true}
    case QUESTION_FAILED:
      return {...state, requesting: false}
    case QUESTION_SUCCESS:
      questions = state.questions.set(action.quizId, Immutable.fromJS(action.payload.questions))
      return {...state, requesting: false, questions}
    case QUIZ_REQUEST:
      return {...state, requesting: true}
    case QUIZ_SUCCESS:
      return {...state, requesting: false, quizzes: action.payload.quizzes}
    case QUIZ_FAILED:
      return {...state, requesting: false}
    case SET_SHOWALL:
      return {...state, showAll: action.payload}
    default:
      return state
  }
}
