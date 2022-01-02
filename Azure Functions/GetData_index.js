var jwt = require('jsonwebtoken');

module.exports = async function (context, req, inputDocument) {
    context.log('GetData function called');
    
    if(req.headers.authorization == undefined)
    {
        context.res = {
            status: 401,
            body: "Unauthorized access"
        };
    }
    else
    {
        var decoded = jwt.decode(req.headers.authorization);
        if(decoded.emails[0] !== req.query.email)
        {   
            context.res = {
                status: 401,
                body: "Cannot access other users data"
            };
        }
        else
        {
            if (req.query.email) {
                context.res = {
                    body: inputDocument
                };
            }
            else {
                context.res = {
                    status: 400,
                    body: "Please pass email on the query string"
                };
            }
        }
    }
};