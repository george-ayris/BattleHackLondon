define(["durandal/app", "plugins/http"], function (app, http) {
    var vm = {};

    vm.canActivate = function() {
        if (app.loggedIn) {
            return true;
        }
        return { redirect:'#/login' };
    }

    vm.newEvent = function() {
        $('button').prop('disabled', true);
    }

    vm.activate = function() {
        // http get request
        var userEventsUrl = "users/" + app.userId + "/events"
        var userEvents = http.get(app.rootUrl + userEventsUrl, {}, app.headers);
        userEvents.done( function (resp) {
            console.log(resp);
            vm.events = resp.data;
        });
        userEvents.fail( function () {
            console.log("Couldn't retrieve user events") });

        return userEvents;
    }
    return vm;
});
