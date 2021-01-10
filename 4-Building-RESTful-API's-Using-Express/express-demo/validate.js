
function validate(req, res, next) {
    console.log('Authenticating...');
    next();
}

module.exports = validate;