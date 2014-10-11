define(["durandal/app", "plugins/router"], function(app, router) {
    app.loggedIn = false;
    var vm = {};

    vm.logIn = function() {
            app.loggedIn = true;
            app.userId = 3;
            router.navigate('dashboard');
    };

    return vm;
});
