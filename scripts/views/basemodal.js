/**
 * This is a base modal
 */
define([
    'jquery'
], function ($) {

    //CREATE BASE CLASS FOR LATER INHERITANCE
    var BaseModal = kendo.Class.extend({

        //CONSTRUCTOR CALLED ON NEW INSTANCES
        init: function () {
            //MUST CALL BELOW IN DERIVED CLASSES IF NEEDED
            //BaseModal.fn.init.call(this);
        },

        //EVENTS
        onInit: function (e) {

        },

        onOpen: function (e, title, content) {
            //ADD TITLE TO HEADER
            this.header.find('[data-role="navbar"]')
                .data('kendoMobileNavBar')
                .title(title);

            //GET TRANSLATION AND INJECT TO DOM
            this.element.find('.content').html(content);
        },

        onClose: function (e) {
            //GET MODAL
            var modal = e.target.closest('.km-modalview')
                .data('kendoMobileModalView');

            //CLEAR CONTENT FOR NEXT REQUEST
            modal.element.find('.content').empty();
            modal.header.find('[data-role="navbar"]')
                .data('kendoMobileNavBar')
                .title('');

            //CLOSE MODAL
            modal.close();
        }
    });

    return BaseModal;
});