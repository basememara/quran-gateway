/**
 * This is the storage
 */
define([
    'jquery',
    'taffy',
    'utils/helpers'
], function ($, TAFFY, Helpers) {
    //PRIVATE PROPERTIES
    var chapters;
    var names99;
    var hadiths;

    var getChapterById = function (id) {
        return getChapter({ id: id });
    };

    var getChapter = function (filter) {
        var me = this;
        var defer = new $.Deferred();

        if (!chapters) {
            //CALL JSON DATA VIA AJAX
            $.getJSON(Helpers.toServicesUrl('chapters'))
                .done(function (json) {
                    //CREATE DATABASE FOR LATER USE
                    chapters = TAFFY(json);

                    //PASS DATA TO CALLBACK
                    defer.resolve(chapters(filter).first());
                }).fail(function () {
                    defer.reject();
                });
        } else {
            //PASS DATA TO CALLBACK
            defer.resolve(chapters(filter).first());
        }

        return defer.promise();
    };

    var getChapters = function (filter) {
        var me = this;
        var defer = new $.Deferred();

        if (!chapters) {
            //CALL JSON DATA VIA AJAX
            $.getJSON(Helpers.toServicesUrl('chapters'))
                .done(function (json) {
                    //CREATE DATABASE FOR LATER USE
                    chapters = TAFFY(json);

                    //PASS DATA TO CALLBACK
                    defer.resolve(chapters(filter).get());
                }).fail(function () {
                    defer.reject();
                });
        } else {
            //PASS DATA TO CALLBACK
            defer.resolve(chapters(filter).get());
        }

        return defer.promise();
    };

    var getName99ById = function (id) {
        return getName99({ id: id });
    };

    var getName99 = function (filter) {
        var me = this;
        var defer = new $.Deferred();

        if (!names99) {
            //CALL JSON DATA VIA AJAX
            $.getJSON(Helpers.toServicesUrl('names99'))
                .done(function (json) {
                    //CREATE DATABASE FOR LATER USE
                    names99 = TAFFY(json);

                    //PASS DATA TO CALLBACK
                    defer.resolve(names99(filter).first());
                }).fail(function () {
                    defer.reject();
                });
        } else {
            //PASS DATA TO CALLBACK
            defer.resolve(names99(filter).first());
        }

        return defer.promise();
    };

    var getNames99 = function (filter) {
        var me = this;
        var defer = new $.Deferred();

        if (!names99) {
            //CALL JSON DATA VIA AJAX
            $.getJSON(Helpers.toServicesUrl('names99'))
                .done(function (json) {
                    //CREATE DATABASE FOR LATER USE
                    names99 = TAFFY(json);

                    //PASS DATA TO CALLBACK
                    defer.resolve(names99(filter).get());
                }).fail(function () {
                    defer.reject();
                });
        } else {
            //PASS DATA TO CALLBACK
            defer.resolve(names99(filter).get());
        }

        return defer.promise();
    };

    var getHadithById = function (id) {
        return getHadith({ id: id });
    };

    var getHadith = function (filter) {
        var me = this;
        var defer = new $.Deferred();

        if (!hadiths) {
            //CALL JSON DATA VIA AJAX
            $.getJSON(Helpers.toServicesUrl('hadiths'))
                .done(function (json) {
                    //CREATE DATABASE FOR LATER USE
                    hadiths = TAFFY(json);

                    //PASS DATA TO CALLBACK
                    defer.resolve(hadiths(filter).first());
                }).fail(function () {
                    defer.reject();
                });
        } else {
            //PASS DATA TO CALLBACK
            defer.resolve(hadiths(filter).first());
        }

        return defer.promise();
    };

    var getHadiths = function (filter) {
        var me = this;
        var defer = new $.Deferred();

        if (!hadiths) {
            //CALL JSON DATA VIA AJAX
            $.getJSON(Helpers.toServicesUrl('hadiths'))
                .done(function (json) {
                    //CREATE DATABASE FOR LATER USE
                    hadiths = TAFFY(json);

                    //PASS DATA TO CALLBACK
                    defer.resolve(hadiths(filter).get());
                }).fail(function () {
                    defer.reject();
                });
        } else {
            //PASS DATA TO CALLBACK
            defer.resolve(hadiths(filter).get());
        }

        return defer.promise();
    };

    //PUBLIC PROPERTIES
    return {
        getChapterById: getChapterById,
        getChapter: getChapter,
        getChapters: getChapters,
        getName99ById: getName99ById,
        getName99: getName99,
        getNames99: getNames99,
        getHadithById: getHadithById,
        getHadith: getHadith,
        getHadiths: getHadiths
    };
});