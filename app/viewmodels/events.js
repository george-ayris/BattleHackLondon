define(["durandal/app", "plugins/http", "plugins/router", "knockout", "jquery"], function (app, http, router, ko, $) {
    var vm = {};

    vm.activate = function() {
        var eventUrl = "events/" + router.activeInstruction().params[0];

        var getRequest = http.get(app.rootUrl + eventUrl, {}, app.headers);

        getRequest.done(function (resp) {
            console.log(router.activeInstruction().params[0]);
            console.log(resp);
            var data = resp.data;
            vm.eventTitle = data.title;
            vm.dateAndTime = data.activity + " on " + data.date;
            vm.description = data.desc;
            vm.users = data.users;
            //vm.numPeople = data.users.length;
            vm.minPeople = data.min;
            vm.maxPeople = data.max;
            vm.pricePerPerson = "£" + (data.price/vm.numPeople).toFixed(2);
        });

        getRequest.fail(function () { console.log("event get failed") } );

        return getRequest;
    };

    return vm;
});
