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

    vm.returnedEvents = false;
    vm.loggedIn = app.loggedIn;
    console.log(vm.loggedIn);

    vm.activate = function() {

        // http get request
        var getUserEventsUri = "/users/" + app.userId + "/events"
        var userEvents = http.get(getUserEventsUri);
        userEvents.done( function (data) { console.log(data) } );
        userEvents.fail( function () { console.log("Couldn't retrieve user events") } );

    }
    return vm;
});
