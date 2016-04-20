import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import {createValidator, required} from 'redux/utils/validation'
import marked from 'marked'
import langs from 'redux/utils/langs'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'
// Marked is for markdown hooray
// New redux-form container

// redux-form validation convention that makes title and questionMarkdown required
const validation = createValidator({
  title: required,
  questionMarkdown: required
})
// Title and questionMarkdown are the fields. This is a redux-form convention to specify
// the fields like this
const fields = ['id', 'title', 'questionMarkdown']

class QuestionForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  render () {
    const {fields: {title, questionMarkdown}, handleSubmit, submitting} = this.props

    const titleErrorMsg = title.touched && title.error ? title.error : ''
    const markdownErrorMsg = questionMarkdown.touched && questionMarkdown.error ? questionMarkdown.error : ''
    let defaults = {
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,

      highlight: function (code, lang) {
        try {
          console.log(lang)
          if (langs[lang]) {
            lang = langs[lang]
          } else {
            return code
          }
          console.log(lang)
          console.log(hljs.highlight(lang, code).value)
          console.log(hljs.highlight(lang, code))
          return hljs.highlight(lang, code).value
        } catch (e) {
          return hljs.highlightAuto(code).value
        }
      }
    }
    // Set marked.js options
    marked.setOptions(defaults)
    // marked.js stuff to produce the markdown... This could be moved to the constructor
    return (
      <div className='form-question'>
        <form onSubmit={handleSubmit} className='form' role='form'>
          <fieldset className='form-group'>
            <label htmlFor='title'>Title</label> <label className='text-danger'>{titleErrorMsg}</label>
            <input type='text' className='form-control' id='title'
              placeholder='Enter title of the quiz' {...title} required=''/>
          </fieldset>
          <fieldset className='form-group'>
            <label htmlFor='question'>Question</label> <label className='text-danger'>{markdownErrorMsg}</label>
            <textarea rows={10} type='text' className='form-control' id='question'
              placeholder='Enter title of the quiz' {...questionMarkdown} required=''/>
          </fieldset>
          { /* Dangerously set innerHtml so markdown actually renders normally */ }
          <fieldset className='form-group'>
            <div style={{whiteSpace: 'pre'}}
              dangerouslySetInnerHTML={questionMarkdown.value
                ? {__html: marked(questionMarkdown.value)} : {__html: ''}}>
            </div>
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
  form: 'questionForm',
  fields,
  validate: validation
})(QuestionForm)
