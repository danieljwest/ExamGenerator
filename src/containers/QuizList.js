import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions } from 'redux/modules/quiz'

const quizSelector = (quizzes, showAll) => {
  if (showAll) {
    return quizzes
  }
  return quizzes.filter((q) => q.isActive)
}

const mapStateToProps = (state) => ({
  quizzes: quizSelector(state.quiz.quizzes, state.quiz.showAll),
  showAll: state.quiz.showAll,
  isRequesting: state.quiz.requesting
})

export class QuizContainer extends React.Component {
  constructor () {
    super()
    this.handleOnChange = this.handleOnChange.bind(this)
  }
  static propTypes = {
    quizzes: PropTypes.array.isRequired,
    getQuizzes: PropTypes.func.isRequired,
    isRequesting: PropTypes.bool.isRequired,
    setShowAll: PropTypes.func.isRequired,
    showAll: PropTypes.bool.isRequired
  };

  componentWillMount () {
    if (this.props.quizzes.length === 0) {
      this.props.getQuizzes()
    }
  }

  handleOnChange (event) {
    this.props.setShowAll(event.target.checked)
  }

  render () {
    const quizzes = this.props.quizzes.map((quiz) => {
      return (<div key={quiz.name} className='row'>{quiz.name} - {quiz.isActive ? 'Yes' : 'No'}</div>)
    })
    let content = (<div>Requesting...</div>)
    if (!this.props.isRequesting) {
      if (this.props.quizzes.length > 0) {
        content = (
          <div>
            {quizzes}
          </div>
        )
      } else {
        content = 'No quizzes found'
      }
    }
    return (
      <div className='container'>
        <input type='checkbox'
          onChange={this.handleOnChange} checked={this.props.showAll}/> Show All
        {content}
      </div>
    )
  }
}

export default connect(mapStateToProps, {...actions})(QuizContainer)
