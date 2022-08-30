var map;

function addMap() {
    // console.log("init");

    mapboxgl.accessToken = 'pk.eyJ1IjoidGh1bmRlcmFyZWEiLCJhIjoiY2tsamlxM2ZiMjltZTJzbWc1cGhvMjU0bCJ9.4sp3moR9KYYka1J1G-6IvA';
    if (!mapboxgl.supported()) {
        alert('Your browser does not support Mapbox GL');
    } else {
        map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/satellite-streets-v11', // style URL
            center: [17.773145, 48.557861], // starting position [lng, lat]
            zoom: 3.5 // starting zoom
        });
        map.addControl(new mapboxgl.NavigationControl());
        map.addControl(new mapboxgl.FullscreenControl());
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            })
        );

        var layerList = document.getElementById('style_menu');
        var inputs = layerList.getElementsByTagName('input');

        function switchLayer(layer) {
            var layerId = layer.target.id;
            // map.getStyle().layers.forEach(element => {
            //     console.log(element);
            // });
            document.querySelectorAll(".img_checkbox").forEach(el => {
                el.checked = false;
            });
            document.querySelectorAll(".specific_metadata").forEach(el => {
                el.dataset.visible = false;
            });
            map.setStyle('mapbox://styles/mapbox/' + layerId);
        }

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].onclick = switchLayer;
        }

        map.on('load', function () {
            map.addSource('mapbox-dem', {
                'type': 'raster-dem',
                'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                'tileSize': 512,
                'maxzoom': 14
            });
            // add the DEM source as a terrain layer with exaggerated height
            map.setTerrain({
                'source': 'mapbox-dem',
                'exaggeration': 1.5
            });

            // add a sky layer that will show when the map is highly pitched
            map.addLayer({
                'id': 'sky',
                'type': 'sky',
                'paint': {
                    'sky-type': 'atmosphere',
                    'sky-atmosphere-sun': [0.0, 0.0],
                    'sky-atmosphere-sun-intensity': 15
                }
            });
        });
        map.doubleClickZoom.disable();
        return map;
    }
};

////////////////////////////// *Wrote by: Chris Milios* //////////////////////////////

const addLocationLayers = ()=>{


    new ClickableMarker()
    .setLngLat(turf.center(MONArea).geometry.coordinates)
    .onClick(() => {
        document.getElementById("resetbtn").style.display = "block";
        createTimeline("MON")
        showsSublayer("MON");
        map.flyTo({
            center: turf.center(MONArea).geometry.coordinates,
            zoom: 12
        });
    })
    .addTo(map);

    new ClickableMarker()
    .setLngLat(turf.center(TRSArea).geometry.coordinates)
    .onClick(() => {
        document.getElementById("resetbtn").style.display = "block";
        createTimeline("TRS")
        showsSublayer("TRS");
        map.flyTo({
            center: turf.center(TRSArea).geometry.coordinates,
            zoom: 13
        });
    })
    .addTo(map);

    new ClickableMarker()
    .setLngLat(turf.center(MUGArea).geometry.coordinates)
    .onClick(() => {
        document.getElementById("resetbtn").style.display = "block";
        createTimeline("MUG")
        showsSublayer("MUG");
        map.flyTo({
            center: turf.center(MUGArea).geometry.coordinates,
            zoom: 12
        });
    })
    .addTo(map);


    // map.on('load', function () {
    //     map.addSource('MON', {
    //         'type': 'geojson',
    //         'data': MONArea
    
    //     });
    //     map.addSource('MUG', {
    //         'type': 'geojson',
    //         'data': MUGArea
    
    //     });
    //     map.addSource('TRS', {
    //         'type': 'geojson',
    //         'data': TRSArea
    
    
    //     });
    //     map.addLayer({
    //         'id': 'MONArea',
    //         'type': 'fill',
    //         'source': 'MON',
    //         'layout': {'visibility': 'visible'},
    
    //         'paint': {
    
    //             "fill-color": 'white',
    //             'fill-outline-color': "red",
    //             'fill-opacity': 0.4
    
    //         }
    
    
    //     });
    //     map.addLayer({
    //         'id': 'MUGArea',
    //         'type': 'fill',
    //         'source': 'MUG',
    //         'layout': {'visibility': 'visible'},
    
    //         'paint': {
    
    //             "fill-color": 'white',
    //             'fill-outline-color': "red",
    //             'fill-opacity': 0.4
    
    //         }
    
    
    //     });
    //     map.addLayer({
    //         'id': 'TRSArea',
    //         'type': 'fill',
    //         'source': 'TRS',
    //         'layout': {'visibility': 'visible'},
    
    //         'paint': {
    
    //             "fill-color": 'white',
    //             'fill-outline-color': "red",
    //             'fill-opacity': 0.4
    
    //         } 
    //     });



    //     Adding lines layer to show focus on hover
    //     map.addLayer({
    //         'id': 'MONAreaLine',
    //         'type': 'line',
    //         'source': 'MON',
    //         'layout': {'visibility': 'none'},
    
    //         'paint': {
    //             'line-width': 1,
    //             'line-color': 'red'
    //         }
    //     });
    //     map.addLayer({
    //         'id': 'MUGAreaLine',
    //         'type': 'line',
    //         'source': 'MUG',
    //         'layout': {'visibility': 'none'},
    
    //         'paint': {
    //             'line-width': 1,
    //             'line-color': 'red'
    //         }
    //     });
    //     map.addLayer({
    //         'id': 'TRSAreaLine',
    //         'type': 'line',
    //         'source': 'TRS',
    //         'layout': {'visibility': 'none'},
    
    //         'paint': {
    //             'line-width': 1,
    //             'line-color': 'red'
    //         }
    //     });

    // })
}

