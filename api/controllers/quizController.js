import db from '../core/database'
export default function (router) {
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

  router.get('/Quizzes/:id/Questions', function (req, res) {
    db.question.findAll({
      where: {
        QuizId: req.params.id
      }
    }).then((questions) => {
      res.json({success: true, questions})
    })
  })
  // Allows us to post our question and have it save to the database.
  router.post('/Quizzes/:quizId/Questions', function (req, res) {
    if (req.body.id) {
      db.question.update({id: req.body.id, title: req.body.title,
                    questionMarkdown: req.body.questionMarkdown,
                    QuizId: req.params.quizId
                    }, {where: {id: req.body.id}}).then((result) => {
                      res.json({success: true, id: req.body.id})
                    }).catch((error) => {
                      res.json({success: false, error})
                    })
    } else {
      db.question.create({id: req.body.id, title: req.body.title,
                  questionMarkdown: req.body.questionMarkdown,
                  QuizId: req.params.quizId
                  }).then((result) => {
                    res.json({success: true, id: result.id})
                  }).catch((error) => {
                    res.json({success: false, error})
                  })
    }
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
