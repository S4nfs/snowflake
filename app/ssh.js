var exec = require('node-ssh-exec');


exports.virtualsList = function(req, res, next) {

    var config = {
        host: req.param.selectedComputer.ip,
        username: req.param.selectedComputer.login,
        password: req.param.selectedComputer.password
    },
    command = 'virsh list --inactive --all';
    exec(config, command, function (error, response) {
        if (error) {
            throw error;
        }
        response = parseResponse(response);
        // req.param.virtlist = response;
        // next();
        res.json(response);

    });
}



exports.clone = function(req, res, next) {

    console.log("old name: " + req.params.old);
    console.log("new name: " + req.params.new);
    var config = {
        host: req.param.selectedComputer.ip,
        username: req.param.selectedComputer.login,
        password: req.param.selectedComputer.password
    },

    command = 'virt-clone -o '+req.params.old+ ' -n ' + req.params.new +' --auto-clone';

    exec(config, command, function (error, response) {
        if (error) {
            res.redirect('/');
            // throw error;
        }
        res.redirect('/virt-list/'+config.host);
    });
}


exports.run = function(req, res, next) {

    console.log("Starting  " + req.params.virt);
    var config = {
        host: req.param.selectedComputer.ip,
        username: req.param.selectedComputer.login,
        password: req.param.selectedComputer.password
    },

    command = 'virsh start '+req.params.virt;

    exec(config, command, function (error, response) {
        if (error) {
            res.redirect('/');
            // throw error;
        }
        res.redirect('/virt-list/'+config.host);
    });
}

exports.resume = function(req, res, next) {

    console.log("Resuming  " + req.params.virt);
    var config = {
        host: req.param.selectedComputer.ip,
        username: req.param.selectedComputer.login,
        password: req.param.selectedComputer.password
    },

    command = 'virsh resume '+req.params.virt;

    exec(config, command, function (error, response) {
        if (error) {
            res.redirect('/');
            // throw error;
        }
        res.redirect('/virt-list/'+config.host);
    });
}

exports.shutdown = function(req, res, next) {

    console.log("stopping: " + req.params.virt);
    var config = {
        host: req.param.selectedComputer.ip,
        username: req.param.selectedComputer.login,
        password: req.param.selectedComputer.password
    },

    command = 'virsh destroy '+req.params.virt ;

    exec(config, command, function (error, response) {
        if (error) {
            res.redirect('/');
            // throw error;
        }
        res.redirect('/virt-list/'+config.host);
    });
}

exports.reboot = function(req, res, next) {
    console.log("virt name: " + req.params.virt);
    var config = {
        host: req.param.selectedComputer.ip,
        username: req.param.selectedComputer.login,
        password: req.param.selectedComputer.password
    },

    command = 'virsh reboot '+req.params.virt;

    exec(config, command, function (error, response) {
        if (error) {
            res.redirect('/');
            // throw error;
        }
        res.redirect('/virt-list/'+config.host);
    });
}

exports.delete = function(req, res, next) {
    console.log("virt name: " + req.params.virt);
    var config = {
        host: req.param.selectedComputer.ip,
        username: req.param.selectedComputer.login,
        password: req.param.selectedComputer.password
    },

    command = 'virsh undefine '+req.params.virt;

    exec(config, command, function (error, response) {
        if (error) {
            res.redirect('/');
            // throw error;
        }
        res.redirect('/virt-list/'+config.host);
    });
}

exports.snapshot = function(req, res, next) {
    console.log("virt name: " + req.params.virt);
    console.log("Snapshot name: " + req.params.name);
    var config = {
        host: req.param.selectedComputer.ip,
        username: req.param.selectedComputer.login,
        password: req.param.selectedComputer.password
    },

    command = 'virsh snapshot-create-as '+req.params.virt + ' "' +req.params.name +  '" /var/tmp/snapshots/';

    exec(config, command, function (error, response) {
        if (error) {
            res.redirect('/');
            // throw error;
        }
        res.redirect('/virt-list/'+config.host);
    });
}


exports.pause = function(req, res, next) {
    console.log("virt name: " + req.params.virt);
    var config = {
        host: req.param.selectedComputer.ip,
        username: req.param.selectedComputer.login,
        password: req.param.selectedComputer.password
    },

    command = 'virsh suspend '+req.params.virt;

    exec(config, command, function (error, response) {
        if (error) {
            res.redirect('/');
            // throw error;
        }
        res.redirect('/virt-list/'+config.host);
    });
}


function parseResponse(arr) {
    arr = arr.split('----------------------------------------------------');


    //prepare array
    delete arr[0];
    var result = arr[1];
    result = result.replace(/\s\s+/g, ',');
    result = result.split(',');
    delete result[0];

    
    
    var results = [];

    var i = 2;
    var id = 0;
    while(i<result.length-2) {

        var cssClass = setCssClass(result[i+1]);
        
        results[id] = { name: result[i], status: result[i+1], cssClass: cssClass };
        id++;
        i = i+3;
    }
    return results;
}

function setCssClass(status) {
    switch(status) {
        case "paused":
            return "btn-info";
            break;
        case "running":
            return "btn-success";
            break;
        case "shut off":
            return "btn-danger";
            break;
        default:
            return "btn-primary";
    }
}