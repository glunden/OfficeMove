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

urlparams[origin] = 'ENTER START ADDRESS HERE';
urlparams[arrival_time] = '1509366600';
urlparams[destination] = 'ENTER END ADDRESS HERE';
urlparams[mode] = 'driving';
urlparams[key] = 'ENTER API KEY HERE';

var encodedparams = querystring.stringify(urlparams);

//set options for http request

var options = {
  hostname: 'maps.googleapis.com',
  port: 443,
  path: '/maps/api/directions/json?' + encodedparams,
  method: 'GET'
};

//execute api call

var req = https.request(options, (res) => {
  console.log('STATUS: ' + res.statusCode);

	var responseString = ''

	  res.on('data', (d) => {
	    responseString += d;
	  });

	  res.on('end', function() {
		var parsedJson = JSON.parse(responseString)
		fs.appendFileSync('commute.csv', parsedJson.routes[0].legs[0].start_address + ", " + Math.round((parsedJson.routes[0].legs[0].duration.value)/60) + '\r\n')
		console.log('Success: File created')	 
	  });
	})

	req.on('error', (e) => {
	  console.error(e);
	});

req.end();
