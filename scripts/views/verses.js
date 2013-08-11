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
            //GET REQUESTED ITEMS
            $.when(Api.getVerse(e.view.params.id), Api.getChapter(e.view.params.chapter))
                .done(function (verse, chapter) {
                    //INITIALIZE VARIABLES
                    verse.range = verse.start;
                    if (verse.end) verse.range += '-' + verse.end;

                    //UPDATE HEADER TITLE
                    e.view.header.find('[data-role="navbar"]')
                        .data('kendoMobileNavBar')
                        .title('[Quran, ' + chapter.id + ':' + verse.range + ']');

                    //BIND CONTENT
                    e.view.element.find('.arabic').html(verse.arabic);
                    e.view.element.find('.translation').html(verse.translation);

                    //BIND VERSE DETAILS
                    var template = kendo.template('Chapter #= chapter.id #: #= chapter.transliteration# (#= chapter.translation #), Verse: #= verse.range #');
                    e.view.element.find('.range small').html(template({ chapter: chapter, verse: verse }));
                });

            //RESET SCROLL AND MENUS
            BaseView.fn.reset.call(this, e);
        }

    });

    //RETURN VIEW
    return new View();
});