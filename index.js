document.addEventListener("DOMContentLoaded", function(event){
    document.getElementById("chart-display").innerHTML = Slice.drawChart([{
        "degree": 180, "color": "blue"
    }, {
        "degree": 90, "color": "green"
    }, {
        "degree": 80, "color": "red"
    }]);
});

var chart_form = (function(){

    var _slice_count = 0;
    var _sliceTemplate = function(){
        return "<div class='slice-form'>" +
            "<div>" +
                "<h3>Slice " + (_slice_count + 1) + "</h3>" +
                "<label>Angle (in degrees) : </label>" + 
                "<input type='text' name='angle[" + _slice_count + "]' ></input>" +
            "</div>" + 
            "<div>" + 
                "<label>Color (in hexadecimal code) : </label>" + 
                "<input type='text' name='color[" + _slice_count + "]' ></input>" +
            "</div>" +
        "</div>";
    };

    return {
        addSlice: function(){
            event.preventDefault();
            var little_div = document.createElement("div");
            little_div.innerHTML = _sliceTemplate();
            document.querySelector("#form #slices-form").appendChild(little_div);
            _slice_count += 1;
        },
        removeSlice: function(){
            event.preventDefault();
            if (_slice_count) {
                document.querySelector("#form #slices-form").lastChild.remove();
                _slice_count -= 1;
            }
        },
        submit: function(){
            event.preventDefault();
            var i,
                arr = [],
                angle_str , color_str;
                form_elements = document.getElementById("form").elements;
            for (i = 0 ; i < _slice_count ; i++) {
                angle_str = form.elements["angle[" + i + "]"].value || 0;
                color_str = form.elements["color[" + i + "]"].value || "black";
                console.log(angle_str);
                console.log(color_str);
                console.log(form_elements);
                arr.push(new Slice({ "degree": Number(angle_str), "color": color_str}));
            }
            document.getElementById("chart-display").innerHTML = Slice.drawChart(arr);
        }
    }
})();