// get data from weather API from zip code entered
var musicSearch
var track

$("#submit").click('',function(event){
    event.preventDefault();
    var zip = $("#zip-search").val();
    $('#zip-search').val('');
    if (zip != '' && zip.length === 5){
        $.getJSON("https://api.openweathermap.org/data/2.5/weather",
            {
                zip: zip,
                units:"imperial",
                appid: 'c62c589b58a2e10da10e80500357e444'
            },
            function renderResults(data){  
                    console.log(data);
                    let weatherData = displayWeather(data);
                    $('.results').html(weatherData);
                    track = data.weather[0].main;
            });
   } else{$('.error').html(`<div class="error" data-dismiss="error">*Please enter a valid zip code</div>`)}     
 })

function displayWeather(data) {
    return `
    <div class="weather-container">
        <h2 class="weather-header">Current Weather for ${data.name}</h2>
        <img class = "icon" src='http://openweathermap.org/img/w/${data.weather[0].icon}.png'>
        <p class weather-info>${data.weather[0].main}</p>
        <p class="weather-info">Current Temperature ${data.main.temp} &#176 F</p>
    </div>
    `
}


// use data collected from weather API as search term for last.fm playlists



    $.ajax({
    type : 'POST',
    url : 'https://ws.audioscrobbler.com/2.0/',
    data : 'method=track.search&' +
           'track=sunny&' +
           'api_key=ef758ff691b807ea741f804fc59e8c2e&' +
           'limit=9&' +
           'format=json',
    dataType : 'jsonp',
    success : function(data) {
        console.log(data)
        $('.results').html(data)
        }
    });

// diplay search results from playlist query

// iframe with playlist that's selected from results
