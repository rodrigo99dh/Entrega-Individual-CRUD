const movies = require("../database/models/Movie");
let db = require ("../database/models");
var Sequelize = require("sequelize");
const { raw } = require("express");
const Op = Sequelize.Op;
let {check, validationResult, body} = require('express-validator')

const moviesController = {
    list : function(req, res, next) {
        db.Movies.findAll()
        .then(function(movies){
            res.render('movies',{movies:movies})
        })
        .catch(function(error) {
            console.log(error);
            res.send("error")
        })
    },
    detail: function (req,res,next){
        
        
        db.Movies.findByPk(req.params.id,{
            include: [ 'genres','actors'],

          })

 
           
        
        .then(function(movies){
            console.log(movies)
            res.render('detallePelicula',{movies:movies})
        })
        
    },
    create: function (req,res,next){

        res.render('createMovie')
    },
    sendCreate: function (req,res,next){
        let errors = validationResult(req)
        if(errors.isEmpty()){
        db.Movies.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            length: req.body.length,
            release_date: req.body.release_date
      
        })
        res.redirect('/movies')
        } else{
            res.render('createMovie',{errors:errors.errors})
        }
    },
    edit: function (req,res,next){
        db.Movies.findByPk(req.params.id)
        .then(function(movies){
        res.render('editMovie',{movies:movies})
    })
},
    sendEdit: function(req,res,next){
        db.Movies.update(
            req.body,{
                where: {
                    id:req.params.id
                }
            }
        )
        res.redirect('/movies')
},
    delete: function(req,res,next){
        db.Movies.findByPk(req.params.id)
        .then(function(movies){
            res.render('deleteMovie',{movies:movies})
        })
    },
    sendDelete: function(req,res,next){
        db.Movies.destroy({
            where:{
                id:req.params.id
            }
        })
        res.redirect('/movies')
    },
    detailGenre: function (req,res,next){
         db.Genres.findByPk(req.params.id,{
            include: [ 'movies'],

          })
        .then(function(genres){
            console.log(genres)
        res.render('detalleGenero',{genres:genres})
    })
},
detailActor: function (req,res,next){
    db.Actors.findByPk(req.params.id,{
       include: ['movies'],

     })
   .then(function(actors){
       console.log(actors)
   res.render('detalleActor',{actors:actors})
})
}

}
module.exports = moviesController;

