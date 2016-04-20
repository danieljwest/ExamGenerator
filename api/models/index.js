import user from './user'
import quiz from './quiz'
import question from './question'
// We imported the new question model and exported it as part of our default object.
// This default export is consumed in api/server.js and is iterated over to instantiate
// everything
export default {
  user,
  question,
  quiz
}
