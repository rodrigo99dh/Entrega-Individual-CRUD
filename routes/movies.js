var express = require('express');
var router = express.Router();
var moviesController = require("../controllers/moviesController")
let {check, validationResult, body} = require('express-validator')

router.get("/", moviesController.list);
router.get('/detail/:id', moviesController.detail);
router.get('/create', moviesController.create);
router.post('/create',[
   check('title').isLength({min:1}).withMessage('Es necesario ingresar como mínimo un caracter'),
   check('rating').isInt({min:1, max:10}).withMessage('El rating es entre 1 y 10'),
   check('awards').isInt({min:0}).withMessage('No se pueden ingresar numeros negativos'),
   check('length').isInt().withMessage('Es necesario ingresar un número')
] ,moviesController.sendCreate);
router.get('/edit/:id', moviesController.edit);
router.post('/edit/:id', moviesController.sendEdit);
router.get('/delete/:id', moviesController.delete);
router.post('/delete/:id', moviesController.sendDelete);
router.get('/genre_detail/:id', moviesController.detailGenre);
router.get('/actor_detail/:id', moviesController.detailActor);


module.exports = router;