$(function() {
  $('#search').keyup(function(event) {
    event.preventDefault();

    var q = $('#search').val();

    var query = q.split(' ').join('%20');

    console.log(query);

    var resultDropdown = $('#result');

    var apikey = 'R8gYygJ9lQqhfgowOnDP2afcsq5YM7tRNp7cPqTl';

    var queryURL =
      'https://api.nal.usda.gov/ndb/search/?format=json&sort=r&max=25&offset=0&api_key=' +
      apikey +
      '&q=' +
      query;

    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: 'GET',
    }).done(function(response, err) {
      if (err) {
        resultDropdown.text('Item not found, please change your search term');
      }

      var options = response.list.item;

      resultDropdown.empty();

      //loop thru response

      for (i = 0; i < options.length; i++) {
        var product = options[i].name;
        var item = $('<li>');
        item.attr('value', options[i].ndbno);
        item.attr('id', options[i].ndbno);
        item.text(product);

        resultDropdown.append(item);
      }
    });
  });

  // function to get nutrition values

  $('#result').on('click', 'li', function(event) {
    event.preventDefault();

    var item = $(this)[0].id;
    $('#result').html('');

    console.log(item);
    var apikey = 'R8gYygJ9lQqhfgowOnDP2afcsq5YM7tRNp7cPqTl';

    var queryURL =
      'https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=' +
      apikey +
      '&nutrients=205&nutrients=204&nutrients=208&nutrients=269&ndbno=' +
      item;

    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: 'GET',
    }).done(function(response, err) {
      if (err) {
        $('error').text("Ups we don't have information on that item");
      }

      console.log(response);

      // technically call for apiCall() function, send info to controller to grab info from database. AJAX not working
      // apiCall(data);
      // instead, doing calculations in front end

      var nutrients = response.report.foods[0].nutrients;
      var food = [];
      var name = response.report.foods[0].name;
      food.push(name);

      console.log(food);

      // build object with info from API

      for (i = 0; i < nutrients.length; i++) {
        var value = nutrients[i].value;

        if (nutrients[i].nutrient_id == '208') {
          var calories = value;
         
          food.push(calories);
        } else if (nutrients[i].nutrient_id == '269') {
          var sugar = value;
        
          food.push(sugar);
        } else if (nutrients[i].nutrient_id == '204') {
          var fat = value;
        
          food.push(fat);
        } else if (nutrients[i].nutrient_id == '205') {
          var carbs = value;
        
          food.push(carbs);
        } else {
          break;
        }
      }
      console.log(food);
      // lacking on ajax to controller, calculated average calories burned per repetition on a 176-lb person
      calories = parseFloat(food[1]);
      var burpe = Math.floor(calories / 1.762);
      console.log(burpe);
      var squat = Math.floor(calories /0.793);
      var pushUp = Math.floor(calories /0.837);
      var pullUp = Math.floor(calories / 1.013);
      var squatJ = Math.floor(calories / 1.013);

     

      /*var nBurpee = {
        burpee: burpe}
      console.log(nBurpee);

      var nSquat = {
        squat : squat};
      console.log(nSquat);

      var nPushUp = {
        pushup : pushUp};
      console.log(nPushUp);

      var nPullUp = {
        pullup : pullUp};
      console.log(nPullUp);

      var nSquatJ ={
        squatJ: squatJ}
      console.log(nSquatJ);*/


      var info = $("#results-2")

      food.push(burpe);
      food.push(squat);
      food.push(pushUp);
      food.push(pullUp);
      food.push(squatJ);

      console.log(food);

      for(var j=0; j<food.length; j++){

      var data = '<td ><strong>'+ food[j] +'<strong></td>'

        info.append(data);
      }

      

      
    });
  });
});

/*function apiCall(any) {
  console.log('function called');
  var data = any;
  console.log(data);

  $.post(
    '/api/query',
    {
      data: data
    },
    function(data, status) {
      alert('Data: ' + data + '\nStatus: ' + status);
    }
  ).then(function() {
    console.log('sent info to controller');
    // Reload the page to get the updated list
    location.reload();
  });
};*/