// const setMapAnimation = () =>{
//     map.on('mousemove', "MUGArea", function () {
//         map.getCanvas().style.cursor = 'pointer'
//         map.setLayoutProperty('MUGAreaLine', 'visibility', 'visible');
        
//     });
//     map.on('mouseleave', "MUGArea", function () {
//         map.getCanvas().style.cursor = ''
//         map.setLayoutProperty('MUGAreaLine', 'visibility', 'none');
//     });


//     map.on('mousemove', "MONArea", function () {
//         map.getCanvas().style.cursor = 'pointer'
//         map.setLayoutProperty('MONAreaLine', 'visibility', 'visible');
//     });
//     map.on('mouseleave', "MONArea", function () {
//         map.getCanvas().style.cursor = ''
//         map.setLayoutProperty('MONAreaLine', 'visibility', 'none');
//     });


//     map.on('mousemove', "TRSArea", function () {
//         map.getCanvas().style.cursor = 'pointer'
//         map.setLayoutProperty('TRSAreaLine', 'visibility', 'visible');
//     });
//     map.on('mouseleave', "TRSArea", function () {
//         map.getCanvas().style.cursor = ''
//         map.setLayoutProperty('TRSAreaLine', 'visibility', 'none');
//     });

// }



const clickInteraction = () =>{
    map.on('click', "MONArea", function (e) {
        document.getElementById("resetbtn").style.display = "block";
        hideAreas();
        hideLines()
        createTimeline("MON")
        showsSublayer("MON");
        map.flyTo({
            center: turf.center(MONArea).geometry.coordinates,
            zoom: 12
        });
    });
    map.on('click', "MUGArea", function (e) {
        document.getElementById("resetbtn").style.display = "block";
        hideAreas();
        hideLines()
        createTimeline("MUG")
        showsSublayer("MUG");
        map.flyTo({
            center: turf.center(MUGArea).geometry.coordinates,
            zoom: 13
        });
    });
    map.on('click', "TRSArea", function (e) {
        document.getElementById("resetbtn").style.display = "block";
        hideAreas();
        hideLines()
        createTimeline("MUG")
        showsSublayer("TRS");
        map.flyTo({
            center: turf.center(TRSArea).geometry.coordinates,
            zoom: 12
        });
    });
}


const createTimeline = (area) =>{

    // Should be made a request to the server to get the data,
    // Using dummy data for now
    // Should get what type of data each area has
    let data = [
        {
            type: "OIL",
            fullName: "Oil Spill",
            firstDate:"12/1/21",
            lastDate:"30/3/22"
        },
        {
            type: "WDN",
            fullName: "Water Deliniation",
            firstDate:"12/1/21",
            lastDate:"18/4/22"
        },
        {
            type: "FLD",
            fullName: "Floods",
            firstDate:"12/1/21",
            lastDate:"11/8/22"
        },
        {
            type: "MDW",
            fullName: "Muddy Water",
            firstDate:"12/1/21",
            lastDate:"12/8/22"

        }
    ];

    poppulateAccordion(data);

}






const showsSublayer = (area) =>{
    if(area === "MON"){

        //should be made as request in order to get the data
        map.addSource('MONOil', {
            'type': 'geojson',
            'data': MONOil,
            
        })
        map.addLayer({
            'id': 'MONOil',
            'type': 'fill',
            'source': 'MONOil',
            'layout': {'visibility': 'visible'},
    
            'paint': {
                "fill-color": 'white',
                'fill-outline-color': "red",
                'fill-opacity': 0.4
            }
        })
       
    }
    if(area === "MUG"){
        map.addSource('MUGOil', {
            'type': 'geojson',
            'data': MUGOil,
            
        })
        map.addLayer({
            'id': 'MUGOil',
            'type': 'fill',
            'source': 'MUGOil',
            'layout': {'visibility': 'visible'},
    
            'paint': {
                "fill-color": 'white',
                'fill-outline-color': "red",
                'fill-opacity': 0.4
            }
        })
    }
    if(area === "TRS"){
        //should be made as request in order to get the data

        map.addSource('TRSOil', {
            'type': 'geojson',
            'data': TRSOil,
        })
        map.addLayer({
            'id': 'TRSOil',
            'type': 'fill',
            'source': 'TRSOil',
            'layout': {'visibility': 'visible'},

            'paint': {
                "fill-color": 'white',
                'fill-outline-color': "red",
                'fill-opacity': 0.4
            }
        })
         
    }
}

$(document).ready(function(){
    $("#myTab a").click(function(e){
        e.preventDefault();
        $(this).tab("show");
    });
});