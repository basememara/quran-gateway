/**
 * This is a names99 view
 */
define([
    'views/baseview',
    'text!../../views/names99/_list.html',
    'data/datasourcenames99'
], function (BaseView, listTemplate) {

    var View = BaseView.extend({

        //EVENTS
        onInit: function () {
            //CREATE LIST VIEW
            this.element.find('.listview').kendoMobileListView({
                dataSource: new kendo.ui.DataSourceNames99(),
                template: listTemplate
            });
        }

    });

    //RETURN VIEW
    return new View();
});