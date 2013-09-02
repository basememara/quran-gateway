/**
 * This is the storage
 */
define([
    'jquery',
    'underscore',
    'moment',
    'lostorage',
    'taffy',
    'utils/helpers'
], function ($, _, moment, loStorage, TAFFY, Helpers) {
    //PRIVATE PROPERTIES
    var database = [];

    var getTable = function (key, options) {
        var defer = new $.Deferred();
        var loKey = 'data-' + key;
        options = options || {};

        if (!database[key]) {
            //HANDLE ONLINE/OFFLINE DATA
            if (navigator.onLine) {
                //DETERMINE TABLE FRESHNESS FOR CLEARING CACHE
                $.get(Helpers.toServicesUrl('lastmodified/' + (options.table || key)))
                    .done(function (data) {
                        //GET TABLE FROM LOCAL STORAGE IF APPLIABLE
                        if (loStorage.storage.get(loKey)) {
                            //GET LOCAL STORAGE TIMESTAMP
                            var loTimestamp = loStorage.storage.get(loKey + '-modified');

                            //CLEAR CACHE IF APPLICABLE
                            if (moment(data.last_modified) <= moment(loTimestamp)) {
                                var json = loStorage.storage.get(loKey);

                                //CREATE DATABASE FOR LATER USE
                                database[key] = TAFFY(json);

                                //PASS DATA TO CALLBACK
                                defer.resolve(database[key]);
                            } else loStorage.storage.remove(loKey);
                        }

                        //GET TABLE FROM AJAX IF APPLIABLE
                        if (defer.state() != 'resolved') {
                            //CALL JSON DATA VIA AJAX
                            $.getJSON(Helpers.toServicesUrl(options.service || key))
                                .done(function (json) {
                                    //STORE DATA IN LOCAL STORAGE AND TIMESTAMP
                                    loStorage.storage.set(loKey, json);
                                    loStorage.storage.set(loKey + '-modified', data.last_modified);

                                    //CREATE DATABASE FOR LATER USE
                                    database[key] = TAFFY(json);

                                    //PASS DATA TO CALLBACK
                                    defer.resolve(database[key]);
                                }).fail(function () {
                                    defer.reject();
                                });
                        }
                    });
            } else {
                //GET DATA FROM LOCAL STORAGE
                var json = loStorage.storage.get(loKey);

                //CREATE DATABASE FOR LATER USE
                database[key] = TAFFY(json);

                //PASS DATA TO CALLBACK
                defer.resolve(database[key]);
            }
        } else {
            //PASS DATA TO CALLBACK
            defer.resolve(database[key]);
        }

        return defer.promise();
    };

    var get = function (key, filter, options) {
        var defer = new $.Deferred();

        //GET TABLE AND RETRIEVE DATA
        getTable(key, options)
            .done(function (data) {
                //PASS DATA TO CALLBACK BASED ON PARAMETER
                if (_.isObject(filter)) {
                    //RETURN ITEM BY FILTER
                    defer.resolve(data(filter).first());
                } else {
                    //RETURN ITEM BY STRING OR INT BASED KEY
                    defer.resolve(data({ id: filter }).first()
                        || data({ id: parseInt(filter) }).first());
                }
            }).fail(function () {
                defer.reject();
            });

        return defer.promise();
    };

    var getAll = function (key, filter, options) {
        var defer = new $.Deferred();

        //GET TABLE AND RETRIEVE DATA
        getTable(key, options)
            .done(function (data) {
                //PASS DATA TO CALLBACK
                defer.resolve(data(filter).get());
            }).fail(function () {
                defer.reject();
            });

        return defer.promise();
    };

    //PUBLIC PROPERTIES
    return {
        get: get,
        getAll: getAll
    };
});