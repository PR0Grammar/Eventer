$(document).ready(function(){
    moveRight();
    idealTemp();
    locationSet();
    currentLocationSet();
    resizeBlocks();
    $(window).resize(function() {
        resizeBlocks();
    })
    clickBoxes();
});

//boxes

function resizeBlocks(){
    $('.color1').height($('.color1').width()/2);
    $('.color2').height($('.color2').width()/2);
    $('.color3').height($('.color3').width()/2);
    $('.color4').height($('.color4').width()/2);
    $('.color5').height($('.color1').width()/2);
    $('.color6').height($('.color1').width()/2);
}

function clickBoxes(){
    $("#box1").click(function(){
        alert ("clickerino");
    }); 
}

//Cloud Animation
function moveLeft() {
    $("#movingImg").animate({left: "-=30%"}, 2000, "swing", moveRight);
    
}

function moveRight() {
    $("#movingImg").animate({left: "+=30%"}, 2000, "swing", moveLeft);
}

//Ideal Temp
function idealTemp(){
    $(".btn-set").click(function(){
        var temperature= $("#idealTemp").val();
        numberCheck(temperature);
        tempDisplay(temperature);
    });
}

function numberCheck(temp){
    if(isNaN(temp)) {
        alert("Enter a number");
        idealTemp().stop()
    }
    else if(temp > 149){
        alert("Too Hot!");
        idealTemp().stop();
    } 
    else if (temp == "") {
        alert("Enter a number");
        idealTemp().stop();
    }
    else if(temp<20){
        alert("Too Cold!");
        idealTemp().stop();
    }
}


function tempDisplay(temp) {
   $("#tempDisplay").text("Your Ideal Temperature: " + temp);
}

//Location

function locationSet () {
    $('.btn-setLoc').click(function() {
        var zipcode= $("#zipcodeForm").val();
        var url="https://maps.googleapis.com/maps/api/geocode/json?address="+zipcode+"&key=AIzaSyD_-eLfqpSYqLRJBiDKv2ve2GP7HO-8hH4";
        $.getJSON(url,function(data){
            var city=data.results[0].address_components[1].long_name
            var zip= data.results[0].address_components[0].long_name
            $('#locationDisplay').text("Your Location:"+city+","+zip)
            //USE WEATHER FUNCTION HERE WITH ZIP CODE
    })
    })
}

function currentLocationSet() {
    $(".btn-curLoc").click(function() {
    var locDiv=$("#locationDisplay")
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        locDiv.text("Geolocation is not supported by this browser.");
        currentLocationSet().stop();
    }
    function showPosition(position) {
        var lat=position.coords.latitude;
        var long=position.coords.longitude;
        getZip(lat,long);
    }
  });
}

function getZip(latitude,longitude){
    var url="https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&key=AIzaSyD_-eLfqpSYqLRJBiDKv2ve2GP7HO-8hH4";
    $.getJSON(url,function(data){
            var city=data.results[0].address_components[2].long_name
            var zip= data.results[0].address_components[7].long_name
            $('#locationDisplay').text("Your Location:"+city+","+zip)
            //USE WEATHER FUNCTION HERE WITH ZIP CODE
    })
    
}

//OpenWeather

function getForecast(zipcode){
    var url="http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID={APIKEY}"

}
//api key for openweathermap = 623c7e489e6b97e211bd1d20ccea234d


