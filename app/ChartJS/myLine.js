var json = [
    {
        "correcteur": "Angeline Cotton",
        "note_attribuee": 17
    },
    {
        "correcteur": "Lawanda Tate",
        "note_attribuee": 14
    },
    {
        "correcteur": "Camacho Valentine",
        "note_attribuee": 3
    },
    {
        "correcteur": "Flynn Byrd",
        "note_attribuee": 13
    },
    {
        "correcteur": "Moreno Ashley",
        "note_attribuee": 3
    },
    {
        "correcteur": "Tracy Garrett",
        "note_attribuee": 7
    },
    {
        "correcteur": "Clarke Morton",
        "note_attribuee": 7
    },
    {
        "correcteur": "Morrow Shaw",
        "note_attribuee": 9
    },
    {
        "correcteur": "Cindy Quinn",
        "note_attribuee": 4
    },
    {
        "correcteur": "Guthrie Santiago",
        "note_attribuee": 4
    },
    {
        "correcteur": "Riley Lindsey",
        "note_attribuee": 16
    },
    {
        "correcteur": "Lori Franco",
        "note_attribuee": 18
    },
    {
        "correcteur": "Dale Villarreal",
        "note_attribuee": 9
    },
    {
        "correcteur": "Mclean Reynolds",
        "note_attribuee": 19
    },
    {
        "correcteur": "Gould Robles",
        "note_attribuee": 5
    },
    {
        "correcteur": "Hopkins Hunter",
        "note_attribuee": 11
    },
    {
        "correcteur": "Carroll Hewitt",
        "note_attribuee": 1
    },
    {
        "correcteur": "Audra Richards",
        "note_attribuee": 20
    },
    {
        "correcteur": "Ebony Carroll",
        "note_attribuee": 7
    },
    {
        "correcteur": "Roberts Kelly",
        "note_attribuee": 9
    },
    {
        "correcteur": "Barrera Beard",
        "note_attribuee": 18
    },
    {
        "correcteur": "Paul Watson",
        "note_attribuee": 16
    },
    {
        "correcteur": "Mcdonald Castillo",
        "note_attribuee": 20
    },
    {
        "correcteur": "Lopez Freeman",
        "note_attribuee": 5
    },
    {
        "correcteur": "Ross Daniels",
        "note_attribuee": 12
    },
    {
        "correcteur": "Mccarthy Singleton",
        "note_attribuee": 12
    },
    {
        "correcteur": "Newman Bartlett",
        "note_attribuee": 4
    },
    {
        "correcteur": "Lyons Ewing",
        "note_attribuee": 15
    },
    {
        "correcteur": "Aisha Lewis",
        "note_attribuee": 5
    },
    {
        "correcteur": "Agnes Chen",
        "note_attribuee": 14
    },
    {
        "correcteur": "Bette Ferguson",
        "note_attribuee": 3
    },
    {
        "correcteur": "Lana Wolf",
        "note_attribuee": 8
    },
    {
        "correcteur": "Tonia Trujillo",
        "note_attribuee": 7
    },
    {
        "correcteur": "Lloyd Bryant",
        "note_attribuee": 19
    },
    {
        "correcteur": "Martha Heath",
        "note_attribuee": 10
    },
    {
        "correcteur": "Jerry Hale",
        "note_attribuee": 17
    },
    {
        "correcteur": "Geneva Underwood",
        "note_attribuee": 20
    },
    {
        "correcteur": "Brooke Mejia",
        "note_attribuee": 18
    },
    {
        "correcteur": "Charlene Anderson",
        "note_attribuee": 20
    },
    {
        "correcteur": "Gardner Shannon",
        "note_attribuee": 2
    },
    {
        "correcteur": "Blair Boone",
        "note_attribuee": 20
    },
    {
        "correcteur": "Sasha French",
        "note_attribuee": 6
    },
    {
        "correcteur": "Merrill Duffy",
        "note_attribuee": 11
    },
    {
        "correcteur": "Kemp Mosley",
        "note_attribuee": 13
    },
    {
        "correcteur": "Vivian Walls",
        "note_attribuee": 3
    },
    {
        "correcteur": "Barr Castaneda",
        "note_attribuee": 2
    },
    {
        "correcteur": "Mavis Guzman",
        "note_attribuee": 19
    },
    {
        "correcteur": "Joyce Roy",
        "note_attribuee": 8
    },
    {
        "correcteur": "Ursula Mason",
        "note_attribuee": 6
    },
    {
        "correcteur": "Carmella Navarro",
        "note_attribuee": 11
    }
];

var chartjsData = [];
for (var i = 0; i < json.length; i++) {
    chartjsData.push(json[i].note_attribuee);
}
var ctx = document.getElementById("myLine");
var myLine = new Chart(ctx, {
    type: 'line',
    data : {
        labels: ["0", "1", "2", "3", "4", "5", "6","7", "8", "9", "10", "11", "12", "13","14", "15", "16", "17", "18", "19", "20"],
        datasets: [
            {
                label: "Notes attribuées par les correcteurs",

                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBackgroundColor: "rgba(75,192,192,1)",
                pointBorderColor: "#fff",
                pointRadius: 5,
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointHitRadius: 10,
                data: chartjsData,
                spanGaps: false
            }
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