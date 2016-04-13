import {createValidator, required} from 'redux/utils/validation'

const quizFormValidation = createValidator({
  name: required
})

export default quizFormValidation
