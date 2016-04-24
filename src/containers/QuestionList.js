import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions } from 'redux/modules/quiz'
import ModalWindow from 'components/ModalWindow'
import { Table, Column, Cell } from 'fixed-data-table'
import Immutable from 'immutable'
import QuestionForm from './QuestionForm'
import 'fixed-data-table/dist/fixed-data-table.css'

// Since we're using immutable we return a blank list otherwise return the Immutable list
const selectQuestions = (state, quizId) => {
  if (!state.quiz.questions.has(quizId)) {
    return Immutable.List()
  }
  return state.quiz.questions.get(quizId)
}

const mapStateToProps = (state, props) => ({
  questions: selectQuestions(state, props.params.quizId),
  showModal: state.quiz.showQuestionModal,
  isRequesting: state.quiz.requesting
})
// TextCell to render the data from our immutable object
const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data.get(rowIndex).get(col).length <= 100 ? data.get(rowIndex).get(col)
      : data.get(rowIndex).get(col).substring(0, 100) + '...'}
  </Cell>
)
TextCell.propTypes = {
  rowIndex: PropTypes.number,
  data: PropTypes.object,
  col: PropTypes.string
}

export class QuestionContainer extends React.Component {
  constructor () {
    super()
    this.saveQuestion = this.saveQuestion.bind(this)
  }
  static propTypes = {
    questions: PropTypes.object.isRequired,
    getQuestions: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    isRequesting: PropTypes.bool.isRequired,
    showNewQuestionModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    hideQuestionModal: PropTypes.func.isRequired,
    saveQuestion: PropTypes.func.isRequired
  };
  saveQuestion (question) {
    // Bubbles up the quizId and the question object
    this.props.saveQuestion(this.props.params.quizId, question)
  }

  componentWillMount () {
    if (this.props.questions.size === 0) {
      this.props.getQuestions(this.props.params.quizId)
    }
  }
  // Enter fixed-data-table

  render () {
    let content = (<div>Requesting...</div>)
    if (!this.props.isRequesting) {
      if (this.props.questions.size > 0) {
        content = (
          <Table
            rowHeight={50}
            headerHeight={50}
            rowsCount={this.props.questions.size}
            width={1000}
            height={500}>
            <Column
              header={<Cell>Title</Cell>}
              cell={<TextCell data={this.props.questions} col='title' />}
              fixed
              width={100}
            />
            <Column
              header={<Cell>Content</Cell>}
              cell={<TextCell data={this.props.questions} col='questionMarkdown' />}
              flexGrow={2}
              width={200}
            />
          </Table>
        )
      } else {
        content = 'No questions found'
      }
    }
    // Added some modal window stuff and implemented saveQuestion and tied together the actions.
    return (
      <div className='container'>
        <button className='btn btn-success' onClick={this.props.showNewQuestionModal}>Add New</button>
        {content}
        <ModalWindow bsSize='large' title='Question' show={this.props.showModal} onHide={this.props.hideQuestionModal}>
          <QuestionForm onSubmit={this.saveQuestion} />
        </ModalWindow>
      </div>
    )
  }
}

export default connect(mapStateToProps, {
  getQuestions: actions.getQuestions,
  saveQuestion: actions.saveQuestion,
  hideQuestionModal: actions.hideQuestionModal,
  showNewQuestionModal: actions.showNewQuestionModal
})(QuestionContainer)
