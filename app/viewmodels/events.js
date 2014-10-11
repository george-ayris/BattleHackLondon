define(["durandal/app", "plugins/http", "plugins/router", "knockout", "jquery"], function (app, http, router, ko, $) {
    // Get data from server


    var data = {
        title: "Ooh football",
        desc: "A bit of footy",
        users: [
            { name: "Jim", id: "2"},
            { name: "Steve", id: "1"},
            { name: "Clara", id: "4"}
        ],
        date: "08/04/2015",
        minPeople: 4,
        maxPeople: 10,
        sport: "football",
        price: 10
    };
    var vm = {};

    vm.activate = function() {
        var rootUrl = "https://sports-battlehack-london.herokuapp.com/";
        var eventUrl = "events/445915f95c2947e5a70619f9ec61219d";
        var userUrl = "profile/ecbf9d0767d04e619289e25018ae48e6";
        var headers = { Authorization: "BATTLEHACK 5f2e6a9b7936f2844eacedd402ca5ee7c11acce4" }
        var getRequest = http.get(rootUrl + userUrl, {}, headers);
        getRequest.done(function (data) { console.log(data); } );
        getRequest.fail(function () { console.log("event get failed") } );


        console.log(router.activeInstruction().params[0]);
        console.log(data.title);
        vm.eventTitle = data.title;
        vm.dateAndTime = data.sport + " on " + data.date;
        vm.description = data.desc;
        vm.users = data.users;
        vm.numPeople = data.users.length;
        vm.minPeople = data.minPeople;
        vm.maxPeople = data.maxPeople;
        vm.pricePerPerson = "£" + (data.price/vm.numPeople).toFixed(2);
    };

    return vm;
});
