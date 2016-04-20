import React from 'react'
import { Route, IndexRoute } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'
import QuizList from 'containers/QuizList'
import QuestionList from 'containers/QuestionList'

// Added a route that will acccept /Quizzes/5/Questions and pass 5 as props.params.quizId
// to the designated component (QuestionList)
export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='Quizzes' component={QuizList} />
    <Route path='Quizzes/:quizId/Questions' component={QuestionList} />
  </Route>
)
