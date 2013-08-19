/**
 * This is a names99 view
 */
define([
    'api',
    'views/baseview',
    'text!../../views/names99/_list.html',
    'data/datasourcenames99'
], function (Api, BaseView, listTemplate) {
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
        onInit: function () {
            //CREATE LIST VIEW
            this.element.find('.listview').kendoMobileListView({
                dataSource: new kendo.ui.DataSourceNames99(),
                template: listTemplate
            });
        },

        onShow: function (e) {
            //CACHE VIEW FOR LATER USE
            context.view = e.view;
        },

        toggleFavorite: function (e) {
            var me = this;
            var id = e.button.data('name99-id');

            //GET REQUESTED ITEM
            Api.getName99(id.toString())
                .done(function (data) {
                    var template = kendo.template('<span>#= name # - #= arabic #</span>');

                    //UPDATE FAVORITE BUTTON
                    BaseView.fn.toggleFavorite.call(me, context, null, {
                        id: parseInt(id),
                        type: 'Names of Allah',
                        name: template(data),
                        url: null
                    });
                });
        },

        isFavorite: function (id) {
            return Api.isFavorite({
                id: id,
                type: 'Hadiths'
            });
        }

    });

    //RETURN VIEW
    return new View();
});