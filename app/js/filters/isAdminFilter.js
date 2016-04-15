'use strict';

trackerApp
    .filter('admin', function() {
    return function (input) {
        switch (input) {
            case 'true' : return 'Is Admin'; break;
            case 'false' : return 'Is not Admin'; break;
        }
    }
});