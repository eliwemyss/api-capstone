// get data from weather API from zip code entered
var musicSearch

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
                    let musicSearch = data.weather[0].main;
            });
   } else{$('.error').html(`<div class="error">*Please enter a valid zip code</div>`)}     
 })

function displayWeather(data) {
    return `
    <div class="weather-container">
        <h2 class="weather-header">Current Weather for ${data.name}</h2>
        <p class weather-info>${data.weather[0].main}<span><img class="icon" src='http://openweathermap.org/img/w/${data.weather[0].icon}.png'></span></p>
        <p class="weather-info">Current Temperature ${data.main.temp}</p>
    </div>
    `
}

http://ws.audioscrobbler.com/2.0/?method=track.search&track={musicSearch}&api_key=ef758ff691b807ea741f804fc59e8c2e&format=json
// also want to display current weather on the side


// use data collected from weather API as search term for last.fm playlists

function getMusic(musicSearch) {
    $.getJSON("http://ws.audioscrobbler.com/2.0/?method=track.search",
    {
        track: musicSearch,
        limit: 9,
        api_key: 'ef758ff691b807ea741f804fc59e8c2e'
    },
    function renderMusicResults(music) {
        console.log(music)
    }
    )
}    

// $.ajax({
//     type : 'POST',
//     url : 'http://ws.audioscrobbler.com/2.0/',
//     data : 'method=artist.getinfo&' +
//            'artist=After+The+Burial&' +
//            'api_key=57ee3318536b23ee81d6b27e36997cde&' +
//            'format=json',
//     dataType : 'jsonp',
//     success : function(data) {
//         // Handle success code here
//     },
//     error : function(code, message){
//         // Handle error here
//     }
// });

// diplay search results from playlist query

// iframe with playlist that's selected from results
