/**
 * This is a verse model module
 */
define([], function () {

    //RETURN MODEL FOR VERSE
    return kendo.data.Model.define({
        id: 'id',
        fields: {
            id: { type: 'number' },
            chapter: { type: 'number' },
            start: { type: 'number' },
            end: { type: 'number' },
            //supplication: { type: 'boolean' },
            //say: { type: 'boolean' },
            //promise: { type: 'boolean' },
            //believers: { type: 'boolean' },
            //special: { type: 'boolean' },
            //sajdah: { type: 'boolean' },
            occurrence: { type: 'number' },
            topic: { type: 'number' },
            translation: { type: 'string' },
            arabic: { type: 'string' }
        }
    });
});
