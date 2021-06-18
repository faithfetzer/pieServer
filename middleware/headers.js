

module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //1
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE'); //2
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, accept, Authorization'); //3

    next()
}

/*
CORS
cross origin resource sharing
mechanism that uses additional http headers to tell browsers to give a web application running at one origin access to selected resources from a different origin
1-a response header that tells the browser to allow code from any origin
2-a respponse header that specifies the method allowed when accessing the resources to a preflight request
3-a response header thats used in response to a preflight request that indicates with http jheaders can be used during the actual request

preflight requests
a preflight request is a cors request that checks to see if the cors protocol is understood
-automatically issued by a browser
ex client might ask a server if it would allow a delete request before actually sending the delete request
*/