var ui = (function(){
    return {
        resizePieChartClasses: function(r) {
            var clip_properties = {
                ".pieContainer .pie-right": "rect(" + 0 + "px, " + r * 2 + "px, " + r * 2 + "px, " + r + "px)",
                ".pieContainer .pie-left": "rect(" + 0 + "px, " + r + "px, " + r * 2 + "px, " + 0 + "px)",
                ".pieContainer .pie-left .pie": "rect(" + 0 + "px, " + r * 2 + "px, " + r * 2 + "px, " + r + "px)",
                ".pieContainer .pie-right .pie": "rect(" + 0 + "px, " + r + "px, " + r * 2 + "px, " + 0 + "px)"
            };
            var key, collection, element, i;

            for(key in clip_properties) {
                console.log(clip_properties[key]);
                collection = document.querySelectorAll(key);
                for(i = 0 ; i < collection.length ; i++) {
                    collection[i].style["clip"] = clip_properties[key];
                }
            }

            collection = document.querySelectorAll(".pieContainer");
            for(i = 0 ; i < collection.length ; i += 1) {
                collection[i].style["width"] = r * 2;
                collection[i].style["height"] = r * 2;
            }
      
        },
        radiusEventListener: function(){
            var _resizeFunction = function(){
                ui.resizePieChartClasses(Number(document.querySelector("input#radius-input-field").value) || 50);                
            }, _timeout_event;
            return function(){
                event.preventDefault();
                window.clearTimeout(_timeout_event);
                _timeout_event = window.setTimeout(_resizeFunction, 500);
                console.log(_timeout_event);
            }
        }(),
        displayShareLink: function(link){
            var twitter_box = document.querySelector("#show-off-box #twitter-button-wrapper"),
                d = document,
                clone, top_most_script, reloaded_script;

            d.getElementById("show-off-box").style["display"] = "inline";
            d.querySelector("#show-off-box #link").href = link;
            d.querySelector("#show-off-box #link").innerHTML = link;
            // then remove the contents of the twitter box
            while(twitter_box.firstChild) {
                twitter_box.removeChild(twitter_box.firstChild);
            }

            // add add it back again!
            clone = '<a class="twitter-share-button" data-url="' + link + '" href="https://twitter.com/share" data-text="just created a simple chart!">Tweet</a>';
            twitter_box.innerHTML = clone;
            // force twitter script to run again
            reloaded_script = d.createElement("script");
            reloaded_script.src = "https://platform.twitter.com/widgets.js";
            top_most_script = d.getElementsByTagName("script")[0];
            top_most_script.parentNode.insertBefore(reloaded_script, top_most_script);
        }
    }
})();
    