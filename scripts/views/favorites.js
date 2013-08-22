/**
 * This is a favorites view
 */
define([
    'underscore',
    'api',
    'views/baseview',
    'text!../../views/favorites/_list.html',
    'data/datasourcefavorites'
], function (_, Api, BaseView, listTemplate) {

    var View = BaseView.extend({

        //EVENTS
        onInit: function (e) {
            //BIND LIST
            e.view.element.find('.listview').kendoMobileListView({
                dataSource: new kendo.ui.DataSourceFavorites,
                template: listTemplate,
                fixedHeaders: true,
                autoBind: false
            });
        },

        onShow: function (e) {
            e.view.element.find('.listview')
                .data('kendoMobileListView')
                .dataSource
                .read();

            //SCROLL TO TOP ON PAGE LOAD
            e.view.scroller.reset();

            //INITIALIZE FAVORITES COUNT
            BaseView.fn.updateFavoritesDisplay.call(this, e);
        }

    });

    //RETURN VIEW
    return new View();
});