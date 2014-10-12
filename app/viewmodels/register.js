define(["durandal/app", "plugins/router", "plugins/http", "knockout"], function(app, router, http, ko) {
    app.loggedIn = false;
    var vm = {};

    vm.email = ko.observable('');
    vm.password = ko.observable('');

    vm.register = function() {
        var hash = CryptoJS.SHA1(vm.password()).toString();
        var registerUrl = "users/register";
        console.log("hash", hash);
        console.log("email", vm.email());

        var postResultPromise = http.post(app.rootUrl + registerUrl,
        {
            email: vm.email(),
            password: hash
        });
        postResultPromise.done( function(data) {
             console.log(data);
        });
        postResultPromise.fail( function() { console.log("post failed") } );
    };

    return vm;
});
