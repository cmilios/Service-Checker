function getRelevanceClassName(relevanceEstimation) {
    if (relevanceEstimation > relevanceLimit) return "relevant";
    else return "irrelevant";
}

function getReliabilityClassName(reliability) {
    if (reliability <= reliabilityBreakpoints.low) return "low_reliability";
    else if (reliability >= reliabilityBreakpoints.high) return "high_reliability";
    else return "middle_reliability";
}

function getPercentage(number) {
    return Math.round(number * 100) + "%";
}

function clearTimeline() {
    document.querySelector("#timeline .content").innerHTML = "";
}

function scrollTopTimeline() {
    document.querySelector("#timeline .content").scrollTop = 0;
}

function changeToEuropeDate(date) {
    return oneToTwoDigits(date.getDate()) + '/' + oneToTwoDigits(date.getMonth() + 1) + '/' + date.getFullYear();
}

function oneToTwoDigits(number) {
    return number > 9 ? "" + number : "0" + number;
}

function getConceptsArray(conceptsString) {
    return conceptsString.trim().split(" ");
}

function initializeListeners() {
    // Full screen functionality
    let fullScreenImageCont = document.querySelector("#full_screen_image");
    let fullScreenImage = fullScreenImageCont.querySelector("img");
    document.querySelectorAll(".image_container").forEach(el => {
        el.addEventListener("click", function () {
            fullScreenImage.src = this.querySelector("img").src;
            fullScreenImageCont.style.display = "flex";
        });
    });

    fullScreenImageCont.addEventListener("click", () => {
        fullScreenImageCont.style.display = "none";
    });

    // Event toggle button
    document.querySelectorAll(".event_toggle_button").forEach(el => {
        el.addEventListener("click", function () {
            this.parentNode.parentNode.classList.toggle("hidden_tweets");
        });
    });

    // Click on location
    document.querySelectorAll("#timeline .location").forEach(locationEl => {
        locationEl.addEventListener("click", function () {
            // console.log("location click");
            let closePopupButton = document.querySelector("#map .mapboxgl-popup-close-button");
            closePopupButton && closePopupButton.click();
            map.flyTo({
                center: [
                    parseFloat(this.dataset.longitude), parseFloat(this.dataset.latitude)
                ],
                zoom: 17,
                essential: true
            });
        });
    });
}

document.querySelector("#map").addEventListener("click", e => {
    if (e.target.classList.contains("focus_on_tweet")) {
        let clickedEl = document.querySelector("[data-id='" + e.target.dataset.id + "']");
        // console.log(clickedEl);
        clickedEl.scrollIntoView();
        clickedEl.focus();
    }
});

function urlify(text) {
    /*var mention_re = /\B@[a-z0-9_-]+/gi;
    text = text.replace(mention_re, "@user");*/
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
    })
}

function dateFormat(timestamp) {
    return new Date(timestamp).toGMTString();
}

////////////////////////////// *Wrote by: Chris Milios* //////////////////////////////

const resetButtonClick = () => {
    // console.log("reset button clicked");
    // showAreas();
    deleteLayers();
    clearAccordion();
    createTimeline(null, false)
    map.flyTo({
        center: [17.773145, 48.557861],
        zoom: 3.5
    })

    document.getElementById("resetbtn").style.display = "none";
}

const deleteLayers = () => {

    if(map.getLayer("MONLayers")) {
        map.removeLayer("MONLayers");
        map.removeSource("MONLayers");
    }


    if(map.getLayer("MUGLayers")) {
        map.removeLayer("MUGLayers");
        map.removeSource("MUGLayers");
    }

    if(map.getLayer("TRSLayers")) {
        map.removeLayer("TRSLayers");
        map.removeSource("TRSLayers");
    }

}

const hideAreas = () =>{
    map.setLayoutProperty('MONArea', 'visibility', 'none');
    map.setLayoutProperty('MUGArea', 'visibility', 'none');
    map.setLayoutProperty('TRSArea', 'visibility', 'none');
}

const showAreas = () =>{
    map.setLayoutProperty('MONArea', 'visibility', 'visible');
    map.setLayoutProperty('MUGArea', 'visibility', 'visible');
    map.setLayoutProperty('TRSArea', 'visibility', 'visible');
}

const hideLines = () =>{
    map.setLayoutProperty('MONAreaLine', 'visibility', 'none');
    map.setLayoutProperty('MUGAreaLine', 'visibility', 'none');
    map.setLayoutProperty('TRSAreaLine', 'visibility', 'none');
}

const highlightLayer = (event, item, id) => {
    hoveredFeature = "";
    
    layers.forEach(layer => {
        if(layer.type == 'Feature'){
            if(layer.properties.id == id){
                hoveredFeature = layer;
            }
        }
        else if(layer.type == 'FeatureCollection'){
            layer.features.forEach(feature => {
                if(feature.properties.id == id){
                    hoveredFeature = feature;
                }
            })
        }
        
    });
    console.log(hoveredFeature)


}

const unhighlightLayer = (event, item,id) => {

    unHoveredFeature = "";
    
    layers.forEach(layer => {
        if(layer.type == 'Feature'){
            if(layer.properties.id == id){
                unHoveredFeature = layer;
            }
        }
        else if(layer.type == 'FeatureCollection'){
            layer.features.forEach(feature => {
                if(feature.properties.id == id){
                    unHoveredFeature = feature;
                }
            })
        }
        
    });
    console.log(unHoveredFeature)
}