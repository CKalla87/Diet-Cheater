var express = require('express');

var router = express.Router();

var user = require('../controllers/authcontroller.js');
var exercise = require('../models/exercise.js');
var users = require('../models.users.js');

router.get('/api/query', function(req, res) {
  console.log(req.body);

  var response = req.body;
  var nutrients = response.report.foods[0].nutrients;
  var food = [];
  var name = {
    name: response.report.foods[0].name,
  };
  food.push(name);

  console.log(food);

  for (i = 0; i < nutrients.length; i++) {
    var value = nutrients[i].value;

    if (nutrients[i].nutrient_id == '208') {
      var calories = {
        kcals: value,
      };
      food.push(calories);
    } else if (nutrients[i].nutrient_id == '269') {
      var sugar = {
        sugar: value,
      };
      food.push(sugar);
    } else if (nutrients[i].nutrient_id == '204') {
      var fat = {
        fat: value,
      };
      food.push(fat);
    } else if (nutrients[i].nutrient_id == '205') {
      var carbs = {
        carbs: value,
      };
      food.push(carbs);
    } else {
      break;
    }
  }

  console.log(food);

  db.users
    .findOne({
      where: {
        id: users.id,
      },
    })
    .then(function(userInfo) {
      console.log(userInfo);
    });
});
