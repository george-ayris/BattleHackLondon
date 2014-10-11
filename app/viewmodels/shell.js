﻿define(['plugins/router', "durandal/app"], function (router, app) {
    return {
        router: router,

        search: function() {
            app.showMessage("Not Implemented", "Error");
        },

        activate: function () {
            router.map([
                { route: '', moduleId: 'viewmodels/logIn', title: 'Log In', nav: false },
                { route: 'dashboard', hash: '#/dashboard', moduleId: 'viewmodels/dashboard', nav: true },
                { route: 'profile', moduleId: 'viewmodels/profile', nav: true },
                { route: 'newEvent', moduleId: 'viewmodels/newEvent', nav: false },
                { route: 'event/:id', moduleId: 'viewmodels/event', nav: false },
                /*{durandal:routes}*/
            ]).buildNavigationModel();

            return router.activate();
        }
    };
});
