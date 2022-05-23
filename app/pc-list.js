var computers = [{
        ip: '192.168.0.104',
        username: 'new',
        password: 'nowe123'
}];

exports.computers = function(req, res) {
    res.status(200).json(computers);
}

exports.list = computers;