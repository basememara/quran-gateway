//EXPOSE APP MODULE TO GLOBAL FOR KENDO ACCESS
var App = {};

(function () {
    //DETERMINE BASE URL FROM CURRENT SCRIPT PATH
    var scripts = document.getElementsByTagName('script');
    var src = scripts[scripts.length - 1].src;
    var currentPath = src.substring(src.indexOf(window.location.pathname), src.lastIndexOf('/'));

    //REGISTER DEFAULT JS MODULE
    define('baseurl', [], function () { return '../'; });
    define('basescriptsurl', [], function () { return currentPath + '/'; });
    define('baseservicesurl', [], function () { return 'http://api.publicrealm.net/qurangateway'; });
    define('jquery', [], function () { return window.jQuery; });

    //CONFIFURE SHORTCUT ALIASES
    require.config({
        baseUrl: currentPath,
        paths: {
            add2home: 'libs/add2home/add2home',
            amplify: 'libs/amplify/amplify.min',
            hijri: 'libs/hijricalendar/hijricalendar.mod',
            jsurl: 'libs/js-url/url.min',
            kendoui: 'libs/kendoui/js', //FOR AMD USE
            moment: 'libs/moment/moment.min',
            text: 'libs/require/text',
            taffy: 'libs/taffy/taffy-min',
            toastr: 'libs/toastr/toastr.min',
            underscore: 'libs/underscore/underscore-min',
            'underscore.string': 'libs/underscore/underscore.string.min'
        },
        // The shim config allows us to configure dependencies for
        // scripts that do not call define() to register a module
        shim: {
            amplify: {
                exports: 'amplify'
            },
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
        'layouts/default',
        'views/home',
        'views/chapter',
        'views/chapters',
        'views/verses',
        'views/name99',
        'views/names99',
        'views/hadith',
        'views/hadiths',
        'views/progress',
        'add2home'
    ], function ($, Default, Home, Chapter, Chapters, Verses, Name99, Names99, Hadith, Hadiths, Progress) {

        //CONSTRUCTOR
        var init = function () {
            //INITIALIZE APP PARTS
            initLayouts();
            initViews();

            //INITIALIZE APP AND STORE IN GLOBAL
            App.kendo = new kendo.mobile.Application($(document.body), {
                skin: 'flat'
            });
        };

        var initLayouts = function () {
            //STORE IN GLOBAL
            App.layouts = {
                Default: Default
            };
        };
        
        var initViews = function () {
            //STORE IN GLOBAL
            App.views = {
                Home: Home,
                Chapter: Chapter,
                Chapters: Chapters,
                Verses: Verses,
                Name99: Name99,
                Names99: Names99,
                Hadith: Hadith,
                Hadiths: Hadiths,
                Progress: Progress
            };
        };

        //CALL CONSTRUCTOR
        init();
    });
})();