var express = require('express'),
	bodyParser = require('body-parser'),
	ssh = require('./app/ssh'),
	management = require('./app/management'),
	getList = require('./app/pc-list');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false } ));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/app/views/index.html');
})

app.get('/api/computers', getList.computers);

app.post('/api/shutdown/:ip', management.shutdown);
app.get('/api/virtlist/:ip', management.getVirts);

app.listen(7070, function() {
    console.log("Server listening on port %d", 7070);
});