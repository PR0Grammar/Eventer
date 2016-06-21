$(document).ready(function(){
    moveRight();
    idealTemp();
    locationSet();
    currentLocationSet();
    randomBoxColors();
    resizeBlocks();
    $(window).resize(function() {
        resizeBlocks();
    })
});


//Boxes

function randomBoxColors(){
    var colors = ["#7FDBFF","#0074D9","#001f3f","#39CCCC","#3D9970","#2ECC40","#01FF70","#FFDC00","#FF851B","#FF4136","#85144b","#F012BE","#B10DC9","#AAAAAA","#DDDDDD"];
    $(".box").each(function(){
        $(this).css('background', colors[Math.floor(Math.random()*colors.length)]);
    });
}

function resizeBlocks(){
    $('.box').height($('.box').width()/3);
    //do the same thing for the width so it fits smaller.
}

// function clickBoxes(){
    
// }

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
        var temperature= $("#idealTemp").val(); //use this for the conditionals 
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
        if(zipcode==""){
            alert("Enter a Zipcode")
            locationSet().stop()

        }
        else if(isNaN(zipcode)){
            alert("Enter a Valid Zipcode")
            locationSet().stop()
        }
        else if(zipcode.length>5 || zipcode.length<5){
            alert("Enter a Valid Zipcode")
            locationSet().stop()
        }
        else{
            var url="https://maps.googleapis.com/maps/api/geocode/json?address="+zipcode+"&key=AIzaSyD_-eLfqpSYqLRJBiDKv2ve2GP7HO-8hH4";
            $.getJSON(url,function(data){
                var city=data.results[0].address_components[1].long_name
                var zip= data.results[0].address_components[0].long_name
                var country=data.results[0].address_components[5].short_name
                $('#locationDisplay').text("Your Location:"+city+","+zip)
                getForecast(latitude,longitude);
            })
        }
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
            var city=data.results[0].address_components[2].long_name;
            var zip= data.results[0].address_components[7].long_name;
            var country=data.results[0].address_components[6].short_name;
            $('#locationDisplay').text("Your Location:"+city+","+zip);
            getForecast(latitude,longitude);
    });
}

//OpenWeather

function getForecast(latitude, longitude){
    var api_key="623c7e489e6b97e211bd1d20ccea234d";
    var url="http://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&units=imperial&appid="+api_key;
        $.getJSON(url, function(data) {
        console.log(data.list);
        $.each(data,function(key,list){
            for(var i=0; i<list.length; i++){
                if(data.list[i].dt_txt.includes("12:00:00")){
                console.log(data.list[i].main.temp);
                 var temperature=data.list[i].main.temp;
                    var weather_condition=data.list[i].weather[0].main;
                    console.log(temperature);
                    console.log(weather_condition);
                    console.log(idealOutdoorTemp);
                    movieCondition(temperature,weather_condition,idealOutdoorTemp);
                    campCondition(temperature, weather_condition,idealOutdoorTemp);
                    parkCondition(temperature, weather_condition,idealOutdoorTemp);
                    eatingCondition(temperature,weather_condition,idealOutdoorTemp);
                    beachCondition(temperature,weather_condition,idealOutdoorTemp);
                    volunteerCondition(temperature,weather_condition,idealOutdoorTemp);
        // console.log(data);
        // $.each(data.list,function(i,value){
        //     for(i = 0; i< data.list.length; i++){
        //         if(data.list[i].dt_txt.includes("21:00:00")){
        //             var temperature=data.list[i].main.temp;
        //             var weather_condition=data.list[i].weather[0].main;
        //             console.log(temperature);
        //             console.log(weather_condition);
        //             console.log(idealOutdoorTemp);
        //             movieCondition(temperature,weather_condition,idealOutdoorTemp);
        //             campCondition(temperature, weather_condition,idealOutdoorTemp);
        //             parkCondition(temperature, weather_condition,idealOutdoorTemp);
        //             eatingCondition(temperature,weather_condition,idealOutdoorTemp);
        //             beachCondition(temperature,weather_condition,idealOutdoorTemp);
        //             volunteerCondition(temperature,weather_condition,idealOutdoorTemp);
        //             // var formatted = $.datepicker.formatDate("M d, yy", new Date(data.list[i].dt_txt));
        //             // console.log(formatted);
        //         }
                }
            }
        });
     });
 
}

var idealOutdoorTemp;
function outputUpdate(temp) {
	document.querySelector('#temp').value = temp;
	idealOutdoorTemp = temp;
}


//function callBack (data) {
//console.log(data);
       
//}



function movieCondition (temp,cond,ideal){
    
    if(cond!=="Rain" && cond!=="Snow" && temp>=ideal && temp<125) {
        $("#movies").append("<li>" + data.list.dt_txt + "</li>");
    }
    //var formatted = $.datepicker.formatDate("M d, yy", new Date(data.list[i].dt_txt));
    //console.log(formatted);
}

function campCondition (temp,cond,ideal){
       if(cond!=="Snow" && cond!=="Extreme" && temp>=ideal && temp<125) {
           
        $("#camping").append("<li>" + data.list.dt_txt + "</li>");
    }
}

function parkCondition (temp,cond,ideal){
       if(cond!=="Snow" && cond!=="Rain" && cond!=="Clouds" && temp>=ideal && temp<125) {
        $("#park").append("<li>" + data.list.dt_txt + "</li>");
    }
}

function eatingCondition (temp,cond,ideal){
       if(cond!=="Snow" && temp>=ideal && temp<100) {
        $("#eat").append("<li>" + data.list.dt_txt + "</li>");
    }
}

function beachCondition(temp,cond,ideal){
       if(cond!=="Snow" && cond!=="Rain" && cond!=="Cloud" && temp>=ideal && temp<125) {
        $("#eat").append("<li>" + data.list.dt_txt + "</li>");
    }
}

function volunteerCondition(temp,cond,ideal){
       if(cond!=="Snow" && cond!=="Rain"  && temp>=ideal && temp<125) {
        $("#volunteer").append("<li>" + data.list.dt_txt + "</li>");
    }    
}


//forecast api key: 3ddb23835e53ec2d153442d4df34c0d7
