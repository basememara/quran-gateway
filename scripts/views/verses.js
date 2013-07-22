/**
 * This is a verses view
 */
define([
    'views/baseview'
], function (BaseView) {

    var View = BaseView.extend({

        //EVENTS
        onShow: function (e) {
            //CHOOSE ACTIVE TAB STRIP
            e.view.footer.find('[data-role="tabstrip"]')
                .data('kendoMobileTabStrip')
                .switchTo('views/chapters/list.html');
        }

    });

    //RETURN VIEW
    return new View();
});