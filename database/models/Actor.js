module.exports = (sequelize, dataTypes) => {
    let alias = "Actors";
    let cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            
        }, 

        first_name : {
            type : dataTypes.STRING
        },

        last_name : {
            type : dataTypes.INTEGER
        }
    }

    let config = {
        timestamps : false,
        tableName: 'actors'
    } 
    
    const Actor = sequelize.define(alias, cols, config);
    Actor.associate = function(models){
        Actor.belongsToMany(models.Movies, {
        as: 'movies',
        through:'actor_movie',
        foreignKey: 'movie_id',
        otherKey:'actor_id',
        timestamps: false
        })
    }

    return Actor;

    
}