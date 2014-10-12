define(["durandal/app", "plugins/http", "plugins/router", "knockout"], function (app, http, router, ko) {
    var vm = {};
    vm.canActivate = function() {
        if (app.loggedIn) {
            return true;
        }
        return { redirect:'#/login' };
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
        var createEventUrl = "events"
        console.log(app.headers)
        var postResultPromise = http.post(app.rootUrl + createEventUrl,
            {
                title: vm.name,
                activity: vm.sport,
                description: vm.description,
                date: vm.sport,
                min: vm.minPeople,
                max: vm.maxPeople,
                price: vm.cost
            },
            app.headers);
        postResultPromise.done( function(resp) {
            console.log("post success", resp);
            if (resp.status_code === 201) {
                router.navigate('#/dashboard');
            }
        });
        postResultPromise.fail( function(resp) { console.log("event post failed", resp) } );
        return postResultPromise;
    };

    return vm;
});
