define([
	'jquery',
	'toastr'
], function ($, toastr) {

    return {
        initLoading: function (message, timeout) {
            App.kendo.showLoading();
        },

        exitLoading: function () {
            App.kendo.hideLoading();
        },

        success: function (message, title) {
            toastr.success(message, title);
        },

        info: function (message, title) {
            toastr.info(message, title);
        },

        warning: function (message, title, icon, timeout) {
            toastr.warning(message, title);
        },

        error: function (message, title) {
            toastr.error(message, title);
        }
    };
});