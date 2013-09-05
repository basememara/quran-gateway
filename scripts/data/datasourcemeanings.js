/**
 * Base class for Kendo data source for meanings
 */
define([
    'baseresourcesurl',
    'api',
    'models/meaning'
], function (baseResourcesUrl, Api, Model) {

    //EXTEND KENDO DATA SOURCE
    var DataSource = kendo.data.DataSource.extend({

        init: function (element, options) {
            //BASE CALL TO WIDGET INITIALIZATION
            kendo.data.DataSource.fn.init.call(this, element, options);
        },

        options: {
            //THE NAME IS WHAT IT WILL APPEAR AS OFF THE KENDO NAMESPACE (i.e. kendo.ui.YouTube)
            //THE JQUERY PLUGIN WOULD BE jQuery.fn.kendoYouTube
            //http://www.kendoui.com/blogs/teamblog/posts/12-04-03/creating_custom_kendo_ui_plugins.aspx
            name: 'DataSourceMeanings',
            transport: {
                read: function (options) {
                    Api.getMeanings()
                        .done(function (data) {
                            //MANIPULATE DATA
                            _.each(data, function (item) {
                                //USE REMOTE FILE IF APPLICABLE
                                if (item.file)
                                    item.fileCdn = baseResourcesUrl + '/' + item.file;
                            })

                            //SEND BACK TO KENDO DATA SOURCE
                            options.success(data);
                        });
                }
            },
            schema: {
                model: Model
            }
        }
    });

    kendo.ui.plugin(DataSource);

    return {}
});