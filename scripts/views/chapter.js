/**
 * This is a chapters view
 */
define([
    'api',
    'views/baseview',
    'utils/helpers',
    'utils/plugins'
], function (Api, BaseView, Helpers) {
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
        onInit: function (e) {
            //HANDLE CLICK TO DISPLAY CORRECT CONTENT VIEW
            var contents = e.view.element.find('.content');
            e.view.element.find('.sections').kendoMobileButtonGroup({
                select: function () {
                    //SWITCH LIST ON BUTTON SELECT
                    contents.hide()
                        .eq(this.selectedIndex)
                        .show();
                },
                index: 0
            });
        },

        onShow: function (e) {
            //CACHE VIEW FOR LATER USE
            context.view = e.view;

            //RESET SCROLL AND MENUS
            context.reset(e, {
                id: e.view.params.id,
                type: 'Chapter'
            });

            //GET REQUESTED ITEM
            Api.getChapter(e.view.params.id)
                .done(function (data) {
                    //UPDATE HEADER TITLE
                    var template = kendo.template('#= transliteration #');
                    e.view.header.find('[data-role="navbar"]')
                        .data('kendoMobileNavBar')
                        .title(template(data));

                    //GET LIST VIEW
                    var infoItems = e.view.element.find('.km-listview.info')
                        .data('kendoMobileListView')
                        .items();

                    //POPULATE DATA
                    infoItems.eq(0).find('span').text(data.arabic);
                    infoItems.eq(1).find('span').text(data.id);
                    infoItems.eq(2).find('span').text(data.verses);
                    infoItems.eq(3).find('span').text(data.chronology);
                    infoItems.eq(4).find('span').text(data.juz);
                    infoItems.eq(5).find('span').text(data.sajdah || 'none');
                });
        },

        onExplanationShow: function (e) {
            //CACHE VIEW FOR LATER USE
            context.view = e.view;

            //GET CHAPTER ITEM
            Api.getChapter(e.view.params.chapter)
                .done(function (data) {
                    //UPDATE HEADER TITLE
                    var template = kendo.template('#= transliteration #');
                    e.view.header.find('[data-role="navbar"]')
                        .data('kendoMobileNavBar')
                        .title(template(data));
                });

            //POPULATE DATA
            Api.getExplanation({ source: e.view.params.source })
                .done(function (data) {
                    e.view.element.find('.prologue').html(data.description);
                });

            //RESET SCROLL AND MENUS
            context.reset(e);
        },

        toogleFavorite: function (e) {
            var me = this;

            //GET REQUESTED ITEM
            Api.getChapter(context.view.params.id)
                .done(function (data) {
                    //UPDATE FAVORITE BUTTON
                    BaseView.fn.toggleFavorite.call(me, context, null, {
                        id: parseInt(data.id),
                        type: 'Chapter',
                        name: data.transliteration,
                        description: 'Chapter ' + data.id + ': ' + data.translation,
                        url: 'views/chapters/detail.html?id=' + data.id
                    });
                });
        },

        reset: function (e, data) {
            //CALL BASE METHOD
            BaseView.fn.reset.call(this, e, data);

            //SELECT FIRST BUTTON AS DEFAULT
            e.view.element.find('.sections')
                .data('kendoMobileButtonGroup')
                .select(0);

            //SELEST FIRST LIST VIEW AS DEFAULT
            e.view.element.find('.content')
                .hide()
                .eq(0)
                .show();
        }
    });

    //RETURN VIEW
    return new View();
});