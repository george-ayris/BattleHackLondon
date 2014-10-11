define(["durandal/app", "plugins/http", "plugins/router", "knockout", "jquery"], function (app, http, router, ko, $) {
    // Get data from server


    // var data = {
    //     title: "Ooh football",
    //     desc: "A bit of footy",
    //     users: [
    //         { name: "Jim", id: "2"},
    //         { name: "Steve", id: "1"},
    //         { name: "Clara", id: "4"}
    //     ],
    //     date: "08/04/2015",
    //     minPeople: 4,
    //     maxPeople: 10,
    //     sport: "football",
    //     price: 10
    // };
    var vm = {};

    vm.activate = function() {
        var eventUrl = "events/445915f95c2947e5a70619f9ec61219d";
        var userUrl = "profile/ecbf9d0767d04e619289e25018ae48e6";

        var getRequest = http.get(rootUrl + eventUrl, {}, app.headers);

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
