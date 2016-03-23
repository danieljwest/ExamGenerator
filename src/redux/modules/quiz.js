import { CALL_API } from 'redux/middleware/api'
// Constants
export const QUIZ_REQUEST = 'QUIZ_REQUEST'
export const QUIZ_SUCCESS = 'QUIZ_SUCCESS'
export const QUIZ_FAILED = 'QUIZ_FAILED'
export const SET_SHOWALL = 'SET_SHOWALL'

// Actions
const setShowAll = (value) => {
  return {
    type: SET_SHOWALL,
    payload: value
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

export const actions = {
  getQuizzes,
  setShowAll
}

// Reducer
const initialState = {showAll: false, requesting: false, quizzes: []}
export default function authReducer (state = initialState, action) {
  switch (action.type) {
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
