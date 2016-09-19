var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        datasets: [
            {
                data: [50, 20],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                label:'Fiabilité des Questions'
            }],
        labels: [
            "Questions fiables",
            "Questions litigieuses"
        ]
    },
    options: {
        multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
        tooltips: {
            callbacks: {
                label: function(tooltipItems, data) {
                    return data.labels[tooltipItems.index] +
                        " : " +
                        data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] +
                        ' %';
                }
            }
        }
    }
});