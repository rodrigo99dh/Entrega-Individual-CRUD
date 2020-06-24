module.exports = (sequelize, dataTypes) => {
    let alias = "Movies";
    let cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            
        }, 

        title : {
            type : dataTypes.STRING
        },

        length : {
            type : dataTypes.INTEGER
        },
        rating: {
            type: dataTypes.DOUBLE
        },
        awards:{
            type: dataTypes.INTEGER
        },
        release_date:{
            type: dataTypes.DATE
        }
    }

    let config = {
        timestamps : false,
        tableName: 'movies'
    } 
    
    const Movie = sequelize.define(alias, cols, config);
    Movie.associate = function(models){
        Movie.belongsTo(models.Genres, {
        as: 'genres',
        foreignKey: 'genre_id'
        
        })
        
        Movie.belongsToMany(models.Actors, {
        as: 'actors',
        through:'actor_movie',
        foreignKey: 'movie_id',
        otherKey: 'actor_id',
        timestamps: false
        })
    } 
    

    return Movie;

    
}


