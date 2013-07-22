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

        onShow: function () {
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

                });
        }
    });

    //RETURN VIEW
    return new View();
});