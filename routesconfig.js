let mainFolder = __dirname,
    folders = {
        app: mainFolder,
        controllers: mainFolder + '/controllers',
        publicFolder: mainFolder + '/public',
        routes: mainFolder + '/routes',
        styleheets: mainFolder + 'public/stylesheets'
    };

let RoutesConfig = {
    folders: folders,
    routes: folders.routes + '/routes',
    database: {
        path: mainFolder + '/db/db.json'
    },
    controllers: {
        onform: folders.controllers + '/form',
        actions: folders.controllers + '/actions'
    },

    getController: function(name) {
        return this.controllers.hasOwnProperty(name) ? require(this.controllers[name]) : false;
    },

    getRoutes: function() {
        console.log("Requiring route: " + this.routes);
        return require(this.routes);
    }
};
module.exports = RoutesConfig;