/**
 * This is a chapters view
 */
define([
    'views/baseview',
    'utils/helpers',
    'utils/storage',
    'utils/plugins'
], function (BaseView, Helpers, Storage) {

    var View = BaseView.extend({

        //EVENTS
        onInit: function () {
            //HANDLE CLICK TO DISPLAY CORRECT LIST VIEW
            var listviews = this.element.find('.km-listview');
            this.element.find('.chapter-sections').kendoMobileButtonGroup({
                select: function () {
                    //SWITCH LIST ON BUTTON SELECT
                    listviews.hide()
                        .eq(this.selectedIndex)
                        .show();
                },
                index: 0
            });
        },

        onShow: function (e) {
            var me = this;

            //GET REQUESTED ITEM
            Storage.getChapterById(this.params.id)
                .done(function (data) {
                    //UPDATE HEADER TITLE
                    var template = kendo.template('#= name #');
                    me.header.find('[data-role="navbar"]')
                        .data('kendoMobileNavBar')
                        .title(template(data));

                    //BIND DATA
                    var infoItems = me.element.find('.listview-info')
                        .data('kendoMobileListView')
                        .items();
                    infoItems.eq(0).find('span').text(data.arabic);
                    infoItems.eq(1).find('span').text(data.id);
                    infoItems.eq(2).find('span').text(data.verses);
                    infoItems.eq(3).find('span').text(data.chronology);
                    infoItems.eq(4).find('span').text(data.juz);
                    infoItems.eq(5).find('span').text(data.sajdas || 'none');
                });

            //SELECT FIRST BUTTON AS DEFAULT
            this.element.find('.chapter-sections')
                .data('kendoMobileButtonGroup')
                .select(0);

            //SELEST FIRST LIST VIEW AS DEFAULT
            this.element.find('.km-listview')
                .hide()
                .eq(0)
                .show();

            //RESET SCROLL AND MENUS
            BaseView.fn.reset.call(this, e);
        }
    });

    //RETURN VIEW
    return new View();
});