/**
 * This is a verse view
 */
define([
    'underscore',
    'api',
    'views/baseview',
    'jplaylist'
], function (_, Api, BaseView) {
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
        onShow: function (e) {
            //CACHE VIEW FOR LATER USE
            context.view = e.view;

            //RESET SCROLL AND MENUS
            BaseView.fn.reset.call(this, e, {
                id: parseInt(e.view.params.id),
                type: 'Verses'
            });

            //RESET AUDIO SELECTION
            var audioControls = e.view.element.find('[data-role="buttongroup"]');
            audioControls.data('kendoMobileButtonGroup').select(1);

            //GET REQUESTED ITEMS
            $.when(Api.getVerse(e.view.params.id), Api.getChapter(e.view.params.chapter))
                .done(function (verse, chapter) {
                    //INITIALIZE VARIABLES
                    verse.range = verse.start;
                    if (verse.end) verse.range += '-' + verse.end;
                    var title = context.view.params.title
                        ? decodeURIComponent(context.view.params.title)
                        : '[Quran, ' + chapter.id + ':' + verse.range + ']';

                    //UPDATE HEADER TITLE
                    e.view.header.find('[data-role="navbar"]')
                        .data('kendoMobileNavBar')
                        .title(title);

                    //BIND CONTENT
                    e.view.element.find('.arabic').html(verse.arabic);
                    e.view.element.find('.translation').html(verse.translation);

                    //BIND VERSE DETAILS
                    var template = kendo.template('#= chapter.transliteration # (#= chapter.translation #)<br />[#= chapter.id #:#= verse.range #]');
                    e.view.element.find('.range small').html(template({ chapter: chapter, verse: verse }));

                    //HANDLE QUR'AN CLICK
                    $('.quran').attr('href', 'http://beta.quranexplorer.com/#' + chapter.id 
                        + '/' + verse.start + '/' + (verse.end || verse.start) + '/');

                    //INITIALIZE AUDIO IF APPLICABLE
                    if (!context.audioPlayer) {
                        context.audioPlayer = new jPlayerPlaylist({
                            jPlayer: '#jq_jplayer',
                            cssSelectorAncestor: '#jq_jplayer_container'
                        }, [], {
                            supplied: 'mp3',
                            ended: function (e) {
                                //RESET AUDIO CONTROLS TO PAUSE BY CHECKING IF LAST IN PLAYLIST
                                if (e.jPlayer.status.media.mp3 == context.audioPlayer.playlist[context.audioPlayer.playlist.length - 1].mp3) {
                                    audioControls.data('kendoMobileButtonGroup').select(1);
                                    context.audioPlayer.select(0); //REWIND TO START OF PLAYLIST
                                }
                            }
                        });
                    }
                    //BUILD AUDIO PLAYLIST
                    context.audioPlayer.remove();
                    context.audioPlayer.setPlaylist([{
                        mp3: context.getAudioName(chapter.id, verse.start)
                    }]);
                    //ADD RANGE OF AUDIO IF APPLIABLE
                    if (verse.end) {
                        var count = parseInt(verse.start);
                        while (count < parseInt(verse.end)) {
                            context.audioPlayer.add({
                                mp3: context.getAudioName(chapter.id, ++count)
                            })
                        }
                    }

                    //ADD AUDIO DETAILS TO BUTTON GROUP
                    audioControls
                        .data('record-id', e.view.params.id)
                        .data('chapter', chapter.id)
                        .data('start', verse.start)
                        .data('end', verse.end);
                });
        },

        onSelect: function (e) {
            //INITIALIZE VARIABLES
            var id = this.element.data('record-id');
            var chapter = this.element.data('chapter');
            var start = this.element.data('start');
            var end = this.element.data('end');
            var index = this.current().index();
            var player = context.view.element.find('#jq_jplayer');

            switch (index) {
                case 0:
                    context.audioPlayer.play();
                    break;
                case 1:
                    context.audioPlayer.pause();
                    break;
                case 2:
                    console.log(id);
                    break;
                case 3:
                    console.log(id);
                    break;
            }
        },

        toggleFavorite: function (e) {
            var me = this;

            //GET REQUESTED ITEM
            Api.getVerse(context.view.params.id)
                .done(function (data) {
                    var template = kendo.template('<span>#= summary #</span><small>Chapter: #= chapter #, # if (end) { # Verses: #= start # to #= end # # } else { # Verse: #= start # # } #</small>');

                    //EXTEND DATA
                    data.summary = _.truncate(data.translation, 150);
                    data.chapter = context.view.params.chapter;

                    //UPDATE FAVORITE BUTTON
                    BaseView.fn.toggleFavorite.call(me, context, null, {
                        id: parseInt(data.id),
                        type: 'Verses',
                        name: template(data),
                        description: null,
                        url: 'views/verses/detail.html?id=' + data.id
                            + '&chapter=' + context.view.params.chapter
                            + '&title=' + context.view.params.title
                    });
                });
        },

        getAudioName: function (chapter, verse) {
            return verse
                ? 'resources/audio/mohammad_jibreel/'
                    + _.lpad(chapter, 3, '0')
                    + _.lpad(verse, 3, '0')
                    + '.mp3'
                : null;
        }

    });

    //RETURN VIEW
    return new View();
});