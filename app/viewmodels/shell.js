define(['plugins/router', "durandal/app"], function (router, app) {
    return {
        router: router,

        search: function() {
            app.showMessage("Not Implemented", "Error");
        },

        activate: function () {
            router.map([
                { route: '', moduleId: 'viewmodels/logIn', title: 'Log In', nav: true },
                { route: 'dashboard', moduleId: 'viewmodels/dashboard', nav: true },
                { route: 'newEvent', moduleId: 'viewmodels/newEvent', nav: false },
                /*{durandal:routes}*/
            ]).buildNavigationModel();

            return router.activate();
        }
    };
});
