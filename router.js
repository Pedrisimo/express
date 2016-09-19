"use strict";
let config = require('./routesconfig');

exports.match = function(request, response, pathname, postData) {
    console.log("request:" + request);
    console.log("pathname:" + pathname);
    console.log("postData:" + postData);
    let isRoute = config.getRoutes();
    console.log("getRoutes:" + isRoute.pattern);
    let isRouteExists = config.getRoutes().some(
        function(route)
            {   console.log("request_methods: " + request.method);
                console.log("router_route_pattern: " + route.pattern);
                console.log("router_route_methods: " + route.methods);
                console.log("router_route_action: " + route.action);
                console.log("DEBUG: " + route.methods.indexOf(request.method));
                console.log("search: " + pathname.search('^' + route.pattern + '$'));
                if (-1 !== route.methods.indexOf(request.method) && -1 !== pathname.search('^' + route.pattern + '$'))
                    {
                        let controller = route.action.split('::')[0],
                        action = route.action.split('::')[1];
                        config.getController(controller)[action](request, response, pathname, postData);
                        return true;
                     }
            });

    if (!isRouteExists) {
        config.getController('home').getAction(request, response);
    }
};