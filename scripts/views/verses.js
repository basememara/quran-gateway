/**
 * This is a verses view
 */
define([
    'views/baseview',
    'text!../../views/verses/_list.html',
    'data/datasourceverses'
], function (BaseView, listTemplate) {

    var View = BaseView.extend({

        //EVENTS
        onInit: function () {
            this.element.find('.listview').kendoMobileListView({
                dataSource: new kendo.ui.DataSourceVerses(),
                template: listTemplate,
                headerTemplate: 'Chapter ${value}',
                fixedHeaders: true
            });
        },

        onShow: function (e) {
            //RESET SCROLL AND MENUS
            BaseView.fn.reset.call(this, e);
        }

    });

    //RETURN VIEW
    return new View();
});