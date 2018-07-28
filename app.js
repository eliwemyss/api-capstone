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
                     pictureAPI(data.weather[0].main);
                     $('.music-container').css('visibility', 'visible')

            }).fail(catchError)
   } else if(zip === undefined){
    console.log(zip)
    return $('.error').html(`<div class="error">*Please enter a valid zip code</div>`)
   }else{$('.error').html(`<div class="error">*Please enter a valid zip code</div>`)}
 })

function catchError(error){
    console.log('error')
    return $('.error').html(`<div class="error">*Zip Code not found</div>`)
}

function displayWeather(data) {
    return `
    <div class="weather-container">
        <h2>Current Weather for ${data.name}</h2>
        <img class = "icon" src='https://openweathermap.org/img/w/${data.weather[0].icon}.png'>
        <p>${data.weather[0].main}</p>
        <p>Current Temperature ${data.main.temp} &#176 F</p>
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
           'limit=16&' +
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
var results = ''


for (var i = 1; i < music.results.trackmatches.track.length; i++) {
 results +=` 
    <div class="music-results col-4">
        <div class="col-4">
        <a href="${music.results.trackmatches.track[i].url}"target="_blank"><img class="thumbnail" src="${music.results.trackmatches.track[i].image[2]["#text"]}">
        <div class="caption">
         <p>${music.results.trackmatches.track[i].artist}</p>
        <p>${music.results.trackmatches.track[i].name}</p>
        </a>
        </div>
        </div>
    </div>`
    $('#footer').css('position', 'relative');
    };

    return results    
}

// adding function to display background image with weather search query

function pictureAPI(data){ 

    var API_KEY = '9519885-4ad5c078aa2fe4ee145599bf0';
    var PICTURE_URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(data);
    $.getJSON(PICTURE_URL, function(data){
    if (parseInt(data.totalHits) > 0)
    $('body').css('background-image', `url(${data.hits[Math.floor((Math.random() * 20) + 1)].largeImageURL})`);
    else
    console.log('No hits');
    });
}

