document.addEventListener("DOMContentLoaded", function(event){
    var query_strings = window.location.href.
        substring(window.location.href.indexOf("?") + 1).
        split("&").reduce(function(memo, str){
        memo[str.split("=")[0]] = str.split("=")[1];
        return memo;
    }, {})

    if ((function(){
        var prop, i, radius, all_color = [], 
            all_degree = [], 
            all_slices = [];
        var filterFunction = function(x){
            return x != undefined && x != null;
        }

        for (var prop in query_strings) {
            if(/^c\d+$/i.test(prop)) {
                all_color[prop.substring(1)] = query_strings[prop];
            } else if(/^d\d+$/i.test(prop)) {
                all_degree[prop.substring(1)] = Number(query_strings[prop]);
            } else if(prop === "r") {
                radius = Number(query_strings[prop]);
            }
        }

        all_degree = all_degree.filter(filterFunction);
        all_color = all_color.filter(filterFunction);
    
        if ((all_color.length !== all_degree.length) || all_degree.length === 0) {
            return false;
        }

        for(i = 0 ; i < all_degree.length ; i += 1) {
            all_slices.push(new Slice({
                "color": all_color[i],
                "degree": all_degree[i]
            }));
            // remember to kill of loop;
        }

        document.getElementById('chart-display').innerHTML = Slice.drawChart(all_slices);
        if (radius) { ui.resizePieChartClasses(radius); }

        return true;

    })() == false) {

        document.getElementById("chart-display").innerHTML = Slice.drawChart([{
            "degree": 180, "color": "blue"
        }, {
            "degree": 90, "color": "green"
        }, {
            "degree": 80, "color": "red"
        }]);
    }
});