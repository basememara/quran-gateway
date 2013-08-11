/**
 * This is a base view
 */
define([
    'jquery',
    'api'
], function ($, Api) {
    var context = null;

    //CREATE BASE CLASS FOR LATER INHERITANCE
    var BaseView = kendo.Class.extend({

        //CONSTRUCTOR CALLED ON NEW INSTANCES
        init: function () {
            //MUST CALL BELOW IN DERIVED CLASSES IF NEEDED
            //BaseView.fn.init.call(this);

            //CACHE CONTEXT FOR LATER
            context = this;
        },

        //EVENTS
        onInit: function (e) {

        },

        onBeforeShow: function (e) {

        },

        onAfterShow: function (e) {

        },

        onShow: function (e) {

        },

        onHide: function (e) {

        },

        reset: function (e, data) {
            //SCROLL TO TOP ON PAGE LOAD
            e.view.scroller.reset();

            //CLEAR ACTIVE TAB STRIP
            e.view.footer.find('[data-role="tabstrip"]')
                .data('kendoMobileTabStrip')
                .clear();

            //UPDATE FAVORITE BUTTON IF APPLICABLE
            if (data) context.toggleFavorite(e, !!Api.getFavorite(data));
        },

        toggleFavorite: function (e, toggle, data) {
            var btnFavorite = e.view.header.find('.km-button.favorite .km-icon');

            //HANDLE TOGGLE VALUE IF APPLICABLE
            if (toggle == null) toggle = !Api.getFavorite(data);

            //UPDATE FAVORITE ICON
            if (toggle === true) {
                //UPDATE INTERFACE
                if (btnFavorite.length > 0) btnFavorite.removeClass('km-add').addClass('km-mostrecent');

                //ADD FAVORITE IF APPLICABLE
                if (data) Api.addFavorite(data);
            } else if (toggle === false) {
                //UPDATE INTERFACE
                if (btnFavorite.length > 0) btnFavorite.removeClass('km-mostrecent').addClass('km-add');

                //REMOVE FROM FAVORITE IF APPLICABLE
                if (data) Api.removeFavorite(data);
            }
        }
    });

    return BaseView;
});