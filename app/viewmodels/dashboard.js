define(["durandal/app", "plugins/http"], function (app, http) {
    var vm = {};

    vm.canActivate = function() {
        if (app.loggedIn) {
            return true;
        }
        // return { redirect:'#/login' };
        return true;
    }

    vm.newEvent = function() {
        $('button').prop('disabled', true);
    }

    vm.returnedNotEvents = true;
    vm.loggedIn = app.loggedIn;
    console.log(vm.loggedIn);

    vm.activate = function() {
        app.userId = "ecbf9d0767d04e619289e25018ae48e6";
        // http get request
        var userEventsUrl = "users/" + app.userId + "/events"
        var userEvents = http.get(app.rootUrl + userEventsUrl, {}, app.headers);
        userEvents.done( function (resp) {
            console.log(resp)
            vm.events = resp.data;
        });
        userEvents.fail( function () { console.log("Couldn't retrieve user events") } );

        return userEvents;
    }
    return vm;
});
