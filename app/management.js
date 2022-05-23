var pclist = require('./pc-list');
var exec = require('node-ssh-exec');

exports.shutdown = function(req, res) {
    console.log(req.params.ip);

    console.log(pclist.list);

    var comp = findComputerbyIP(req.params.ip);
    console.log(comp.username);
    console.log(comp.password);

    var config = {
        host: req.params.ip,
        username: comp.username,
        password: comp.password
    };

    var command = 'echo ' + comp.password + ' | sudo -S shutdown -h now';

    exec(config, command, function(error, response) {
        if (error) {
            console.log("ERROR");
        }
        console.log(response);
        console.log('success');
    });
    res.status(200).json("success");
}


exports.getVirts = function(req, res) {
    console.log(req.params.ip);

    console.log(pclist.list);

    var comp = findComputerbyIP(req.params.ip);
    console.log(comp.username);
    console.log(comp.password);

    var config = {
        host: req.params.ip,
        username: comp.username,
        password: comp.password
    };

    var command = 'cat /home/new/Documents/results/vmlista.txt';

    exec(config, command, function(error, response) {
        if (error) {
            console.log("ERROR");
        }
        console.log(response);
        console.log('success');

    	res.status(200).json(response);
    });
    
}

function findComputerbyIP(ip) {
    var obj = pclist.list.filter(function(obj) {
        return obj.ip === ip;
    })[0];
    return obj;
}