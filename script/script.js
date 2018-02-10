$(document).ready(function() {
  moveRight();
  locationSet();
  currentLocationSet();
  $(window).resize(function() {
    resizeBlocks();
  });

  $('#calendar').fullCalendar({
    // put your options and callbacks here
  });
});

//Cloud Animation
function moveLeft() {
  $('#movingImg').animate({ left: '-=30%' }, 2000, 'swing', moveRight);
}

function moveRight() {
  $('#movingImg').animate({ left: '+=30%' }, 2000, 'swing', moveLeft);
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
