import db from '../core/database'
export default function (router) {
  router.get('/Quizzes/', function (req, res) {
    db.quiz.findAll().then((quizzes) => {
      res.json({success: true, quizzes})
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
