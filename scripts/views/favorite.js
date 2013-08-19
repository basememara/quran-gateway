/**
 * This is a favorite modal
 */
define([
    'underscore',
    'api',
    'views/basemodal'
], function (_, Api, BaseModal) {

    var Modal = BaseModal.extend({

        //EVENTS
        onOpen: function (e) {
            var me = this;

            //INITIALIZE VARIABLES
            var btn = e.target.closest('a');
            var data = Api.getFavorite({
                id: btn.data('favorite-id'),
                type: btn.data('favorite-type')
            });
            var name = _.truncate(_.stripTags(data.name), 18);

            //PASS VARIABLES TO BASE FOR PROCESSING
            BaseModal.fn.onOpen.call(me, e, name, data.description);
        }

    });

    //RETURN VIEW
    return new Modal();
});