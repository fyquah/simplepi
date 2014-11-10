function Slice(obj){
    this.degree = obj.degree;
    this.color = obj.color;
}

Slice.sumOfSlicesDegrees = function(memo, slice){
    return memo + slice.degree;
}

Slice.drawChart = (function(){
    var _current_degree = 0;
    var _deepClone = function(obj){
        return JSON.parse(JSON.stringify(obj));
    };
    var _appendSlice = function(slice){
        var _degree = function(){
            // try to think by quadrants instead
            return (_current_degree % 180 + slice.degree);
        }
        var html = "<div class ='pie-" + (_current_degree < 180 ? "right" : "left")  + "'>" + 
                    "<div class = 'pie' style='background-color : " + slice.color + 
                        "; -webkit-transform:rotate(" + _degree() + "deg);" + 
                        " -moz-transform:rotate(" + _degree() + "deg);" + 
                        "-o-transform:rotate(" + _degree() + "deg);" + 
                        "transform:rotate(" + _degree() + "deg);" + 
                        "'>\n" + 
                    "</div>\n" +
                "</div>";
        // remember to update _current_degree before returning function
        _current_degree += slice.degree;
        return html;
    };

    return function(slices){
        if(slices.reduce(Slice.sumOfSlicesDegrees, 0) > 360) {
            return false;
        }
        var return_html = "";
        _current_degree = 0;

        slices.sort(function(a, b){
            return Number(a.degree) - Number(b.degree);
        });

        slices.forEach(function(slice){
            if (_current_degree + slice.degree > 180 && _current_degree < 180) {
                // create two slices to be appended
                left_slice = _deepClone(slice);
                right_slice = _deepClone(slice);
                left_slice.degree = 180 - _current_degree;
                right_slice.degree = slice.degree - left_slice.degree;
                return_html = _appendSlice(left_slice) + return_html;
                return_html = _appendSlice(right_slice) + return_html;
            } else { 
                // cjust append the slice
                return_html = _appendSlice(slice) + return_html;
            }
            console.log(return_html);
        });

        // then wrap the html in a pie container
        return_html = "<div class='pieBackground'></div>" + return_html;
        return_html = "<div class='pieContainer'>" + return_html + "</div>"

        return return_html;
    }
})();
