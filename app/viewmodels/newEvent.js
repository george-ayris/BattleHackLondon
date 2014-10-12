define(["durandal/app", "plugins/http", "plugins/router", "knockout"], function (app, http, router, ko) {
    var returnVM = function () {
        var vm = this;
        vm.canActivate = function() {
            if (app.loggedIn) {
                return true;
            }
            return { redirect:'#/login' };
        }

        vm.attached = function() {
            var mapOptions = {
                center: { lat: 51.5, lng: -0.019},
                zoom: 16
            };
            vm.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        }

        // Want to put a default date in, but bringing in jquery appears to break it
        //$('inputDate').attr("placeholder",new Date()).format("dd/mm/yy");

        vm.name = ko.observable('');
        vm.sport = ko.observable('');
        vm.description = ko.observable('');
        vm.date = ko.observable('');
        vm.minPeople = ko.observable('');
        vm.maxPeople = ko.observable('');
        vm.cost = ko.observable('');
        vm.postCode = ko.observable('');

        vm.postCode.subscribe(function(newPostCode) {
            // geocode
            console.log("postcode updated to", newPostCode);
            var geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + newPostCode + ",+UK&sensor=false";
            var geocodeResult = http.get(geocodeUrl);

            geocodeResult.done(function(resp) {
                console.log(resp);
                var latLng = resp.results[0].geometry.location;
                vm.lat = latLng.lat;
                vm.lng = latLng.lng;
                console.log(vm.lat, vm.lng);

                vm.map.setOptions({
                    center: { lat: vm.lat, lng: vm.lng},
                });
            });
        });

        vm.createEvent = function() {
            var createEventUrl = "events"
            console.log(app.headers)
            var postResultPromise = http.post(app.rootUrl + createEventUrl,
                {
                    title: vm.name,
                    activity: vm.sport,
                    description: vm.description,
                    date: vm.date,
                    min: vm.minPeople,
                    max: vm.maxPeople,
                    price: vm.cost,
                    location: {
                        lat: vm.lat,
                        lng: vm.lng
                    }
                },
                app.headers);
            postResultPromise.done( function(resp) {
                console.log("post success", resp.status_code);
                if (resp.status_code === 201) {
                    router.navigate('#/dashboard');
                }
            });
            postResultPromise.fail( function(resp) { console.log("event post failed", resp) } );
            return postResultPromise;
        };
    };
    return returnVM;
});
