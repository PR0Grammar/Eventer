$(document).ready(function(){
    moveRight();
    idealTemp();
    locationSet();
    currentLocationSet();
});


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
}


function tempDisplay(temp) {
   $("#tempDisplay").text("Your Ideal Temperature: " + temp);
}

//Location

function locationSet () {
    $('.btn-latLon').click(function() {
        
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
    var url="http://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&sensor=true&callback=zipmap";
    $.getJSON(url,function(data){
        console.log(data)
    })
    
}
