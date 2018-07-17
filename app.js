// get data from weather API from zip code entered
$(".search").submit('',function(event){
    event.preventDefault();
    var zip = $("#zip-search").val();
    $('#zip-search').val('');
    if (zip != '' && zip.length === 5){
        $('.error').html('')
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
                     getMusicData(data.weather[0].main);
                     // catchError(data)

            });
   } else{$('.error').html(`<div class="error">*Please enter a valid zip code</div>`)}
 })

// function catchError(error) {
//     if (error.cod){
//         return $('.error').html(`<div class="error">*Please enter a valid zip code</div>`)
//     }
// }

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

function getMusicData(music){
    $.ajax({
    type : 'GET',
    url : 'https://ws.audioscrobbler.com/2.0/',
    data : 'method=track.search&' +
           'track=' + music + '&' +
           'api_key=ef758ff691b807ea741f804fc59e8c2e&' +
           'limit=9&' +
           'format=json',
    dataType : 'jsonp',
    success : function(music) {
        console.log(music)
        let musicData = displayMusic(music)
        $('.music-results').html(musicData)

        }
    });

}

function displayMusic(music){


for (i = 0; i > music.results.trackmatches.length; i++);

   return` 
   <div class="music-results">
        <h2>Choose Songs</h2>
        <img class="thumbnail" src="${music.results.trackmatches.track[0].image[2]["#text"]}">
        <a class="caption" href="${music.results.trackmatches.track[0].url}">
        <div class="caption">${music.results.trackmatches.track[0].artist}</div>
        <div class="caption">${music.results.trackmatches.track[0].name}</div>
        <img class="thumbnail" src="${music.results.trackmatches.track[1].image[2]["#text"]}">
        <a class="caption" href="${music.results.trackmatches.track[1].url}">
        <div class="caption">${music.results.trackmatches.track[1].artist}</div>
        <div class="caption">${music.results.trackmatches.track[1].name}</div>
        <img class="thumbnail" src="${music.results.trackmatches.track[2].image[2]["#text"]}">
        <a class="caption" href="${music.results.trackmatches.track[2].url}">
        <div class="caption">${music.results.trackmatches.track[2].artist}</div>
        <div class="caption">${music.results.trackmatches.track[2].name}</div>
        <div>
        `
}


// diplay search results from playlist query

// iframe with playlist that's selected from results
