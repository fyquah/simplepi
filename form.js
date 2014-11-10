var chart_form = (function(){

    var _slice_count = 0;
    var _sliceTemplate = function(){
        return "<div class='slice-form'>" +
            "<div>" +
                "<span style='margin-right : 20px'>Slice " + (_slice_count + 1) + "</span>" +
                "<input style='margin-right : 20px' type='text' placeholder='angle (in degrees)' name='angle[" + _slice_count + "]' ></input>" +
                "<input type='text' placeholder='color (in hex or literals)' name='color[" + _slice_count + "]' ></input>" +
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
                angle_str , color_str ,
                form_elements = document.getElementById("form").elements,
                target_node;

            for (i = 0 ; i < _slice_count ; i++) {
                angle_str = form_elements["angle[" + i + "]"].value || 0;
                color_str = form_elements["color[" + i + "]"].value || "black";
                console.log(angle_str);
                console.log(color_str);
                console.log(form_elements);
                arr.push(new Slice({ "degree": Number(angle_str), "color": color_str}));
            }

            target_node = document.getElementById("chart-display");
            while(target_node.firstChild) {
                target_node.removeChild(target_node.firstChild);
            }
            
            target_node.innerHTML = Slice.drawChart(arr);    
            ui.resizePieChartClasses(Number(form_elements["radius"].value) || 50);
        }
    }
})();