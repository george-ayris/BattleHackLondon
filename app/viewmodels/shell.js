define(['plugins/router', "durandal/app"], function (router, app) {

    app.rootUrl = "https://sports-battlehack-london.herokuapp.com/";
    return {
        router: router,

        activate: function () {
            router.map([
                { route: '', moduleId: 'viewmodels/login', title: 'Log In', nav: false },
                { route: 'dashboard', hash: '#/dashboard', moduleId: 'viewmodels/dashboard', nav: true },
                { route: 'login', hash: '#/login', moduleId: 'viewmodels/login', title: 'Log In', nav: false },
                { route: 'profile', hash: '#/profile', moduleId: 'viewmodels/profile', nav: true },
                { route: 'newEvent', hash: '#/newEvent', moduleId: 'viewmodels/newEvent', nav: false },
                { route: 'events/:id', moduleId: 'viewmodels/events', nav: false },
                { route: 'register', hash: '#/register', moduleId: 'viewmodels/register', nav: false },
            ]).buildNavigationModel();

            return router.activate();
        }
    };
});
