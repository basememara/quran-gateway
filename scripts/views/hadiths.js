/**
 * This is a hadiths view
 */
define([
    'views/baseview',
    'text!../../views/hadiths/_list.html',
    'data/datasourcehadiths'
], function (BaseView, listTemplate) {

    var View = BaseView.extend({

        //EVENTS
        onInit: function () {
            this.element.find('.listview').kendoMobileListView({
                dataSource: new kendo.ui.DataSourceHadiths(),
                template: listTemplate
            });
        },

        onShow: function (e) {
            //GET DATASOURCE OF MOBILE LIST
            var ds = this.element.find('.listview')
                .data('kendoMobileListView')
                .dataSource;

            //DETERMINE FILTER FROM PASS
            if (this.params.filter) {
                ds.query({
                    filter: {
                        field: this.params.filter,
                        operator: 'eq',
                        value: '\u0001'
                    },
                    sort: [
                        {
                            field: this.params.filter,
                            dir: 'desc'
                        },
                        {
                            field: 'title',
                            dir: 'asc'
                        }
                    ]
                });
            }

            //RESET SCROLL AND MENUS
            BaseView.fn.reset.call(this, e);
        }

    });

    //RETURN VIEW
    return new View();
});