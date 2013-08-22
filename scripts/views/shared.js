/**
 * This is a shared view
 */
define([
    'views/baseview'
], function (BaseView) {

    var View = BaseView.extend({

        //EVENTS
        onShow: function (e) {
            //UPDATE VIDEO SOURCE
            e.view.element.find('iframe')
                .attr('src', decodeURIComponent(this.params.url));

            //UPDATE HEADER TITLE
            e.view.header.find('[data-role="navbar"]')
                .data('kendoMobileNavBar')
                .title(decodeURIComponent(this.params.title));

            //RESET SCROLL AND MENUS
            BaseView.fn.reset.call(this, e);
        }

    });

    //RETURN VIEW
    return new View();
});