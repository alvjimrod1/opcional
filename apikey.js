var apikeyObject = {};
module.exports = apikeyObject;
var api_key = "sos1718-09";


apikeyObject.checkApiKey = function(req, res) {
        if (!req.query.apikey) {
            console.error('WARNING: No apikey was sent!');
            res.sendStatus(401);
            return false;
        }
        if (req.query.apikey !== api_key) {
            console.error('WARNING: Incorrect apikey was used!');
            res.sendStatus(403);
            return false;
        }
        return true;
};