import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import quizFormValidation from './quizFormValidation'

const fields = ['id', 'name', 'isActive']

class QuizForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  render () {
    const {fields: {name, isActive}, handleSubmit, submitting} = this.props

    const nameErrorMsg = name.touched && name.error ? name.error : ''

    return (
      <div className='form-quiz'>
        <form onSubmit={handleSubmit} className='form' role='form'>
          <fieldset className='form-group'>
            <label htmlFor='name'>Name</label> <label className='text-danger'>{nameErrorMsg}</label>
            <input type='text' className='form-control' id='name'
              placeholder='Enter name of the quiz' {...name} required=''/>
          </fieldset>
          <fieldset className='checkbox'>
            <label htmlFor='isActive'>
              <input type='checkbox' className='' id='isActive'
                {...isActive} required=''/>Is Active?
            </label>
          </fieldset>
          <button type='submit' className='btn btn-primary btn-block' disabled={submitting}>Save
            {submitting ? <span className='loader glyphicon glyphicon-refresh spin'></span>
              : <span></span>}
          </button>
        </form>
      </div>

    )
  }
}

export default reduxForm({
  form: 'quizForm',
  fields,
  validate: quizFormValidation
})(QuizForm)
