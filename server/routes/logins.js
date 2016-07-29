var users = [
    {id:0 , user:"kauemendes", passwd:"kaue123"},
    {id:1 , user:"admin", passwd:"admin"},
];

exports.findAll = function (req, res, next) {
    res.send(users);
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(users[id]);
};

exports.findByUserNameAndPasswd = function (req, res, next) {
    var _user = req.body.user;
    var _passwd = req.body.passwd;

    for (var user in users) {
      if(users[user]['user'] == _user
      && users[user]['passwd'] == _passwd){
        res.send({'login':true});
        return true;
      }
    }
    res.send({'login':false});
};
