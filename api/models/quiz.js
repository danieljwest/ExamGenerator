import Sequelize from 'sequelize'

export default (db) => {
  let Quiz = db.define('Quiz', {
    name: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
  })
  return Quiz
}
