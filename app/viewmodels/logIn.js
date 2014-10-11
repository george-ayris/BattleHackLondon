define(["durandal/app", "plugins/router"], function(app, router) {
    app.loggedIn = false;
    var vm = {};

    vm.logIn = function() {
            app.loggedIn = true;
            router.navigate('dashboard');
    };

    return vm;
});
