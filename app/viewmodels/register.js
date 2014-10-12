define(["durandal/app", "plugins/router", "plugins/http", "knockout"], function(app, router, http, ko) {
    app.loggedIn = false;
    var vm = {};

    vm.email = ko.observable('');
    vm.password = ko.observable('');
    vm.firstName = ko.observable('');
    vm.lastName = ko.observable('');

    vm.register = function() {
        $('button').prop('disabled', true);
        var hash = CryptoJS.SHA1(vm.password()).toString();
        var registerUrl = "users/register";
        console.log("hash", hash);
        console.log("email", vm.email());

        var postResultPromise = http.post(app.rootUrl + registerUrl,
        {
            email: vm.email,
            password: hash,
            first_name: vm.firstName,
            last_name: vm.lastName
        });
        postResultPromise.done( function(resp) {
             console.log(resp);
             if (resp.status_code === 200) {
                 console.log('successful reg')
                 app.userId = resp.data.id;
                 app.accessKey = resp.data.access_key;
                 app.headers = { Authorization: "BATTLEHACK " + app.accessKey };
                 app.loggedIn = true;
                 router.navigate('#/dashboard');
             } else {
                 console.log('registration failed');
             }
        });
        postResultPromise.fail( function() { console.log("post failed") } );
    };

    return vm;
});
