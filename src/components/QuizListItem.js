import React, { PropTypes } from 'react'
import { Link } from 'react-router'
// Imported Link from react-router which is an easy way to make a link that causes a route change
export default function QuizListItem (props) {
  let handleClick = (event) => {
    props.onClick(props.id)
  }
  return (
    <div style={{cursor: 'pointer'}}
      className='row' >
      { /* Moved this content into a span so the onClick wouldn't interfere with the questions */ }
      <span onClick={handleClick}> {props.name} - {props.isActive ? 'Yes' : 'No'} - </span>
      { /* Added a link pointing to /Quizzes/5/Questions This does nothing now but will function later */ }
      <Link to={`/Quizzes/${props.id}/Questions`}>{props.questionCount} Questions</Link>
    </div>
    )
}
// Added questionCount to our proptypes
QuizListItem.propTypes = {
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  questionCount: PropTypes.number.isRequired
}
