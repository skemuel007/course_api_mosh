function log(req, res, next){
    console.log('Logging...');
    next(); // pass control
};

module.exports = log;