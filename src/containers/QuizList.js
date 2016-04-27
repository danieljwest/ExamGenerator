import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions } from 'redux/modules/quiz'
import ModalWindow from 'components/ModalWindow'
import QuizForm from 'containers/QuizForm'
import QuizListItem from 'components/QuizListItem'

const quizSelector = (quizzes, showAll) => {
  if (showAll) {
    return quizzes
  }
  return quizzes.filter((q) => q.isActive)
}

const selectQuiz = (quizzes, id) => {
  if (!id) return {}
  return quizzes.find((quiz) => quiz.id === id)
}

const mapStateToProps = (state) => ({
  quizzes: quizSelector(state.quiz.quizzes, state.quiz.showAll),
  showAll: state.quiz.showAll,
  isRequesting: state.quiz.requesting,
  showModal: state.quiz.showModal,
  selectedQuiz: selectQuiz(state.quiz.quizzes, state.quiz.editId)
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
    showAll: PropTypes.bool.isRequired,
    showModal: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    showNewQuizModal: PropTypes.func.isRequired,
    saveQuiz: PropTypes.func.isRequired,
    showEditQuizModal: PropTypes.func.isRequired,
    selectedQuiz: PropTypes.object
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
    // Added questionCount to the QuizListItem... if they were the same case this would
    // not have been necessary due to the ...quiz
    const quizzes = this.props.quizzes.map((quiz) => {
      return (<QuizListItem key={quiz.name} name={quiz.id}
        onClick={this.props.showEditQuizModal} questionCount={quiz.QuestionCount} {...quiz} />)
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
        <button className='btn btn-success' onClick={this.props.showNewQuizModal}>Add New</button>
        <input type='checkbox'
          onChange={this.handleOnChange} checked={this.props.showAll} /> Show All
          {content}
        <ModalWindow title='Quiz' show={this.props.showModal} onHide={this.props.hideModal}>
          <QuizForm initialValues={this.props.selectedQuiz} onSubmit={this.props.saveQuiz} />
        </ModalWindow>
      </div>
    )
  }
}

export default connect(mapStateToProps, {...actions})(QuizContainer)
