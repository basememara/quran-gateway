/**
 * This is the api
 */
define([
    'lostorage',
    'utils/helpers',
    'utils/storage'
], function (loStorage, Helpers, Storage) {

    //PUBLIC PROPERTIES
    return {
        getChapter: function (filter) {
            return Storage.get('chapters', filter);
        },

        getChapters: function (filter) {
            return Storage.getAll('chapters', filter);
        },

        getVerse: function (filter) {
            return Storage.get('verses/ranges', filter);
        },

        getVerses: function (filter) {
            return Storage.getAll('verses/ranges', filter);
        },

        getName99: function (filter) {
            return Storage.get('names99', filter);
        },

        getNames99: function (filter) {
            return Storage.getAll('names99', filter);
        },

        getHadith: function (filter) {
            return Storage.get('hadiths', filter);
        },

        getHadiths: function (filter) {
            return Storage.getAll('hadiths', filter);
        },

        getExplanation: function (filter) {
            return Storage.get('explanations', filter);
        },

        getExplanations: function (filter) {
            return Storage.getAll('explanations', filter);
        },

        getTopic: function (filter) {
            return Storage.get('topics', filter);
        },

        getTopics: function (filter) {
            return Storage.getAll('topics', filter);
        },

        getProgress: function (key) {
            //INITIALIZE DATA STORE IF APPLICABLE
            if (!loStorage.storage.get('myprogress-' + key)) {
                //STORE DEFAULT IN LOCAL STORAGE
                loStorage.storage.set('myprogress-' + key, {
                    complete: [],
                    total: 0
                });
            }

            //RETURN DATA FROM LOCAL STORAGE
            return loStorage.storage.get('myprogress-' + key);
        },

        setProgress: function (key, value) {
            //STORE DATA IN LOCAL STORAGE
            loStorage.storage.set('myprogress-' + key, value);
        },

        addProgress: function (key, value) {
            var progress = this.getProgress(key);
            Helpers.pushUnique(progress.complete, value);
            this.setProgress(key, progress);
        },

        removeProgress: function (key, value) {
            var progress = this.getProgress(key);
            Helpers.remove(progress.complete, value);
            this.setProgress(key, progress);
        },

        totalProgress: function (key, value) {
            var progress = this.getProgress(key);
            progress.total = value;
            this.setProgress(key, progress);
        }
    };
});