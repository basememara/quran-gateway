/**
 * This is the api
 */
define([
    'amplify',
    'utils/alerts',
    'utils/helpers',
    'utils/storage'
], function (amplify, Alerts, Helpers, Storage) {

    //PUBLIC PROPERTIES
    return {
        getChapter: function (filter) {
            return Storage.get('chapters', filter);
        },

        getChapters: function (filter) {
            return Storage.getAll('chapters', filter);
        },

        getVerse: function (filter) {
            return Storage.get('verses', filter);
        },

        getVerses: function (filter) {
            return Storage.getAll('verses', filter);
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

        getProgress: function () {
            var key = 'myprogress';

            //INITIALIZE DATA STORE IF APPLICABLE
            if (!amplify.store(key)) {
                //STORE DEFAULT IN LOCAL STORAGE
                amplify.store(key, {
                    recitation: {
                        complete: [],
                        total: 0
                    },
                    memorization: {
                        complete: [],
                        total: 0
                    },
                    names99: {
                        complete: [],
                        total: 0
                    },
                    understanding: {
                        complete: [],
                        total: 0
                    },
                    supplications: {
                        complete: [],
                        total: 0
                    },
                    prayers: {
                        complete: [],
                        total: 0
                    },
                    fasting: {
                        complete: [],
                        total: 0
                    },
                    charity: {
                        complete: [],
                        total: 0
                    },
                    sunnah: {
                        complete: [],
                        total: 0
                    }
                });

                Alerts.info('Click on the chart to update progress.');
            }

            //RETURN DATA FROM LOCAL STORAGE
            return amplify.store(key);
        },

        setProgress: function (value) {
            var key = 'myprogress';

            //STORE DATA IN LOCAL STORAGE
            amplify.store(key, value);
        },

        addProgress: function (key, value) {
            var progress = this.getProgress();
            Helpers.pushUnique(progress[key].complete, value);
            this.setProgress(progress);
        },

        removeProgress: function (key, value) {
            var progress = this.getProgress();
            Helpers.remove(progress[key].complete, value);
            this.setProgress(progress);
        },

        totalProgress: function (key, value) {
            var progress = this.getProgress();
            progress[key].total = value;
            this.setProgress(progress);
        }
    };
});