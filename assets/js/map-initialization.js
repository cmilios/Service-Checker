var map;

function addMap() {
    console.log("init");

    mapboxgl.accessToken = 'pk.eyJ1IjoidGh1bmRlcmFyZWEiLCJhIjoiY2tsamlxM2ZiMjltZTJzbWc1cGhvMjU0bCJ9.4sp3moR9KYYka1J1G-6IvA';
    if (!mapboxgl.supported()) {
        alert('Your browser does not support Mapbox GL');
    } else {
        map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/satellite-streets-v11', // style URL
            center: [13.800000, 45.633331], // starting position [lng, lat]
            zoom: 10 // starting zoom
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
        return map;
    }
};

const addLocationLayers = ()=>{


    map.on('load', function () {
        map.addSource('MON', {
            'type': 'geojson',
            'data': MONArea
    
    
        });
        map.addSource('MUG', {
            'type': 'geojson',
            'data': MUGArea
    
    
        });
        map.addSource('TRS', {
            'type': 'geojson',
            'data': TRSArea
    
    
        });
        map.addLayer({
            'id': 'MONArea',
            'type': 'fill',
            'source': 'MON',
            'layout': {'visibility': 'visible'},
    
            'paint': {
    
                "fill-color": 'white',
                'fill-outline-color': "red",
                'fill-opacity': 0.4
    
            }
    
    
        });
        map.addLayer({
            'id': 'MUGArea',
            'type': 'fill',
            'source': 'MUG',
            'layout': {'visibility': 'visible'},
    
            'paint': {
    
                "fill-color": 'white',
                'fill-outline-color': "red",
                'fill-opacity': 0.4
    
            }
    
    
        });
        map.addLayer({
            'id': 'TRSArea',
            'type': 'fill',
            'source': 'TRS',
            'layout': {'visibility': 'visible'},
    
            'paint': {
    
                "fill-color": 'white',
                'fill-outline-color': "red",
                'fill-opacity': 0.4
    
            } 
        });



        //Adding lines layer to show on hover
        map.addLayer({
            'id': 'MONAreaLine',
            'type': 'line',
            'source': 'MON',
            'layout': {'visibility': 'none'},
    
            'paint': {
                'line-width': 1,
                'line-color': 'red'
            }
        });
        map.addLayer({
            'id': 'MUGAreaLine',
            'type': 'line',
            'source': 'MUG',
            'layout': {'visibility': 'none'},
    
            'paint': {
                'line-width': 1,
                'line-color': 'red'
            }
        });
        map.addLayer({
            'id': 'TRSAreaLine',
            'type': 'line',
            'source': 'TRS',
            'layout': {'visibility': 'none'},
    
            'paint': {
                'line-width': 1,
                'line-color': 'red'
            }
        });

    })
}

const setMapAnimation = () =>{
    map.on('mousemove', "MUGArea", function () {
        map.getCanvas().style.cursor = 'pointer'
        map.setLayoutProperty('MUGAreaLine', 'visibility', 'visible');
        
    });
    map.on('mouseleave', "MUGArea", function () {
        map.getCanvas().style.cursor = ''
        map.setLayoutProperty('MUGAreaLine', 'visibility', 'none');
    });


    map.on('mousemove', "MONArea", function () {
        map.getCanvas().style.cursor = 'pointer'
        map.setLayoutProperty('MONAreaLine', 'visibility', 'visible');
    });
    map.on('mouseleave', "MONArea", function () {
        map.getCanvas().style.cursor = ''
        map.setLayoutProperty('MONAreaLine', 'visibility', 'none');
    });


    map.on('mousemove', "TRSArea", function () {
        map.getCanvas().style.cursor = 'pointer'
        map.setLayoutProperty('TRSAreaLine', 'visibility', 'visible');
    });
    map.on('mouseleave', "TRSArea", function () {
        map.getCanvas().style.cursor = ''
        map.setLayoutProperty('TRSAreaLine', 'visibility', 'none');
    });

}