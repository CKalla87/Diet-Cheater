module.exports = function(sequelize, Sequelize) {

    var exercise = sequelize.define("exercise", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
  
      x_name: {
        type: Sequelize.STRING,
        notEmpty: true
      },
  
      male_factor: {
        type: Sequelize.DECIMAL(10,6),
        notEmpty: true
      },
  
      female_factor: {
        type: Sequelize.DECIMAL(10,6),
        notEmpty: true
      },

    });
  
    return exercise;
  };
  