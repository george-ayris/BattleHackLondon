define(["durandal/app"], function (app) {
    var vm = {};

    vm.newEvent = function() {
        $('button').prop('disabled', true);
    }

    return vm;
});
