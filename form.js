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
                all_slices = [],
                angle_str , color_str ,
                form_elements = document.getElementById("form").elements,
                target_node, chart_html, link, radius, chart_html;

            for (i = 0 ; i < _slice_count ; i++) {
                angle_str = form_elements["angle[" + i + "]"].value || 0;
                color_str = form_elements["color[" + i + "]"].value || "black";
                console.log(angle_str);
                console.log(color_str);
                console.log(form_elements);
                all_slices.push(new Slice({ "degree": Number(angle_str), "color": color_str}));
            }

            target_node = document.getElementById("chart-display");
            while(target_node.firstChild) {
                target_node.removeChild(target_node.firstChild);
            }
            
            chart_html = Slice.drawChart(all_slices);
            if (chart_html === false) {
                alert("Your slices' degrees are more than 360 degrees!")
                return false;
            } else {
                document.getElementById("chart-display").innerHTML = chart_html;
            }
            // update the url with the relvant query strings
            link = all_slices.reduce(function(memo, slice, index){
                return memo + (index ? "&" : "") + "c" + index + "=" + slice.color + "&d" + index + "=" + slice.degree;
            }, "?");

            radius = Number(document.querySelector("#radius-input-field").value);
            if(radius){ 
                ui.resizePieChartClasses(radius || 50);
                link += (link.length == 1 ? "" : "&") + "radius=" + radius ;
            }

            window.history.pushState(null, "new pie chart", link);
            ui.displayShareLink(window.location.origin + window.location.pathname + link);
        }
    }
})();