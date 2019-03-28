var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

// create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize(process.env.DATABASE_URL || "postgres://gdcuymnjnlyqxg:48e0bbbce9430df86ec167f17a46cb5d308d422981c9f4a791034d73a8952ccd@ec2-54-197-232-203.compute-1.amazonaws.com:5432/d81t8isvnc8kbu?ssl=true");

// setup User model and its fields.
var User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    avatar_url: {
        type: Sequelize.STRING,
    },
    last_name: {
        type: Sequelize.STRING,
    },
    first_name: {
        type: Sequelize.STRING,
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
    //instanceMethods: {
      //validPassword: function(password) {
        //return bcrypt.compareSync(password, this.password);
      //}
    //}    
});

User.prototype.validPassword = function validPassword(password) {
  return bcrypt.compareSync(password, this.password);
}



// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = User;
