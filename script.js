
var goodData;
var causeChart;

function parseData(){
    dataSet = new Array();

    $.get("1657-1667.csv", function(text){
        Papa.parse(text, {
            header: true,
            dynamicTyping: true,
            complete: function(results){
                data = results.data;
                var formatedData = new Array();
                for (cause of data){
                    var pointsArray = new Array();
                    for (var key in cause) {
                        pointsArray.push(cause[key]);
                    }
                    var causeName = pointsArray[pointsArray.length-1];
                    pointsArray.pop();
                    var newCause = [causeName,pointsArray,getRandomColor()];
                    formatedData.push(newCause);
                }
                goodData = formatedData;
                loadChart(formatedData);
            }
        });
    });
}


function loadChart(dataToUse){
    var dataSet = new Array();
    for (point of dataToUse){
        dataSet.push({
            label: point[0],
            data: point[1],
            borderColor: point[2],
            borderWidth: 5,
            fill: false
        });
    }
    var ctx = document.getElementById("myChart").getContext('2d');
    causeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["1657", "1658", "1659", "1660", "1661", "1662", "1663", "1664", "1665", "1666", "1667"],
            datasets: dataSet
        },
        options: {
        }
    });
}


function updateChart(newData){
    causeChart.data.datasets = [];

    var dataSet = new Array();

    for (point of newData){
        dataSet.push({
            label: point[0],
            data: point[1],
            borderColor: point[2],
            borderWidth: 5,
            fill: false
        });
    }
    causeChart.data.datasets = dataSet;
    causeChart.update();

}


function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

parseData();

$(document).ready(function(){
    var inputBox = document.getElementById('searchinput');

    var lastString = "";

    inputBox.onkeyup = function(){
        var searchBy = inputBox.value;
        searchBy = searchBy.split(',');
        var results = [];
        for(cause of goodData) {
            for (term of searchBy){
                if(cause[0].toLowerCase().indexOf(term.toLowerCase())!=-1) {
                    results.push(cause);
                }
            }
          }
        updateChart(results);
    }
});
