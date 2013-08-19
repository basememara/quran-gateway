/**
 * This is a verse view
 */
define([
    'underscore',
    'api',
    'views/baseview'
], function (_, Api, BaseView) {
    var context = null;

    var View = BaseView.extend({
        view: null,

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

            //GET REQUESTED ITEMS
            $.when(Api.getVerse(e.view.params.id), Api.getChapter(e.view.params.chapter))
                .done(function (verse, chapter) {
                    //INITIALIZE VARIABLES
                    verse.range = verse.start;
                    if (verse.end) verse.range += '-' + verse.end;

                    //UPDATE HEADER TITLE
                    e.view.header.find('[data-role="navbar"]')
                        .data('kendoMobileNavBar')
                        .title('[Quran, ' + chapter.id + ':' + verse.range + ']');

                    //BIND CONTENT
                    e.view.element.find('.arabic').html(verse.arabic);
                    e.view.element.find('.translation').html(verse.translation);

                    //BIND VERSE DETAILS
                    var template = kendo.template('Chapter #= chapter.id #: #= chapter.transliteration # (#= chapter.translation #), Verse: #= verse.range #');
                    e.view.element.find('.range small').html(template({ chapter: chapter, verse: verse }));
                });

            //RESET SCROLL AND MENUS
            BaseView.fn.reset.call(this, e, {
                id: parseInt(e.view.params.id),
                type: 'Verses'
            });
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
                    });
                });
        }

    });

    //RETURN VIEW
    return new View();
});