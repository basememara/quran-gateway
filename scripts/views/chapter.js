/**
 * This is a chapters view
 */
define([
    'api',
    'views/baseview',
    'utils/helpers',
    'utils/alerts',
    'text!../../views/chapters/_lecture.html',
    'data/datasourcemeanings',
    'utils/plugins'
], function (Api, BaseView, Helpers, Alerts, lectureTemplate) {
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
        onInit: function (e) {
            //HANDLE CLICK TO DISPLAY CORRECT CONTENT VIEW
            var contents = e.view.element.find('.content');
            e.view.element.find('.sections').kendoMobileButtonGroup({
                select: function () {
                    if (navigator.onLine && this.selectedIndex != 0) {
                        //SWITCH LIST ON BUTTON SELECT
                        contents.hide()
                            .eq(this.selectedIndex)
                            .show();
                    } else {
                        Alerts.error('You are current offline! This feature requires online connnectivity.');
                        this.select(0);
                    }
                },
                index: 0
            });

            //BIND LECTURES DATA
            e.view.element.find('.lectures').kendoMobileListView({
                dataSource: new kendo.ui.DataSourceMeanings(),
                template: lectureTemplate,
                style: 'inset'
            });
        },

        onShow: function (e) {
            //CACHE VIEW FOR LATER USE
            context.view = e.view;

            //RESET SCROLL AND MENUS IF APPLICABLE
            if (!e.view._back) {
                context.reset(e, {
                    id: parseInt(e.view.params.id),
                    type: 'Chapters'
                });
            }

            //GET REQUESTED ITEM FOR POPULATING DETAILS
            Api.getChapter(e.view.params.id)
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

            //SET MEANINGS LINKS
            e.view.element.find('.meanings a')
                .queryString({ chapter: e.view.params.id });

            //SET QUERY ON LECTURES DATASOURCE
            e.view.element.find('.lectures')
                .data('kendoMobileListView')
                .dataSource.query({
                    filter: [
                        {
                            field: 'lecture',
                            operator: 'eq',
                            value: true
                        },
                        {
                            field: 'chapter',
                            operator: 'eq',
                            value: parseInt(e.view.params.id)
                        },
                        {
                            field: 'start',
                            operator: 'eq',
                            value: null
                        },
                        {
                            field: 'end',
                            operator: 'eq',
                            value: null
                        }
                    ],
                    sort: [
                        {
                            field: 'source',
                            dir: 'asc'
                        },
                        {
                            field: 'description',
                            dir: 'asc'
                        }
                    ]
                });
        },

        onMeaningShow: function (e) {
            //CACHE VIEW FOR LATER USE
            context.view = e.view;

            //GET CHAPTER ITEM
            Api.getChapter(e.view.params.chapter)
                .done(function (data) {
                    //UPDATE HEADER TITLE
                    var template = kendo.template('#= transliteration #');
                    e.view.header.find('[data-role="navbar"]')
                        .data('kendoMobileNavBar')
                        .title(template(data));
                });

            //POPULATE DATA
            Api.getMeaning({
                source: e.view.params.source,
                chapter: parseInt(e.view.params.chapter), //TODO: DATA TYPE CHANGES FROM STRING TO INT AFTER FIRST TIME (???)
                start: null,
                end: null,
                exegesis: '1' //TODO: MAKE STRON TYPED BOOLEAN
            }).done(function (data) {
                var content = data ? data.description : 'Coming soon...';

                if (data.file) {
                    content += '<br /><br /><a href="' + data.fileCdn
                        + '" data-rel="external" class="button-file large" target="_blank">Open File</a>';
                }

                e.view.element.find('.content').html(content);
                e.view.element.find('.button-file').kendoMobileButton({
                    icon: 'organize'
                });

            });

            //RESET SCROLL AND MENUS
            BaseView.fn.reset.call(this, e);
        },

        toggleFavorite: function (e) {
            var me = this;

            //GET REQUESTED ITEM
            Api.getChapter(context.view.params.id)
                .done(function (data) {
                    var template = kendo.template('#= id #: #= transliteration # (#= translation #)');

                    //UPDATE FAVORITE BUTTON
                    BaseView.fn.toggleFavorite.call(me, context, null, {
                        id: parseInt(data.id),
                        type: 'Chapters',
                        name: template(data),
                        description: null,
                        url: 'views/chapters/detail.html?id=' + data.id
                    });
                });
        },

        reset: function (e, data) {
            //CALL BASE METHOD
            BaseView.fn.reset.call(this, e, data);

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