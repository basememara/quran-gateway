/**
 * This is a base view
 */
define([
    'jquery'
], function ($) {

    //CREATE BASE CLASS FOR LATER INHERITANCE
    var BaseView = kendo.Class.extend({

        //CONSTRUCTOR CALLED ON NEW INSTANCES
        init: function () {
            //MUST CALL BELOW IN DERIVED CLASSES IF NEEDED
            //BaseView.fn.init.call(this);
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

        reset: function (e) {
            //SCROLL TO TOP ON PAGE LOAD
            e.view.scroller.reset();

            //CLEAR ACTIVE TAB STRIP
            e.view.footer.find('[data-role="tabstrip"]')
                .data('kendoMobileTabStrip')
                .clear();
        }
    });

    return BaseView;
});