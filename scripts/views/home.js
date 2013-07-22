/**
 * This is a home view
 */
define([
    'views/baseview'
], function (BaseView) {

    var View = BaseView.extend({

        //EVENTS
        onShow: function () {
            //HIDE BACK BUTTON ON HOME PAGE
            this.header.find('[data-role="backbutton"]').hide();

            //INITIALIZE PROGRESS CHART
            this.element.find('.progress').kendoChart({
                legend: {
                    position: 'top'
                },
                chartArea: {
                    margin: {
                        bottom: 200
                    },
                    background: 'transparent'
                },
                seriesDefaults: {
                    type: 'column'
                },
                series: [
                    {
                        name: 'Recitation',
                        data: [35]
                    },
                    {
                        name: 'Memorization',
                        data: [52]
                    },
                    {
                        name: 'Supplications',
                        data: [24]
                    },
                    {
                        name: 'Prayers',
                        data: [76]
                    },
                    {
                        name: 'Fasting',
                        data: [67]
                    },
                    {
                        name: 'Charity',
                        data: [76]
                    },
                    {
                        name: 'Sunnah',
                        data: [43]
                    }
                ],
                valueAxis: {
                    labels: {
                        format: '{0}%'
                    },
                    line: {
                        visible: false
                    },
                    axisCrossingValue: 0
                },
                tooltip: {
                    visible: true,
                    format: '{0}%',
                    template: '#= series.name #: #= value #%'
                }
            });
        }

    });

    //RETURN VIEW
    return new View();
});