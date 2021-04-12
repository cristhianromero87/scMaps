// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBIwzALxUPNbatRBj3Xi1Uhp0fFzwWNBkE&libraries=places">
var mapa;
var feature;

function cargar_mapa() {
    mapa = new L.Map('mapa', {zoomControl: true});
    var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttribution = 'Map data &copy; 2012 <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var layer_osm = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});
    mapa.setView(new L.LatLng(-25.29, -57.65), 13).addLayer(layer_osm);

    /*Events*/
    var markers = new L.FeatureGroup();
    mapa.on('click', function (e) {
        //markers.removeLayer();
      /*  mapa.removeLayer(markers);
        
        marker = new L.marker(e.latlng);
        markers.addLayer(marker);
        mapa.addLayer(markers);
        */
        mapa.removeLayer(marker);
        marker = new L.marker(e.latlng);
        marker.addTo(mapa);

        console.log('Creando Marcador');
     console.log(mapa);
    
        
        //alert(e.latlng); // e is an event object (MouseEvent in this case)

    });

}

function elegirDireccion(lat1, lng1, lat2, lng2, tipo_osm) {
    var loc1 = new L.LatLng(lat1, lng1);
    var loc2 = new L.LatLng(lat2, lng2);
    var bounds = new L.LatLngBounds(loc1, loc2);

    if (feature) {
        mapa.removeLayer(feature);
    }
    if (tipo_osm == "node") {
        feature = L.circle(loc1, 25, {color: 'green', fill: false}).addTo(mapa);
        mapa.fitBounds(bounds);
        mapa.setZoom(18);
    } else {
        var loc3 = new L.LatLng(lat1, lng2);
        var loc4 = new L.LatLng(lat2, lng1);

        feature = L.polyline([loc1, loc4, loc2, loc3, loc1], {color: 'red'}).addTo(mapa);
        mapa.fitBounds(bounds);
    }
}

function direccion_buscador() {
    var entrada = document.getElementById("direccion");

    $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + entrada.value, function (data) {
        var items = [];

        $.each(data, function (key, val) {
            bb = val.boundingbox;
            items.push("<li><a href='#' onclick='elegirDireccion(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3] + ", \"" + val.tipo_osm + "\");return false;'>" + val.display_name + '</a></li>');
        });

        $('#resultado').empty();
        if (items.length != 0) {
            $('<p>', {html: "Resultados de la b&uacute;queda:"}).appendTo('#resultado');
            $('<ul/>', {
                'class': 'my-new-list',
                html: items.join('')
            }).appendTo('#resultado');
        } else {
            $('<p>', {html: "Ningun resultado encontrado."}).appendTo('#resultado');
        }
    });
}
function onMapClick(e) {
    gib_uni();
    marker = new L.marker(e.latlng, {id: uni, icon: redIcon, draggable: "true"});
    map.addLayer(marker);
}
window.onload = cargar_mapa;

      