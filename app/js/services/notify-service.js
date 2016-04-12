'use strict';

trackerApp
    .factory('notifyService',
    function () {
        return {
            showInfo: function(msg) {
                noty({
                    text: msg,
                    type: 'info',
                    layout: 'topCenter',
                    timeout: 1000}
                );
            },
            showError: function(msg, serverError) {
                noty({
                    text: msg + "</br>" + serverError ,
                    type: 'error',
                    layout: 'topCenter',
                    timeout: 5000}
                );
            }
        }
    }
);
