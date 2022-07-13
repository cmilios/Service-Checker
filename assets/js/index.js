// Parameters that can be changed from the user
let pageSize = 50, // number of tweets per page
    relevanceLimit = 0.6,
    reliabilityBreakpoints = {
        "low": 0.3,
        "high": 0.67
    };

// *******
let noMoreData = false;

map = addMap()
addLocationLayers();
setMapAnimation();
clickInteraction();

// Resize of components
let previousWidth = 0,
    resizeInterval,
    headers = document.querySelectorAll(".header:not(.header_2)"),
    resizedHeader;

headers.forEach(header => {
    header.addEventListener("click", function () {
        this.parentNode.classList.toggle("shrinked");
        if (resizeInterval != undefined) clearInterval(resizeInterval);
        document.querySelector(".mapboxgl-canvas").style.display = "none";
        resizedHeader = this.parentNode;
        resizeInterval = setInterval(manageTimeline, 50);
    });
});

manageTimeline();
window.addEventListener('resize', manageTimeline);

function manageTimeline() {
    let tweetContainerWidth = document.querySelector("#timeline .content").getBoundingClientRect().width;
    if (tweetContainerWidth <= 460) document.body.classList.add("mobile_timeline");
    else document.body.classList.remove("mobile_timeline");

    if (resizedHeader) {
        let resizedHeaderWidth = resizedHeader.getBoundingClientRect().width;
        if (previousWidth === resizedHeaderWidth) clearInterval(resizeInterval), document.querySelector(".mapboxgl-canvas").style.display = "block";
        previousWidth = resizedHeaderWidth;
        map.resize();
    }
}

let queryParameters = {};

// Tweets or clusters button
let radioButtonChecked = "";

let url_string = window.location.href;
let url = new URL(url_string);
let mode = url.searchParams.get("mode");
if (mode) {
    radioButtonChecked = mode;
    document.querySelector("input[name=mode]#" + radioButtonChecked).checked = true;
} else radioButtonChecked = "tweets"//document.querySelector("input[name=mode]:checked").id;

document.body.dataset.mode = radioButtonChecked;
queryParameters["collection"] = radioButtonChecked;

document.querySelectorAll("[name=mode]").forEach(element => {
    element.addEventListener("click", function () {
        // remove all elements from timeline
        if (this.id !== radioButtonChecked) {
            clearTimeline();
            radioButtonChecked = this.id;
            document.body.dataset.mode = radioButtonChecked;
            queryParameters["collection"] = radioButtonChecked;
            window.history.replaceState(null, null, "?mode=" + this.id);
            // page to zero both on js and html
            changePageNumber(0);
            newData();
        }
    });
});

// Datepicker initialization
let $datepickerFrom = $("#datepicker_from"),
    $datepickerTo = $("#datepicker_to");

$('.datepicker').datepicker();
$datepickerFrom.datepicker("setDate", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;
$datepickerTo.datepicker("setDate", today);

// Get button
let getButton = document.querySelector("#get_button"),
    page = 0;

getButton.addEventListener("click", function () {
    queryParameters["from"] = $("#datepicker_from").datepicker("getDate");
    queryParameters["to"] = $("#datepicker_to").datepicker("getDate");
    queryParameters["limit"] = pageSize;

    if (queryParameters.from != undefined && queryParameters.to != undefined) {
        queryParameters.from = queryParameters.from.getTime();
        queryParameters.to = queryParameters.to.getTime() + 86400000;
    }

    // if (radioButtonChecked === "tweets") {
    //     queryParameters["with_image"] = $('#with_image').is(":checked");
    //     queryParameters["with_location"] = $('#with_location').is(":checked");
    //     queryParameters["only_relevant"] = $('#only_relevant').is(":checked");
    // }
    // console.log(queryParameters);
    // changePageNumber(0);
    console.log($("#datepicker_from").datepicker("getDate"))
    console.log($("#datepicker_to").datepicker("getDate"))
    showTimeControls()
    // newData();
});

const showTimeControls = () =>{
    document.getElementById("timeControls").style.display = "flex"

}




// new data from / tweets, clusters / get button / next previous page / clusters / first retrieval
// function newData() {
//     if (queryParameters.from != undefined && queryParameters.to != undefined) {
//         queryParameters["skip"] = page * pageSize;
//         fetch(templateDir + "/classes/getData.php", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(queryParameters),
//             })
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//                 scrollTopTimeline();
//                 clearTimeline();
//                 let dataLength = data.length;
//                 if (dataLength != 0) {
//                     // if it returns data => **************************
//                     populateTimeline(data);
//                     // initializeListeners();

//                     noMoreData = dataLength < pageSize + 1;
//                     noMoreData ? nextPage.classList.add("inactive") : nextPage.classList.remove("inactive");
//                 } else noMoreData = true, changePageNumber(page), nextPage.classList.add("inactive"), noDataMessage();
//             })
//             .catch((error) => {
//                 noMoreData = true;
//                 changePageNumber(0);
//                 console.error(error);
//             });
//     } else {
//         noMoreData = true;
//         changePageNumber(0);
//         window.alert("Please select From and To date");
//     }
// }

function noDataMessage() {
    document.querySelector("#timeline .content").innerHTML = "<span id='no_more_data'>There are no data. Please try a different query.</span>"
}

function populateTimeline(data) {
    let geoJson = [],
        sameCoords = false;

    let length = data.length > pageSize ? pageSize : data.length;
    for (let i = 0; i < length; i++) {
        document.querySelector("#timeline .content").appendChild(newItem(data[i]));

        // markers
        let locationsObj = (radioButtonChecked == "tweets") ? data[i].estimated_locations : [data[i].location];
        if (locationsObj != undefined) {
            locationsObj.forEach(location => {
                for (let j = 0; j < geoJson.length; j++) {
                    const marker = geoJson[j];
                    sameCoords = false;
                    if (marker.geometry.coordinates[0] === location.geometry.coordinates[0] && marker.geometry.coordinates[1] === location.geometry.coordinates[1]) {
                        sameCoords = true;
                        marker.properties.push({
                            title: location.location_fullname,
                            description: (radioButtonChecked == "tweets") ? data[i].full_text : "",
                            id_str: (radioButtonChecked == "tweets") ? data[i].id_str : data[i]._id["$oid"]
                        });
                        break;
                    }
                }
                if (!sameCoords) {
                    geoJson.push({
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: location.geometry.coordinates
                        },
                        properties: [{
                            title: location.location_fullname,
                            description: (radioButtonChecked == "tweets") ? data[i].full_text : "",
                            id_str: (radioButtonChecked == "tweets") ? data[i].id_str : data[i]._id["$oid"]
                        }]
                    });
                }
            });
        }
    }
    console.log(geoJson);
    deleteAllMarkers();
    addMarkersToMap(geoJson);
    initializeListeners();
}

