import React, { PropTypes } from 'react'
export default function QuizListItem (props) {
  let handleClick = (event) => {
    props.onClick(props.id)
  }
  return (
    <div style={{cursor: 'pointer'}}
      className='row' onClick={handleClick}>
      {props.name} - {props.isActive ? 'Yes' : 'No'}
    </div>
    )
}
QuizListItem.propTypes = {
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired
}
