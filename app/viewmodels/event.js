define(["durandal/app", "plugins/http", "plugins/router", "knockout"], function (app, http, router, ko) {
    // Get data from server
    var data = {
        title: "Ooh football",
        desc: "A bit of footy",
        users: [
            { name: "Jim", id: "2"},
            { name: "Steve", id: "1"}
        ],
        date: "08/04/2015",
        minPeople: 4,
        maxPeople: 10,
        sport: "football",
        price: "£10"
    };
    var vm = {};

    vm.activate = function() {
        console.log(router.activeInstruction().params[0]);
        console.log(data.title);
        vm.eventTitle = data.title;
        vm.dateAndTime = data.sport + " on " + data.date;
        vm.description = data.desc;
    };

    return vm;
});