function deleteAllMarkers() {
    document.querySelectorAll("#map .mapboxgl-canvas-container .marker").forEach(marker => {
        marker.parentNode.removeChild(marker);
    });;
}

function addMarkersToMap(data) {
    for (let i = 0; i < data.length; i++) {
        const marker = data[i];

        const el = document.createElement("div");
        el.className = "marker mark" + i;
        el.style.zIndex = marker.properties.length;
        if (marker.properties.length > 1) el.dataset.total = marker.properties.length, el.classList.add("multiple");

        // make a marker for each feature and add to the map
        new mapboxgl.Marker({
                anchor: "bottom",
                element: el
            })
            .setLngLat(marker.geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup({
                    offset: 25,
                    closeOnClick: true
                }).setHTML(
                    marker.properties.map(info => {
                        return `<div class="tweet_in_popup"><p class="marker-popup-title">${info.title}</p>
                        ${ info.description != "" ? `<p class="marker-popup-text">${info.description}</p>` : ``}
                        <div class="focus_on_tweet" data-id="${info.id_str}">Focus in timeline</div></div>`
                    }).join("")
                )
            )
            .addTo(map);
    }
}

function newItem(item) {
    return radioButtonChecked == "tweets" ? newTweetElement(item, false) : newEventElement(item);
}

function newTweetElement(item, stringResult) {
    let template = `
    <div class="tweet component" data-id="${item.id_str}" tabindex="0">
        ${
            item.relevanceEstimation != undefined ?
                `<div class="relevance_estimation ${getRelevanceClassName(item.relevanceEstimation)}">
                    <span>${getPercentage(item.relevanceEstimation)}</span>
                </div>` : ""
        }
        ${
            item.reliability ? 
            `<div class="reliability_bar_container">
                <div class="reliability_bar ${getReliabilityClassName(item.reliability)}">
                    <div class="score_bar" style="width:${getPercentage(item.reliability)};"><span>${getPercentage(item.reliability)}</span></div>
                </div>
            </div>` : ""
        }
        ${
            item.image_url != undefined ?
            `<div class="image_container ${item.nudity ? "nude" : ""}"><img src="${item.image_url}" alt="" onerror="this.parentNode.style.display='none'"></div>`
            : ""
        }
        <div class="tweet_info">
            <div class="tweet_text">${urlify(item.full_text)}</div>
            <div class="tweet_details">
                <div class="tweet_date">${dateFormat(item.timestamp_ms_long)}</div>
                ${
                    item.estimated_locations != undefined ? 
                    `<div class="locations">
                        ${
                            item.estimated_locations.map(location => {
                                return `
                                <div class="location" data-longitude="${location.geometry.coordinates[0]}" data-latitude="${location.geometry.coordinates[1]}">
                                    <div class="flex location_left_part"><span class="iconify" data-icon="ep:location"></span><div class="location_name">${location.location_fullname}&nbsp;</div></div>
                                    <span class="location_coordinates">(${location.geometry.coordinates[0]}, ${location.geometry.coordinates[1]})</span>
                                </div>
                                `
                            }).join("")
                        }
                    </div>` : ""
                }
                ${
                    item.image_concepts != undefined ?
                    `<div class="img_concepts_container">
                        ${
                            getConceptsArray(item.image_concepts).map(concept => {
                                if (concept != "") {
                                    return `
                                    <div class="bubble">${concept}</div>
                                    `
                                }
                            }).join("")
                        }
                    </div>`
                    : ""                        
                }
            </div>
        </div>                
    </div>`;
    
    return stringResult ? template : new DOMParser().parseFromString(template, "text/html").body.firstElementChild;
}

