/**
 * This is a hadith modal
 */
define([
    'api',
    'views/basemodal'
], function (Api, BaseModal) {

    var Modal = BaseModal.extend({

        //EVENTS
        onOpen: function (e) {
            var me = this;

            //INITIALIZE VARIABLES
            var id = e.target.closest('a').data('hadith-id');

            Api.getHadith(id)
                .done(function (data) {
                    var content = 'Sources: ' + data.source;

                    //ADD NOTES IF AVAILABLE
                    if (data.note)
                        content = data.note + '<br /><br />' + content;

                    //PASS VARIABLES TO BASE FOR PROCESSING
                    BaseModal.fn.onOpen.call(me, e, 'References', content);
                });
        }

    });

    //RETURN VIEW
    return new Modal();
});