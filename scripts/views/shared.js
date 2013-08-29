/**
 * This is a shared view
 */
define([
    'views/baseview'
], function (BaseView) {
    var context = null;

    var View = BaseView.extend({
        view: null,
        videoPlayer: null,
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

            //RESET MEDIA, SCROLL, AND MENUS
            context.reset.call(this, e);

            //UPDATE VIDEO SOURCE
            e.view.element.find('iframe')
                .attr('src', decodeURIComponent(this.params.url));

            //UPDATE HEADER TITLE
            e.view.header.find('[data-role="navbar"]')
                .data('kendoMobileNavBar')
                .title(decodeURIComponent(this.params.title));
        },

        onVideoShow: function (e) {
            var me = this;

            //CACHE VIEW FOR LATER USE
            context.view = e.view;

            //RESET MEDIA, SCROLL, AND MENUS
            context.reset.call(this, e);

            //UPDATE VIDEO SOURCE
            e.view.element.find('video source')
                .attr('src', decodeURIComponent(this.params.url));            //INITIALIZE AUDIO            e.view.element.find('video').load();            //SET AUDIO TITLE            e.view.element.find('h2')                .html(decodeURIComponent(this.params.title));
        },
        
        onAudioShow: function (e) {
            var me = this;

            //CACHE VIEW FOR LATER USE
            context.view = e.view;

            //RESET MEDIA, SCROLL, AND MENUS
            context.reset.call(this, e);

            //UPDATE AUDIO SOURCE
            e.view.element.find('audio source')
                .attr('src', decodeURIComponent(this.params.url));            //INITIALIZE AUDIO            e.view.element.find('audio').load();            //SET AUDIO TITLE            e.view.element.find('h2')                .html(decodeURIComponent(this.params.title));
        },

        reset: function (e) {
            //STOP ALL EXISTING PLAYING MEDIA
            $('video, audio').each(function () {
                this.pause();
            });

            //RESET SCROLL AND MENUS
            BaseView.fn.reset.call(this, e);
        }

    });

    //RETURN VIEW
    return new View();
});