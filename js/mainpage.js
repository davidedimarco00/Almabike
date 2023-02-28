/*!
* Start Bootstrap - Grayscale v7.0.5 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
//


import {getSoundLevelChart, getSensorMeasurement } from './ajaxUtils.js';



$(document).ready(function() {
    //INITIALIZING PAGE
    //Disable the default style of chart to customize it
    $('#myChart').removeAttr("style"); 
    //Graph tab click change status to active
    let tabs = '.nav-link#daily,.nav-link#monthly,.nav-link#weekly,.nav-link#annual';
    
    let selTab=$('.nav-link#daily').attr("id");

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"/"+(month)+"/"+(day) ;
    $('#datepicker').attr("value", today);
    $(tabs).on("click",  function() { //quando clicco su un tab bisogna lanciare un ajax che mi carica il chart corretto in live
        $(tabs).removeClass('active');
        $(this).addClass("active");
        let selectedTab =  $(this).attr("id");
        selTab = selectedTab;
        switch (selectedTab) {
            case "daily":
                $('#datepicker').attr("type","date");
                
                break;
            case "weekly":
                $('#datepicker').attr("type","week"); 
                break;
            case "monthly":
                $('#datepicker').attr("type","month"); 
                break;
            case "annual":
                $('#datepicker').attr("type","number");
                break;
        }
    });

    $("#searchChart").on("click",  function() { //quando clicco su un tab bisogna lanciare un ajax che mi carica il chart corretto in live
        getSoundLevelChart(selTab, $('#datepicker').val());
    });


    $('#selectSensor').on('change', function() {

        let sensorName = $(this).val();
        let a = getSensorMeasurement(sensorName);
        //changeColorMap();
        map._onResize(); 
        
        
    });

});







//DA QUI IN GIU ROBA DELLA MAPPA


let map = L.map('map', {zoomControl:false}).setView([ 44.4663908,11.4231331], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var mcg = L.markerClusterGroup({
    chunkedLoading: true,
    singleMarkerMode: true,
    spiderfyOnMaxZoom: false
  });

map.addLayer(mcg);

/*Legend specific*/
var legend = L.control({ position: "topleft" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Tegnforklaring</h4>";
  div.innerHTML += '<i style="background: #477AC2"></i><span>Water</span><br>';
  div.innerHTML += '<i style="background: #448D40"></i><span>Forest</span><br>';
  div.innerHTML += '<i style="background: #E6E696"></i><span>Land</span><br>';
  div.innerHTML += '<i style="background: #E8E6E0"></i><span>Residential</span><br>';
  div.innerHTML += '<i style="background: #FFFFFF"></i><span>Ice</span><br>';
  div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';
  
  

  return div;
};

legend.addTo(map);

 L.marker([ 44.4536538,11.4251721]).addTo(map).bindPopup('A pretty CSS3 popup.<br> Easily customizable.'); //Creates a marker at [latitude, longitude] coordinates.


 //algoritmo che fa scomparire/apparire i marker in base allo zoom creato
 var shelter1 = L.marker([44.536538,15.4251721]);

var shelterMarkers = new L.FeatureGroup();

shelterMarkers.addLayer(shelter1);

map.on('zoomend', function() {
    if (map.getZoom() <7){
            map.removeLayer(shelterMarkers);
    }
    else {
            map.addLayer(shelterMarkers);
        }
});



function changeColorMap() {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
}

   


























/*L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map);*/
