document.addEventListener("DOMContentLoaded", function(event){
    document.getElementById("chart-display").innerHTML = Slice.drawChart([{
        "degree": 180, "color": "blue"
    }, {
        "degree": 90, "color": "green"
    }, {
        "degree": 80, "color": "red"
    }]);
});