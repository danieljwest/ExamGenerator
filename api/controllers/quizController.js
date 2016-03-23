import db from '../core/database'
export default function (router) {
  router.get('/Quizzes/', function (req, res) {
    db.quiz.findAll().then((quizzes) => {
      res.json({success: true, quizzes})
    })
  })
}
