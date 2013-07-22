/**
 * This is a progress view
 */
define([
    'views/baseview',
    'text!../../views/progress/_chapters.html',
    'data/datasourcechapters'
], function (BaseView, chaptersTemplate) {

    var View = BaseView.extend({

        //EVENTS
        onRecitationShow: function (e) {
            this.element.find('.listview').kendoMobileListView({
                dataSource: new kendo.ui.DataSourceChapters(),
                template: chaptersTemplate,
                style: 'inset'
            });

            //RESET SCROLL AND MENUS
            BaseView.fn.reset.call(this, e);
        },

        onMemorizationShow: function (e) {
            this.element.find('.listview').kendoMobileListView({
                dataSource: new kendo.ui.DataSourceChapters(),
                template: chaptersTemplate,
                style: 'inset'
            });

            //RESET SCROLL AND MENUS
            BaseView.fn.reset.call(this, e);
        }

    });

    //RETURN VIEW
    return new View();
});