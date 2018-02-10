$(document).ready(function() {
  moveRight();
  idealTemp();
  locationSet();
  currentLocationSet();
  randomBoxColors();
  resizeBlocks();
  $(window).resize(function() {
    resizeBlocks();
  });

  $('#calendar').fullCalendar({
    // put your options and callbacks here
  });
});

//Boxes

function randomBoxColors() {
  var colors = [
    '#7FDBFF',
    '#0074D9',
    '#001f3f',
    '#39CCCC',
    '#3D9970',
    '#2ECC40',
    '#01FF70',
    '#FFDC00',
    '#FF851B',
    '#FF4136',
    '#85144b',
    '#F012BE',
    '#B10DC9',
    '#AAAAAA',
    '#DDDDDD',
  ];
  $('.box').each(function() {
    $(this).css(
      'background',
      colors[Math.floor(Math.random() * colors.length)],
    );
  });
}

function resizeBlocks() {
  $('.box').height($('.box').width() / 3);
  //do the same thing for the width so it fits smaller.
}

// function clickBoxes(){

// }

//Cloud Animation
function moveLeft() {
  $('#movingImg').animate({ left: '-=30%' }, 2000, 'swing', moveRight);
}

function moveRight() {
  $('#movingImg').animate({ left: '+=30%' }, 2000, 'swing', moveLeft);
}

//Ideal Temp
function idealTemp() {
  $('.btn-set').click(function() {
    var temperature = $('#idealTemp').val(); //use this for the conditionals
    numberCheck(temperature);
    tempDisplay(temperature);
  });
}

function numberCheck(temp) {
  if (isNaN(temp)) {
    alert('Enter a number');
    idealTemp().stop();
  } else if (temp > 149) {
    alert('Too Hot!');
    idealTemp().stop();
  } else if (temp == '') {
    alert('Enter a number');
    idealTemp().stop();
  } else if (temp < 20) {
    alert('Too Cold!');
    idealTemp().stop();
  }
}

function tempDisplay(temp) {
  $('#tempDisplay').text('Your Ideal Temperature: ' + temp);
}

//Location

function locationSet() {
  $('.btn-setLoc').click(function() {
    var zipcode = $('#zipcodeForm').val();
    if (zipcode == '') {
      alert('Enter a Zipcode');
      locationSet().stop();
    } else if (isNaN(zipcode)) {
      alert('Enter a Valid Zipcode');
      locationSet().stop();
    } else if (zipcode.length > 5 || zipcode.length < 5) {
      alert('Enter a Valid Zipcode');
      locationSet().stop();
    } else {
      var url =
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        zipcode +
        '&key=AIzaSyD_-eLfqpSYqLRJBiDKv2ve2GP7HO-8hH4';
      $.getJSON(url, function(data) {
        var city = data.results[0].address_components[1].long_name;
        var zip = data.results[0].address_components[0].long_name;
        var country = data.results[0].address_components[5].short_name;
        $('#locationDisplay').text('Your Location:' + city + ',' + zip);
        getForecast(latitude, longitude);
      });
    }
  });
}

function currentLocationSet() {
  const locationDisplay = document.getElementById('locationDisplay');
  const geoBtn = document.getElementById('geolocation');
  geoBtn.addEventListener('click', getLocation);
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = 'Geolocation is not supported by this browser.';
    }
  }
  function showPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    getZip(lat, long);
  }
}

function getZip(latitude, longitude) {
  var url =
    'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
    latitude +
    ',' +
    longitude +
    '&key=AIzaSyD_-eLfqpSYqLRJBiDKv2ve2GP7HO-8hH4';
  $.getJSON(url, function(data) {
    const formattedAddress = data.results[1].formatted_address;
    $('#locationDisplay').text('Your Location:' + formattedAddress);
    getForecast(latitude, longitude);
  });
}

//OpenWeather

function getForecast(latitude, longitude) {
  var api_key = '623c7e489e6b97e211bd1d20ccea234d';
  var url =
    'http://api.openweathermap.org/data/2.5/forecast?lat=' +
    latitude +
    '&lon=' +
    longitude +
    '&units=imperial&appid=' +
    api_key;
  $.getJSON(url, function(data) {
    for (let i = 0; i < data.list.length; i++) {
      // if(data.list[i].dt_txt.includes(''))
      const date = data.list[i].dt_txt;
      const condition = data.list[i].weather[0].main;
      const conditionDesc = data.list[i].weather[0].description;
      const mainTemp = data.list[i].main.temp;
      const completeWeatherInfo = `At ${date} the temperature is ${mainTemp}. It can best be described as ${conditionDesc}. That means mainly ${condition}.`;
      console.log(completeWeatherInfo);
      console.log('---------------------------------------------');
    }
  });
}

var idealOutdoorTemp;
function outputUpdate(temp) {
  document.querySelector('#temp').value = temp;
  idealOutdoorTemp = temp;
}

function movieCondition(temp, cond, ideal) {
  if (cond !== 'Rain' && cond !== 'Snow' && temp >= ideal && temp < 125) {
    $('#movies').append('<li>' + data.list[i].dt_txt + '</li>');
  }
  //var formatted = $.datepicker.formatDate("M d, yy", new Date(data.list[i].dt_txt));
  //console.log(formatted);
}

function campCondition(temp, cond, ideal) {
  if (cond !== 'Snow' && cond !== 'Extreme' && temp >= ideal && temp < 125) {
    $('#camping').append('<li>' + data.list[i].dt_txt + '</li>');
  }
}

function parkCondition(temp, cond, ideal) {
  if (
    cond !== 'Snow' &&
    cond !== 'Rain' &&
    cond !== 'Clouds' &&
    temp >= ideal &&
    temp < 125
  ) {
    $('#park').append('<li>' + data.list[i].dt_txt + '</li>');
  }
}

function eatingCondition(temp, cond, ideal) {
  if (cond !== 'Snow' && temp >= ideal && temp < 100) {
    $('#eat').append('<li>' + data.list[i].dt_txt + '</li>');
  }
}

function beachCondition(temp, cond, ideal) {
  if (
    cond !== 'Snow' &&
    cond !== 'Rain' &&
    cond !== 'Cloud' &&
    temp >= ideal &&
    temp < 125
  ) {
    $('#eat').append('<li>' + data.list[i].dt_txt + '</li>');
  }
}

function volunteerCondition(temp, cond, ideal) {
  if (cond !== 'Snow' && cond !== 'Rain' && temp >= ideal && temp < 125) {
    $('#volunteer').append('<li>' + data.list[i].dt_txt + '</li>');
  }
}

//forecast api key: 3ddb23835e53ec2d153442d4df34c0d7
