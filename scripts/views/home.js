/**
 * This is a home view
 */
define([
    'api',
    'views/baseview'
], function (Api, BaseView) {
    var context = null;

    var View = BaseView.extend({

        //CONSTRUCTOR
        init: function () {
            BaseView.fn.init.call(this);

            //CACHE CONTEXT FOR LATER
            context = this;
        },

        //EVENTS
        onShow: function () {
            //INITIALIZE CHARTS
            context.loadProgress('recitation');
            context.loadProgress('memorization');
            context.loadProgress('names99', '99 Names');
            context.loadProgress('understanding', 'Understand');
            context.loadProgress('supplications');
            context.loadProgress('prayers');
            context.loadProgress('fasting');
            context.loadProgress('charity');
            context.loadProgress('sunnah');
        },

        loadProgress: function (key, title) {
            //SET PIE VALUES
            var perUnit = 100 / (Api.getProgress(key).total || 1);
            var amount = Api.getProgress(key).complete.length * perUnit;
            var data = [amount || 1, (100 - amount)];

            //SET COLOR BASED ON VALUE
            var color = data[0] > 60 ? '#10c4b2'
                : data[0] > 30 ? '#ffb74f'
                : '#ff7663';

            //INITIALIZE CHART
            $('#chart-' + key).kendoChart({
                title: {
                    text: title || (key.charAt(0).toUpperCase() + key.slice(1))
                },
                legend: {
                    position: 'top'
                },
                chartArea: {
                    background: 'transparent'
                },
                series: [{
                    data: data
                }],
                seriesDefaults: {
                    type: 'pie',
                    padding: 0
                },
                seriesColors: [color, '#ccc'],
                seriesClick: function (e) {
                    App.kendo.navigate('views/progress/' + key + '.html');
                },
                tooltip: {
                    visible: false
                }
            });
        }

    });

    //RETURN VIEW
    return new View();
});