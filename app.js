// get data from weather API from zip code entered
var response

$("#submit").click('',function(event){
    event.preventDefault();
    var zip = $("#zip-search").val();
    $('#zip-search').val('');
    if (zip != '' && zip.length === 5){
        $.getJSON("http://api.openweathermap.org/data/2.5/weather",
            {
                zip: zip,
                units:"imperial",
                appid: 'c62c589b58a2e10da10e80500357e444'
            },
            function renderResults(data){  
                    console.log(data);
                    let weatherData = displayWeather(data);
                    $('.results').html(weatherData);
            });
   } else{$('.results').html(`<div class="error-alert">Please enter a valid zip code</div>`)}     
 })

function displayWeather(data) {
    return `
    <div class="weather-container">
        <h2>Current Weather for ${data.name}</h2>
        <h3><img class="icon" src='http://openweathermap.org/img/w/${data.weather[0].icon}.png'></h3>
        <h3>${data.weather[0].main}</h3>
        <h3>Current Temperature ${data.main.temp}</h3>
    </div>
    `
}


// also want to display current weather on the side


// use data collected from weather API as search term for last.fm playlists

function getMusic(data) {
    let MUSIC_API_KEY = 'ef758ff691b807ea741f804fc59e8c2e'
    $.getJSON('http://ws.audioscrobbler.com/2.0/?method=track.search&track',
    {
        format: json,
        api_key: MUSIC_API_KEY
    },
    function musicResults(data){
        console.log(data)
    });
}

// diplay search results from playlist query

// iframe with playlist that's selected from results
