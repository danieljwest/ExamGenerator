import Sequelize from 'sequelize'

export default (db) => {
  let Quiz = db.define('Quiz', {
    name: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
  })
  // Telling sequelize that Quiz will have many questions.
  // This builds the one to many relationship between Quiz and Questions
  // This also will put a foreign key on Question for us named QuizId
  // This will also give us getQuestions and setQuestions on Quiz
  Quiz.hasMany(db.question)
  return Quiz
}
