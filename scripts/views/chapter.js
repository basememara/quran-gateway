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
                    //TRIGGER BACK BUTTON IF NO CONTENT AVAILABLE
                    if (contents.eq(this.selectedIndex).length === 0)
                        App.kendo.navigate('#:back');

                    //SWITCH LIST ON BUTTON SELECT
                    contents.hide()
                        .eq(this.selectedIndex)
                        .show();
                },
                index: 0
            });
        },

        onShow: function (e) {
            //GET REQUESTED ITEM
            Api.getChapter(this.params.id)
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

            //RESET SCROLL AND MENUS
            context.reset(e);
        },

        onExegesisShow: function (e) {
            //POPULATE DATA
            Api.getExplanation({ source: e.view.params.source })
                .done(function (data) {
                    e.view.element.find('.intro').html(data.description);
                });

            //RESET SCROLL AND MENUS
            context.reset(e);
        },

        reset: function (e) {
            //CALL BASE METHOD
            BaseView.fn.reset.call(this, e);

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