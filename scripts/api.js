/**
 * This is the api
 */
define([
    'underscore',
    'lostorage',
    'utils/helpers',
    'utils/storage'
], function (_, loStorage, Helpers, Storage) {

    //PUBLIC PROPERTIES
    return {
        getChapter: function (filter) {
            return Storage.get('chapters', filter);
        },

        getChapters: function (filter) {
            return Storage.getAll('chapters', filter);
        },

        getVerse: function (filter) {
            return Storage.get('verses/ranges', filter, {
                table: 'verses_range'
            });
        },

        getVerses: function (filter) {
            return Storage.getAll('verses/ranges', filter, {
                table: 'verses_range'
            });
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

        getMeaning: function (filter) {
            return Storage.get('meanings', filter, {
                local: false
            });
        },

        getMeanings: function (filter) {
            return Storage.getAll('meanings', filter, {
                local: false
            });
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
            //UPDATE DATA FROM LOCAL STORAGE
            var data = this.getProgress(key);
            Helpers.pushUnique(data.complete, value);

            //ACTIVATE NEW SECTIONS IF APPLICABLE
            if (key == 'understanding' && value == '9')
                $('#drawer-menu a[href="views/ummah/struggles.html"]')
                    .closest('li')
                    .show();

            //STORE DATA IN LOCAL STORAGE
            this.setProgress(key, data);
        },

        removeProgress: function (key, value) {
            var data = this.getProgress(key);
            Helpers.remove(data.complete, value);
            this.setProgress(key, data);
        },

        totalProgress: function (key, value) {
            var data = this.getProgress(key);
            data.total = value;
            this.setProgress(key, data);
        },

        getFavorites: function () {
            //INITIALIZE DATA STORE IF APPLICABLE
            if (!loStorage.storage.get('myfavorites')) {
                //STORE DEFAULT IN LOCAL STORAGE
                loStorage.storage.set('myfavorites', []);
            }

            //RETURN DATA FROM LOCAL STORAGE
            return loStorage.storage.get('myfavorites');
        },

        getFavorite: function (value) {
            //FIND MATCHING VALUE FROM STORAGE
            var item = _.where(this.getFavorites(), {
                id: value.id,
                type: value.type
            });

            return item.length > 0 ? item[0] : null;
        },

        addFavorite: function (value) {
            //UPDATE DATA FROM LOCAL STORAGE
            var data = this.getFavorites();
            Helpers.pushUnique(data, value);

            //ACTIVATE NEW SECTIONS IF APPLICABLE
            if (value.id == 9 && value.type == 'Chapters')
            $('#drawer-menu a[href="views/ummah/struggles.html"]')
                .closest('li')
                .show();

            //STORE DATA IN LOCAL STORAGE
            loStorage.storage.set('myfavorites', data);
        },

        removeFavorite: function (value) {
            //UPDATE DATA FROM LOCAL STORAGE
            var data = this.getFavorites();
            Helpers.remove(data, value);

            //STORE DATA IN LOCAL STORAGE
            loStorage.storage.set('myfavorites', data);
        },

        isFavorite: function (value) {
            return !!this.getFavorite(value);
        },

        getReciter: function () {
            //INITIALIZE DATA STORE IF APPLICABLE
            if (!loStorage.storage.get('reciter')) {
                //STORE DEFAULT IN LOCAL STORAGE
                loStorage.storage.set('reciter', 'mishary_alafasy');
            }

            //RETURN DATA FROM LOCAL STORAGE
            return loStorage.storage.get('reciter');
        },

        setReciter: function (value) {
            //STORE DATA IN LOCAL STORAGE
            loStorage.storage.set('reciter', value);
        },

        getInstallDate: function () {
            return loStorage.storage.get('install-date');
        },

        setInstallDate: function () {
            var key = 'install-date';

            //STORE INSTALL DATE
            if (!loStorage.storage.get(key))
                loStorage.storage.set(key, new Date());
        }
    };
});