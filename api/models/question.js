import Sequelize from 'sequelize'
// We're creating our model for the question through sequelize.
// Two fields... title and questionMarkdown
export default (db) => {
  let Question = db.define('Question', {
    title: Sequelize.STRING,
    questionMarkdown: Sequelize.STRING
  })
  return Question
}
