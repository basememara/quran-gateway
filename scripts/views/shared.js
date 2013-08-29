/**
 * This is a shared view
 */
define([
    'views/baseview'
], function (BaseView) {
    var context = null;

    var View = BaseView.extend({
        view: null,
        audioPlayer: null,

        //CONSTRUCTOR
        init: function () {
            BaseView.fn.init.call(this);

            //CACHE CONTEXT FOR LATER
            context = this;
        },

        //EVENTS
        onStreamShow: function (e) {
            //CACHE VIEW FOR LATER USE
            context.view = e.view;

            //RESET SCROLL AND MENUS
            BaseView.fn.reset.call(this, e);

            //UPDATE VIDEO SOURCE
            e.view.element.find('iframe')
                .attr('src', decodeURIComponent(this.params.url));

            //UPDATE HEADER TITLE
            e.view.header.find('[data-role="navbar"]')
                .data('kendoMobileNavBar')
                .title(decodeURIComponent(this.params.title));
        },

        onVideoShow: function (e) {

        },
        
        onAudioShow: function (e) {
            var me = this;

            //CACHE VIEW FOR LATER USE
            context.view = e.view;

            //RESET SCROLL AND MENUS
            BaseView.fn.reset.call(this, e);
            
            //INITIALIZE AUDIO IF APPLICABLE
            if (!context.audioPlayer) {
                context.audioPlayer = e.view.element.find('#jquery_jplayer_1').jPlayer({
                    ready: function (event) {
                        $(this).jPlayer('setMedia', {
                            mp3: me.params.url
                        });
                    },
                    supplied: 'mp3',
                    smoothPlayBar: true
                });
            } else {
                e.view.element.find('#jquery_jplayer_1').jPlayer('setMedia', {
                    mp3: this.params.url
                });
            }            //SET AUDIO TITLE            e.view.element.find('.jp-title')                .html(decodeURIComponent(this.params.title));
        }

    });

    //RETURN VIEW
    return new View();
});