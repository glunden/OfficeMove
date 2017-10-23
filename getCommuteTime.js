//Use required packages
var https = require('https');
var querystring = require('querystring');
var fs = require('fs');

//set url parameters
var origin = 'origin';
var arrival_time = 'arrival_time';
var destination = 'destination';
var mode = 'mode';
var key = 'key';

var urlparams = {};

urlparams[origin] = 'Rocky Hill, CT';
urlparams[arrival_time] = '1509366600';
urlparams[destination] = 'Hartford, CT';
urlparams[mode] = 'driving';
urlparams[key] = 'AIzaSyCeZrY8CQRWiGBkP7Z6MO9bnAIGIhYmU6U';

var encodedparams = querystring.stringify(urlparams);

//set options for http request

var options = {
  hostname: 'maps.googleapis.com',
  port: 443,
  path: '/maps/api/directions/json?' + encodedparams,
  method: 'GET'
};

//execute api call

function makeCall (options, callback) {
	var req = https.request(options, (res) => {
	  console.log('STATUS: ' + res.statusCode);

		var responseString = ''

		  res.on('data', (d) => {
		    responseString += d;
		  });

		  res.on('end', function() {
			callback = responseString
			
		console.log('Callback: ' + responseString)	
			 
		  });
		})

		req.on('error', (e) => {
		  console.error(e);
		});

	req.end();
}

function handleResults(results){
    var parsedJSON = json.parse(results)
    fs.appendFileSync('commute.csv', parsedJSON.routes[0].legs[0].start_address + ", " + Math.round((parsedJSON.routes[0].legs[0].duration.value)/60) + '\r\n')
	console.log('Success: File created')	
}

makeCall(options, function(results){
    console.log('results:',results);
    handleResults(results);        
});


//fs.appendFileSync('commute.csv', parsedJson.routes[0].legs[0].start_address + ", " + Math.round((parsedJson.routes[0].legs[0].duration.value)/60) + '\r\n')	 