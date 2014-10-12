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
        var tokenUrl = "payment/token";

        var tokenRequest = http.get(app.rootUrl + tokenUrl, {}, app.headers);

        tokenRequest.done(function (resp) {
            console.log(resp);
            var token = resp.client_token;

            braintree.setup(token, 'dropin', {
                container: 'dropin',
                paymentMethodNonceReceived: function (event, nonce) {

                }
            });
        });

        var profileRequest = http.get(app.rootUrl + userUrl, {}, app.headers);

        profileRequest.done(function (resp) {
            console.log(resp);

        });

        profileRequest.fail(function() { console.log("profile request failed"); } );

        return profileRequest;
    }
    return vm;
});
