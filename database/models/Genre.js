module.exports = (sequelize, dataTypes) => {
    let alias = "Genres";
    let cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            
        }, 

        name : {
            type : dataTypes.STRING
        },

        ranking : {
            type : dataTypes.INTEGER
        }
    }

    let config = {
        timestamps : false,
        tableName: 'genres'
    } 
    
    const Genre = sequelize.define(alias, cols, config);
    Genre.associate = function(models){
        Genre.hasMany(models.Movies, {
        as: 'movies',
        foreignKey: 'genre_id'
        })
    }

    return Genre;

    
}