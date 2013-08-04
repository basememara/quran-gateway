/**
 * This is a verses view
 */
define([
    'underscore',
    'api',
    'views/baseview',
    'text!../../views/verses/_list.html',
    'data/datasourceverses'
], function (_, Api, BaseView, listTemplate) {

    var View = BaseView.extend({

        //EVENTS
        onInit: function (e) {
            //BIND LIST
            e.view.element.find('.listview').kendoMobileListView({
                template: listTemplate,
                headerTemplate: 'Chapter #= value #',
                fixedHeaders: true
            });
        },

        onShow: function (e) {
            //DETERMINE FILTER FROM PARAM
            var filter = null;
            switch (e.view.params.type) {
                case 'occurrence':
                    filter = {
                        field: 'occurrence',
                        operator: 'gt',
                        value: 1
                    };
                    break;
                default:
                    //FILTER BY PASSED IN FIELD
                    if (e.view.params.type) {
                        filter = {
                            field: e.view.params.type,
                            operator: 'eq',
                            value: true
                        };
                    }
            }

            //SET DATASOURCE FOR LIST
            e.view.element.find('.listview')
                .data('kendoMobileListView')
                .setDataSource(new kendo.ui.DataSourceVerses({
                    filter: filter
                }));
               
            //UPDATE HEADER TITLE
            e.view.header.find('[data-role="navbar"]')
                .data('kendoMobileNavBar')
                .title(decodeURIComponent(this.params.title));

            //RESET SCROLL AND MENUS
            BaseView.fn.reset.call(this, e);
        },

        onSpecialInit: function (e) {
            //BIND LIST WITH FILTER
            e.view.element.find('.listview').kendoMobileListView({
                dataSource: new kendo.ui.DataSourceVerses(),
                template: listTemplate,
                headerTemplate: 'Chapter #= value #',
                fixedHeaders: true,
                filterable: {
                    field: 'translation',
                    operator: 'contains',
                    ignoreCase: true
                }
            });
        },

        onSpecialShow: function (e) {
            //RESET SCROLL AND MENUS
            BaseView.fn.reset.call(this, e);
        },

        onDetailShow: function (e) {
            //GET REQUESTED ITEM
            Api.getVerse(e.view.params.id)
                .done(function (data) {
                    //UPDATE HEADER TITLE
                    var template = kendo.template('Chapter #= chapter #');
                    e.view.header.find('[data-role="navbar"]')
                        .data('kendoMobileNavBar')
                        .title(template(data));

                    //BIND CONTENT
                    e.view.element.find('.arabic').html(data.arabic);
                    e.view.element.find('.translation').html(data.translation);

                    //BIND VERSES DETAILS
                    var range;
                    if (data.end) range = 'Verses: ' + data.start + ' - ' + data.end;
                    else range = 'Verse: ' + data.start
                    e.view.element.find('.range small').html(range);
                });

            //RESET SCROLL AND MENUS
            BaseView.fn.reset.call(this, e);
        }

    });

    //RETURN VIEW
    return new View();
});