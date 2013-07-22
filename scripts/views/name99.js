/**
 * This is a name 99 modal
 */
define([
    'views/basemodal'
], function (BaseModal) {

    var Modal = BaseModal.extend({

        //EVENTS
        onOpen: function (e) {
            //INITIALIZE VARIABLES
            var title = e.target.data('title');
            var content = e.target.data('content');

            //PASS VARIABLES TO BASE FOR PROCESSING
            BaseModal.fn.onOpen.call(this, e, title, content);
        }

    });

    //RETURN VIEW
    return new Modal();
});