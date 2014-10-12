define(["durandal/app", "plugins/router", "plugins/http", "knockout"], function(app, router, http, ko) {
    var vm = {};

    console.log(router.activeInstruction().params[0]);

    return vm;
});
