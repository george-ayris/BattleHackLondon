define(["durandal/app", "plugins/http", "knockout"], function (app, http, ko) {
    var vm = {};
    vm.canActivate = function() {
        if (app.loggedIn) {
            return true;
        }
        return true;
    }

    // Want to put a default date in, but bringing in jquery appears to break it
    //$('inputDate').attr("placeholder",new Date()).format("dd/mm/yy");

    vm.name = ko.observable('');
    vm.sport = ko.observable('');
    vm.description = ko.observable('');
    vm.date = ko.observable('');
    vm.minPeople = ko.observable('');
    vm.maxPeople = ko.observable('');
    vm.cost = ko.observable('');

    vm.createEvent = function() {
        console.log(vm.date());
        var createEventUrl = "events"
        var postResultPromise = http.post(app.rootUrl + createEventUrl,
            {
                name: vm.name,
                sport: vm.sport,
                description: vm.description,
                date: vm.sport,
                minPeople: vm.minPeople,
                maxPeople: vm.maxPeople,
                cost: vm.cost
            },
            app.headers);
        postResultPromise.done( function(resp) {
            console.log("post success", resp);
        });
        postResultPromise.fail( function(resp) { console.log("event post failed", resp) } );
    };

    return vm;
});
