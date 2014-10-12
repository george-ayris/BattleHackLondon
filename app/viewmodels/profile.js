define(["durandal/app", "plugins/http", "knockout", "braintree"], function (app, http, ko, braintree) {
    // Get data from server
    var vm = {};

    vm.canActivate = function() {
        if (app.loggedIn) {
            return true;
        }
        return { redirect:'#/login' };
    }

    vm.activate = function() {
        var userUrl = "profile/" + app.userId;


        var profileRequest = http.get(app.rootUrl + userUrl, {}, app.headers);

        profileRequest.done(function (resp) {
            console.log(resp);
            vm.firstName = resp.data.first_name;
            vm.lastName = resp.data.last_name;
            vm.email = resp.data.email;
            vm.nonce = resp.data.braintree_token;
        });

        profileRequest.fail(function() { console.log("profile request failed"); } );

        return profileRequest;
    };

    vm.attached = function() {
        if (!vm.nonce) {
            var tokenUrl = "payment/token";

            var tokenRequest = http.get(app.rootUrl + tokenUrl, {}, app.headers);

            tokenRequest.done(function (resp) {
                console.log(resp);
                var token = resp.client_token;

                braintree.setup(token, 'dropin', {
                    container: 'dropin',
                    paymentMethodNonceReceived: function (event, nonce) {
                        console.log("nonce", nonce);
                        var nonceUrl = "payment/add/" + nonce;
                        var noncePost = http.post(app.rootUrl + nonceUrl, {}, app.headers);

                        noncePost.done( function(resp) { console.log("successful nonce", resp); });
                        noncePost.fail( function(resp) { console.log("nonce post failed", resp); });
                    }
                });
            });
        }
    };

    return vm;
});
