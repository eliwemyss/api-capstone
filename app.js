// get data from weather API from zip code entered

// function getWeatherAPI(zip) {
	let WEATHER_API_KEY = 'c62c589b58a2e10da10e80500357e444';
	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/weather',
		data: {
			zip: zip,
			units: 'imperial',
			APPID: WEATHER_API_KEY
		},
		success: function(response) {
			$('.results').text(`The weather in ${zip} is ${response.main.temp}`)
			}
		});
	}


function getWeatherData(data){
	$('.results').html(data.items.map(renderResults))
}

function listenSubmit() {
	$('.search').submit(function(event){
		event.preventDefault();
		const searchTarget = $(event.currentTarget).find('#zip-search');
		const search = searchTarget.val();
		searchTarget.val('');
		getWeatherAPI(search, getWeatherData)
	});
}

// also want to display current weather on the side


// use data collected from weather API as search term for Spotify playlists

let searchPlaylists = function (query) {
	$.ajax({
 	url: 'https://api.spotify.com/v1/search',
 	data: {
  			q: 'playlist:' + query,
   			type: 'playlist',
 },
 success: function (response) {
   resultsPlaceholder.innerHTML = template(response);
 	}
  });
};

// diplay search results from playlist query

// iframe with playlist that's selected from results

$(listenSubmit)