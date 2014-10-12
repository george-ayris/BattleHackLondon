define(["durandal/app", "plugins/router", "plugins/http", "knockout", "jquery"], function(app, router, http, ko, $) {
    app.loggedIn = false;
    var vm = {};

    vm.email = ko.observable('');
    vm.password = ko.observable('');

    vm.login = function() {
        $('button').prop('disabled', true);
        var hash = CryptoJS.SHA1(vm.password()).toString();
        var loginUrl = "users/login";
        console.log("hash", hash);
        console.log("email", vm.email());

        var postResultPromise = http.post(app.rootUrl + loginUrl,
        {
            email: vm.email(),
            password: hash
        });
        postResultPromise.done( function(resp) {
             console.log(resp);
             if (resp.status_code === 200) {
                 app.userId = resp.data.id;
                 app.accessKey = resp.data.access_key;
                 app.headers = { Authorization: "BATTLEHACK " + app.accessKey };
                 app.loggedIn = true;
                 router.navigate('#/dashboard');
             } else {
                 console.log('login failed');
                 $('button').prop('disabled', false);

             }
        });
        postResultPromise.fail( function() {
            console.log("post failed");
            $('button').prop('disabled', false);
            $('button').prop('active', true);
        });
    };

    return vm;
});
