define(['plugins/router', "durandal/app"], function (router, app) {
    app.headers = { Authorization: "BATTLEHACK 5f2e6a9b7936f2844eacedd402ca5ee7c11acce4" }
    app.rootUrl = "https://sports-battlehack-london.herokuapp.com/";
    return {
        router: router,

        activate: function () {
            router.map([
                { route: '', moduleId: 'viewmodels/login', title: 'Log In', nav: false },
                { route: 'dashboard', hash: '#/dashboard', moduleId: 'viewmodels/dashboard', nav: true },
                { route: 'profile', hash: '#/profile', moduleId: 'viewmodels/profile', nav: true },
                { route: 'newEvent', hash: '#/newEvent', moduleId: 'viewmodels/newEvent', nav: false },
                { route: 'events/:id', moduleId: 'viewmodels/events', nav: false },
                { route: 'register', hash: '#/register', moduleId: 'viewmodels/register', nav: false },
                /*{durandal:routes}*/
            ]).buildNavigationModel();

            return router.activate();
        }
    };
});
