define(["durandal/app", "plugins/http"], function (app, http) {
    var vm = {};

    vm.canActivate = function() {
        if (app.loggedIn) {
            return true;
        }
        return { redirect:'#/login' };
    }

    vm.newEvent = function() {
        $('button').prop('disabled', true);
    }

    vm.activate = function() {
        // http get request
        var userEventsUrl = "users/" + app.userId + "/events"
        var userEvents = http.get(app.rootUrl + userEventsUrl, {}, app.headers);
        userEvents.done( function (resp) {
            console.log(resp);
            vm.events = resp.data;
        });
        userEvents.fail( function () {
            console.log("Couldn't retrieve user events")
        });

        return userEvents;
    }

    vm.attached = function() {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            console.log(pos);
            var nearEventsUrl = "events/near";
            console.log(pos.lat() + "," + pos.lng());
            var nearEvents = http.post(app.rootUrl + nearEventsUrl,
                {
                    loc: pos.lat() + "," + pos.lng(),
                    dis: 1
                },
                app.headers);

            nearEvents.done(function (resp) {
                console.log("got near events", resp);
                if (resp.data) {
                    $.each(resp.data, function (index, value) {
                        console.log(value.location.lat);
                        var markerOptions = {
                            position: { lat: value.location.lat, lng: value.location.lng },
                            map: vm.map,
                            icon: "http://res.cloudinary.com/dpohsnuyj/image/upload/v1413107192/pink_MarkerA_plweu2.png"
                        }
                        var data = "<a href='#/events/" + value.id + "'>" + value.title + "</a>";
                        var currentMarker = new google.maps.Marker(markerOptions);
                        var currentInfoWindow = new google.maps.InfoWindow({
                          content: data
                        });
                        google.maps.event.addListener(currentMarker, 'click', function() {
                            currentInfoWindow.open(vm.map, currentMarker);
                        });
                    });
                }
            });

            console.log(position.coords.lat);
            var mapOptions = {
                center: pos,
                zoom: 10
            };
            vm.map = new google.maps.Map(document.getElementById('large-map-canvas'), mapOptions);
            console.log("map created");

            var markerOptions = {
                position: pos,
                map: vm.map
            }
            vm.myLocation = new google.maps.Marker(markerOptions);

            return nearEvents;
        });
    };
    return vm;
});
