(function (global) {
    //DETERMINE BASE URL FROM CURRENT SCRIPT PATH
    var scripts = document.getElementsByTagName('script');
    var src = scripts[scripts.length - 1].src;
    var currentPath = src.substring(src.indexOf(window.location.pathname), src.lastIndexOf('/'));

    //REGISTER DEFAULT JS MODULE
    define('baseurl', [], function () { return '../'; });
    define('basescriptsurl', [], function () { return currentPath + '/'; });
    define('baseservicesurl', [], function () { return 'http://api.publicrealm.net/qurangateway'; });
    define('baseresourcesurl', [], function () { return 'http://resources.publicrealm.net'; });
    define('jquery', [], function () { return window.jQuery; });

    //CONFIFURE SHORTCUT ALIASES
    require.config({
        baseUrl: currentPath,
        paths: {
            add2home: 'libs/add2home/add2home',
            hijri: 'libs/hijricalendar/hijricalendar.mod',
            jplayer: 'libs/jplayer/jquery.jplayer.min',
            jplaylist: 'libs/jplayer/add-on/jplayer.playlist.min',
            jsurl: 'libs/js-url/url.min',
            kendoui: 'libs/kendoui/js', //FOR AMD USE
            lostorage: 'libs/lostorage/loStorage.min',
            moment: 'libs/moment/moment.min',
            spin: 'libs/spin/spin.min',
            text: 'libs/require/text',
            taffy: 'libs/taffy/taffy-min',
            toastr: 'libs/toastr/toastr.min',
            underscore: 'libs/underscore/underscore-min',
            'underscore.string': 'libs/underscore/underscore.string.min'
        },
        // The shim config allows us to configure dependencies for
        // scripts that do not call define() to register a module
        shim: {
            jplaylist: ['jplayer'],
            jsurl: {
                deps: ['jquery'],
                exports: 'url'
            },
            moment: {
                deps: ['jquery'],
                exports: 'moment'
            },
            taffy: {
                exports: 'TAFFY'
            },
            toastr: {
                deps: ['jquery'],
                exports: 'toastr'
            },
            underscore: {
                deps: ['underscore.string'],
                exports: '_',
                init: function (_s) {
                    //MERGE STRING PLUGIN TO UNDERSCORE NAMESPACE
                    _.mixin(_s.exports());
                    return _;
                }
            }
        }
    });

    //INITIALIZE APP
    require([
        'jquery',
        'underscore',
        'api',
        'utils/helpers',
        'utils/alerts',
        'layouts/default',
        'views/home',
        'views/chapter',
        'views/chapters',
        'views/verse',
        'views/verses',
        'views/names99',
        'views/hadiths',
        'views/progress',
        'views/topics',
        'views/ummah',
        'views/favorites',
        'views/shared',
        'add2home'
    ], function ($, _, Api, Helpers, Alerts, Default, Home, Chapter, Chapters, Verse, Verses, Names99,
        Hadiths, Progress, Topics, Ummah, Favorites, Shared) {

        //CONSTRUCTOR
        var init = function () {
            //EXPOSE APP MODULE TO GLOBAL FOR KENDO ACCESS
            global.App = {};

            //START LOADING PANEL
            Alerts.initSpinner();

            //PRELOAD OTHER DATA IN CASE GOES OFFLINE LATER
            $.when(Api.getChapters(), Api.getVerses(), Api.getHadiths, Api.getNames99())
                .done(function () {
                    //STOP LOADING PANEL
                    Alerts.exitSpinner();

                    //INITIALIZE APP PARTS
                    initErrors();
                    initLayouts();
                    initViews();
                    initMobile();
                    initPlugins();
                    initStats();
                });
        };

        var initErrors = function (options) {
            //ATTACH TO WINDOW ERROR
            window.onerror = function (msg, url, line) {
                //NOTIFY THE USER IF APPLICABLE
                Alerts.error('There was an error with your request: "' + msg
                    + '". Please try again or restart the app.');

                /*LOG TO SERVER USING WEB SERVICE API
                try {
                    $.ajax({
                        type: 'GET',
                        contentType: 'application/json',
                        cache: false,
                        url: Helpers.toServicesUrl('/System/Log'),
                        data: {
                            message: msg,
                            file: window.location.href,
                            line: line,
                            url: url,
                            userAgent: navigator.userAgent
                        }
                    });
                } catch (err) {
                    //DO NOTHING TO AVOID INFINITE ERROR LOOP
                }*/

                //BUBBLE ERROR TO CONSOLE STILL
                return false;
            };
        };

        var initLayouts = function () {
            //STORE IN GLOBAL
            global.App.layouts = {
                Default: Default
            };
        };
        
        var initViews = function () {
            //STORE IN GLOBAL
            global.App.views = {
                Home: Home,
                Chapter: Chapter,
                Chapters: Chapters,
                Verse: Verse,
                Verses: Verses,
                Names99: Names99,
                Hadiths: Hadiths,
                Progress: Progress,
                Topics: Topics,
                Ummah: Ummah,
                Favorites: Favorites,
                Shared: Shared
            };
        };

        var initMobile = function () {
            //RUN APP AND STORE IN GLOBAL
            var startApp = function () {
                //SET MOBILE APP OPTIONS
                var options = {
                    skin: 'flat'
                };

                //START KENDO MOBILE AND CACHE FOR LATER USE
                global.App.mobile = new kendo.mobile.Application($(document.body), options);
            };

            //INITIALIZE MOBILE APP BASED ON ENVIRONMENT
            if (Helpers.isPhoneGap()) {
                //ATTACH TO DEVICE READY EVENT FOR PHONEGAP
                document.addEventListener('deviceready', startApp, false);
            } else {
                //IMMEDIATE FOR WEB BROWSERS
                startApp();
            }
        };

        var initPlugins = function () {
            //INITIALIZE MOBILE PLUGINS IF DEVICE
            if (Helpers.isPhoneGapPluginsAvailable()) {
                //INITIALIZE CHILD BROWSER IF APPLICABLE
                if (global.plugins.childBrowser) {
                    $(document).on('click', 'a[data-rel="external"][target="_blank"]', function (e) {
                        e.preventDefault();
                        //OPEN LINKS VIA CHILD BROWSER PLUGIN
                        global.plugins.childBrowser.showWebPage($(this).attr('href'),
                            { showLocationBar: true },
                            { showAddress: true },
                            { showNavigationBar: true });
                    });
                }
            }
        };

        var initStats = function () {
            //STORE INSTALL DATE
            Api.setInstallDate();

            //STORE NUMBER OF RUNS
            $('#drawer-menu a[href="views/ummah/struggles.html"]')
                .closest('li')
                .toggle(_.contains(Api.getProgress('understanding').complete, '9')
                    || Api.isFavorite({ id: 9, type: 'Chapters' }));
        };

        //CALL CONSTRUCTOR
        init();
    });
})(window);