function newEventElement(item) {
    let template = `
    <div class="event component hidden_tweets" data-id="${item._id["$oid"]}" tabindex="0">
        ${
            item.reliability ? 
            `<div class="reliability_bar_container">
                <div class="reliability_bar ${getReliabilityClassName(item.reliability)}">
                    <div class="score_bar" style="width:${getPercentage(item.reliability)};"><span>${getPercentage(item.reliability)}</span></div>
                </div>
            </div>` : ""
        }
        <div class="event_info">
            <div class="flex">
                <div class="flex event_icon">
                    <span class="iconify" data-icon="bi:file-earmark-text"></span>
                </div>
                <div>
                    <div class="location" data-longitude="${item.location.geometry.coordinates[0]}" data-latitude="${item.location.geometry.coordinates[1]}">
                        <div class="flex location_left_part"><span class="iconify" data-icon="ep:location"></span><div class="location_name">${item.description}&nbsp;</div></div>
                        <span class="location_coordinates">(${item.location.geometry.coordinates[0]}, ${item.location.geometry.coordinates[1]})</span>
                    </div>
                    <div class="tweet_date">${dateFormat(item.timestamp_ms_long)}</div>
                </div>
            </div>
            <div class="event_toggle_button">
                <span class="iconify" data-icon="fe:arrow-down"></span>
            </div>
        </div>
        <div class="event_tweets">
        ${
            item.tweets.map(tweet => {
                return newTweetElement(tweet, true);
            }).join("")
        }
        </div>
    </div>
    `;
    return new DOMParser().parseFromString(template, "text/html").body.firstElementChild;
}

// function initialization() {
//     // Pagination
//     paginationButtons.forEach(button => {
//         button.addEventListener("click", function (e) {
//             e.stopPropagation();

//             let getNewDataFlag = true;
//             if (this.id === "previous_page") page > 0 ? changePageNumber(--page) : getNewDataFlag = false;
//             else if (this.id === "next_page") !noMoreData ? changePageNumber(++page) : getNewDataFlag = false;
//             getNewDataFlag && newData();
//         });
//     });

//     // Event detection settings modal
//     fetch(templateDir + "/classes/getEventDetectionParametersValues.php", {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         // console.log(data);
//         if (data) {
//             document.querySelector("#events_settings_modal input#distance").value = data.distance;
//             document.querySelector("#events_settings_modal input#num_of_tweets").value = data.min_num_of_tweets;
//             document.querySelector("#events_settings_modal input#time_window").value = data.time_window;
//         }
//     })
//     .catch((error) => {
//         console.error(error);
//     });
    

//     let eventSettingsButton = document.querySelector("#event_settings_button");
//     let settingsModal = document.querySelector("#events_settings_modal");
//     eventSettingsButton.addEventListener("click", () => {
//         settingsModal.style.display = "flex";
//     });

//     settingsModal.addEventListener("click", e => {
//         e.target.id == "events_settings_modal" && (settingsModal.style.display = "none");
//     });

//     document.body.addEventListener("keyup", e => {
//         e.key === "Escape" && ((document.querySelector("#full_screen_image").style.display = "none"), (settingsModal.style.display = "none")), document.activeElement.blur();
//     });

//     document.querySelector("#close_modal").addEventListener("click", () => {
//         settingsModal.style.display = "none";
//     })

//     document.querySelector("#save_button span").addEventListener("click", () => {
//         let parameters = {
//             "distance": parseInt(document.querySelector("#events_settings_modal input#distance").value),
//             "min_num_of_tweets": parseInt(document.querySelector("#events_settings_modal input#num_of_tweets").value),
//             "time_window": parseInt(document.querySelector("#events_settings_modal input#time_window").value)
//         };
//         // console.log(parameters);
//         fetch(templateDir + "/classes/saveEventDetectionParameters.php", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(parameters),
//         })
//         .then(response => response.json())
//         .then(data => {
//             window.alert("The values were saved succesfully!");
//             settingsModal.style.display = "none";
//         })
//         .catch((error) => {
//             window.alert("An error occured during saving values: " + error);
//         });
//     });
// }

let paginationButtons = document.querySelectorAll(".pagination_buttons"),
    previousPage = document.querySelector("#previous_page"),
    nextPage = document.querySelector("#next_page");
// initialization();
getButton.click();

function changePageNumber(pageNumber) {
    page = pageNumber;
    document.querySelector("#page_number").textContent = pageNumber + 1;
    page == 0 ? previousPage.classList.add("inactive") : previousPage.classList.remove("inactive");
}

/*

"from": 
"to":
"skip":
"pageSize":
"with_image":
"with_location":
"only_relevant":
"collection": 

*/