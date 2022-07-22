 const express = require('express')
 const router = express.Router()
 var methodOverride = require('method-override')

 router.use(methodOverride('_method'))

const linkController = require('../controllers/linkControllers') 

 //Rota
router.get('/', linkController.allLinks)

//Rota para redirecionar links
router.get('/:title', linkController.redirect)

//Rota
router.get('/add', (req, res) => res.render('index', {error:false, body: {} }))
router.get('/title', linkController.redirect)
router.get('/edit/:id', linkController.loadLink)
 
//Rota para adicionar links
 router.post('/', express.urlencoded({extended: true}), linkController.addLink)
 router.post('/edit/:id', express.urlencoded({extended: true}), linkController.editLink)


//Rota para deletar links
 router.delete('/:id', linkController.deleteLink)
 router.delete('/', express.urlencoded({extended: true}), linkController.deleteLink)


module.exports = router