import db from '../core/database'
export default function (router) {
  // We heavily modified quizzes here to make it return the count of questions
  // associated with a Quiz
  // This is a bit horrendous and took me awhile to get the syntax for...
  // Usually this is much easier in an ORM to do.
  // Allegedly there's an undocumented function that makes this much better
  // but... you know... undocumented
  router.get('/Quizzes/', function (req, res) {
    db.quiz.findAll({
      attributes: [
        'id',
        'name',
        'isActive',
        [db.fn('COUNT', db.col('Questions.id')), 'QuestionCount']
      ],
      include: [{model: db.question, attributes: []}],
      group: ['Quiz.id', 'Quiz.name', 'Quiz.isActive']
    }).then((quizzes) => {
      res.json({success: true, quizzes})
    })
  })
  // This guy probably works.
  // Since I haven't written any proper tests I won't actually know if this guy works
  // until we get to the point where we list our Questions
  router.get('/Quizzes/:id/Questions', function (req, res) {
    db.question.findAll({
      where: {
        QuizId: req.params.id
      }
    }).then((questions) => {
      res.json({success: true, questions})
    })
  })

  router.post('/Quizzes', function (req, res) {
    if (req.body.id) {
      db.quiz.update({id: req.body.id, name: req.body.name,
                    isActive: req.body.isActive}, {where: {id: req.body.id}}).then((result) => {
                      res.json({success: true, id: req.body.id})
                    }).catch((error) => {
                      res.json({success: false, error})
                    })
    } else {
      db.quiz.create({id: req.body.id, name: req.body.name,
                  isActive: req.body.isActive}).then((result) => {
                    res.json({success: true, id: result.id})
                  }).catch((error) => {
                    res.json({success: false, error})
                  })
    }
  })
}
