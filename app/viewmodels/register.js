define(["durandal/app", "plugins/router", "plugins/http", "knockout"], function(app, router, http, ko) {
    app.loggedIn = false;
    var vm = {};

    vm.email = ko.observable('');
    vm.password = ko.observable('');
    vm.firstName = ko.observable('');
    vm.lastName = ko.observable('');
    vm.DOB = ko.observable('');
    vm.address = ko.observable('');
    vm.locality = ko.observable('');
    vm.region = ko.observable('');
    vm.postCode = ko.observable('');
    vm.phone = ko.observable('');

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
            last_name: vm.lastName,
            date_of_birth: vm.DOB,
            address: {
                street_address: vm.address,
                locality: vm.locality,
                region: vm.region,
                postal_code: vm.postCOde
            },
            phone_number: phone
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
                 $('button').prop('disabled', false);
             }
        });
        postResultPromise.fail( function() {
            console.log("post failed");
            $('button').prop('disabled', true);
        });
    };

    return vm;
});
