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
            if (data) context.toggleFavorite(e, Api.isFavorite(data));
        },

        toggleFavorite: function (e, toggle, data) {
            var btnFavorite = e.view.header.find('.km-button.favorite .km-icon');
            if (btnFavorite.length == 0) btnFavorite = this.element;

            //HANDLE TOGGLE VALUE IF APPLICABLE
            if (toggle == null) toggle = !Api.getFavorite(data);

            //UPDATE FAVORITE ICON
            if (toggle === true) {
                //UPDATE INTERFACE
                if (btnFavorite.length > 0) {
                    if (btnFavorite.hasClass('km-add'))
                        btnFavorite.removeClass('km-add').addClass('km-mostrecent');
                    else if (btnFavorite.hasClass('km-rowinsert'))
                        btnFavorite.removeClass('km-rowinsert').addClass('km-rowdelete');
                }

                //ADD FAVORITE IF APPLICABLE
                if (data) Api.addFavorite(data);
            } else if (toggle === false) {
                //UPDATE INTERFACE
                if (btnFavorite.length > 0) {
                    if (btnFavorite.hasClass('km-mostrecent'))
                        btnFavorite.removeClass('km-mostrecent').addClass('km-add');
                    else if (btnFavorite.hasClass('km-rowdelete'))
                        btnFavorite.removeClass('km-rowdelete').addClass('km-rowinsert');
                }

                //REMOVE FROM FAVORITE IF APPLICABLE
                if (data) Api.removeFavorite(data);
            }
        }
    });

    return BaseView;
});