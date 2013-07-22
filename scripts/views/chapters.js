/**
 * This is a chapters view
 */
define([
    'views/baseview',
    'text!../../views/chapters/_list.html',
    'data/datasourcechapters'
], function (BaseView, listTemplate) {

    var View = BaseView.extend({

        //EVENTS
        onInit: function () {
            this.element.find('.listview').kendoMobileListView({
                dataSource: new kendo.ui.DataSourceChapters(),
                template: listTemplate
            });
        }

    });

    //RETURN VIEW
    return new View();
});