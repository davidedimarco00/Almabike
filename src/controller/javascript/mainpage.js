/*!
* Start Bootstrap - Grayscale v7.0.5 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
//


//import {getSoundLevelChart} from '../../../resources/UISound/click-21156.mp3';
import {MainPageController} from  "../javascript/MainpageController.js";







let selectedTab;
var map = L.map('map', {zoomControl: false}).setView([44.4992192,11.2616459], 12);

let mainpageController = new MainPageController();


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
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    $('#datepicker').attr("value", today);
    $(tabs).on("click",  function() { //quando clicco su un tab bisogna lanciare un ajax che mi carica il chart corretto in live
        $(tabs).removeClass('active');
        $(this).addClass("active");
        selectedTab =  $(this).attr("id");
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

    let flagHeatMap = false ;
    let heat;
    $("#searchChart").on("click",function(e) { //quando clicco su un tab bisogna lanciare un ajax che mi carica il chart corretto in live
        /*var returnResult = getSoundLevelChart(selTab, $('#datepicker').val());
        alert(returnResult);*/
        // Abort any pending request
         // setup some local variables
         e.preventDefault();
         var $form = $("#chartForm");
         //alert("#datepicker, #input"+ selTab);
         // Let's select and cache all the fields
         var $inputs = $form.find("#datepicker, #input" + selTab );
         // Serialize the data in the form
         var serializedData = $inputs.serialize();
         alert(serializedData);
         //alert("A post passo i valori\n" + serializedData);
         $inputs.prop("disabled", true);

         let loadingSpinner = $("#loadingSpinner");
         loadingSpinner.css("visibility", "visible");


         $.ajax({
                 url: "./src/controller/php/getDynamicSoundLevelChart.php",
                 type: "post",
                 data:  serializedData,
                 cache: false,
                 success: function (response) {

                    if (flagHeatMap){
                        map.removeLayer(heat);
                    }

                    let data= JSON.parse(response);
                    let heatPoints = [];

                    for(var key in data) {
                        for (var key1 in data[key]) {
                            let heatPoint = [data[key][key1]["lati"]/100000, data[key][key1]["longi"]/100000, data[key][key1]["Noise_dBA"]/100];
                            heatPoints.push(heatPoint);
                        }
                    }

                        heat = L.heatLayer(heatPoints, {
                            radius: 25,
                            blur: 25,
                   
                            //da 0 a 60 verde, da 60 a 80 giallo, da 80 a 95 arancione, sopra i 95 rosso
                            gradient: {0: 'green', 0.6:'yellow', 0.80: 'orange', 0.95: 'red'}}).addTo(map);

                    flagHeatMap=true;
                    loadingSpinner.css("visibility", "hidden");

                

                    /*for(var key in data) {
                        for (var key1 in data[key]) {

                        var marker = L.circleMarker([data[key][key1]["lati"]/100000, data[key][key1]["longi"]/100000], {
                            color: getColor(data[key][key1]["Noise_dBA"]/100),
                            fillOpacity: 0.5,
                            radius: 15,
                        }).addTo(map);


                        
                        
                        marker.bindPopup("Livello di inquinamento: " + data[key][key1]["Noise_dBA"]);
                    }
                }*/
    
                },
                 
                 error: function(jqXHR, textStatus, errorThrown) {
                        alert("Chiamata fallita");
                         console.log(textStatus, errorThrown);
                 }
             });

             $inputs.prop("disabled", false);

    });

    function getColor(value) {
        if (value < 0.6) {
            return "green";
        }
        else if (value >= 0.6 && value < 0.8) {
            return "yellow";
        }
        else if (value >= 0.8 && value < 0.95) {
            return "orange";
        }else if (value >= 0.95){
            return "red";
        }

    }


    
    let flag = false;
    let markers;
    $('#selectSensor').on('change', function() {

         
         // Abort any pending request
       
         // setup some local variables
         var $form = $(this);
         // Let's select and cache all the fields
         var $inputs = $form.find("select");
         // Serialize the data in the form
         var serializedData = $form.serialize();

         $inputs.prop("disabled", true);

         $.ajax({
                 url: "./src/controller/php/getDynamicSensorCoord.php",
                 type: "post",
                 data:  serializedData,
                 cache: false,

                 success: function (response) {
                    alert(response);
                    let positions = JSON.parse(response);

                    
                    if (flag){
                        markers.clearLayers();
                    }

                    if (positions) {
                        markers = L.markerClusterGroup();
                        for(var key in positions) {
                            for (var key1 in positions[key]) {
                                var title = "Livello sonoro:" +  positions[key][key1]["Noise_dBA"] + "dB";
                                var marker = L.marker(new L.LatLng( positions[key][key1]["lati"]/100000,  positions[key][key1]["longi"]/100000), {
                                        title: title
                                });s
                                marker.bindPopup(title);
                                markers.addLayer(marker);
                                //L.marker([ positions[key][key1]["lati"]/100000, positions[key][key1]["longi"]/100000 ]).addTo(map);
                                //console.log(positions[key][key1]["lati"]/1000)
                            }
                            map.addLayer(markers);
                            flag = true;
                        }
                    }
                },
                 
                 error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                 }
             });

             $inputs.prop("disabled", false);
     });


     let zones = fetch("./resources/json/bologna.geojson");
     zones.then(response => {
                return response.json();
    }).then(data => {
        const polygons = L.geoJSON(data, {
            style: {
              color: 'red', // colore del bordo del poligono
              weight: 2,
              fillColor: 'black', // colore del riempimento del poligono
              fillOpacity: 0.05, // opacità del riempimento del poligono
            },

            onEachFeature: function(feature, layer) {
              // aggiungi il popup al poligono
              //questo è solo un codice di esempio.
              //Per i dati va eseguita un'altra chiamata per ottenere i dati relativi alla zona e poi vanno inseriti dentro il popup.

              let popupHTML = ` <table>
                                        <thead>
                                            <tr>
                                                <th colspan="2">`+feature.properties.name+`</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><small class="text-muted">Rumore medio:</small></td>
                                                <td>80db</td>
                                            </tr>
                                            <tr>
                                                <td><small class="text-muted">Numero di rilevazioni:</small></td>
                                                <td>88</td>
                                            </tr>
                                            <tr>
                                                <td><small class="text-muted">Soglia massima registrata:</small></td>
                                                <td>91db</td>
                                            </tr>
                                            <tr>
                                                <td><small class="text-muted">Soglia minima registrata:</small></td>
                                                <td>22db</td>
                                            </tr>
                                            <tr>
                                                <td><small class="text-muted">Stato zona:</small></td>
                                                <td>
                                                    <img src="images/svg/exclamationcircle.svg"></img>
                                                </td>
                                            </tr>
                                        </tbody>
                                 </table>`


              layer.bindPopup(popupHTML);
             /* layer.on('mouseover', function () {
                    this.openPopup();
              });
              layer.on('mouseout', function () {
                this.closePopup();
              });*/

            
            }
          });
         
          polygons.addTo(map);
    });




    //card info
    var info = L.control({position: 'topleft'});

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
        this._div.innerHTML = '<h4>Informazioni sulla zona</h4>' +  (props ?
            '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
            : 'Passa con il mouse sopra');
    };


    //card dei livelli
    var levelsCard = L.control({position: 'bottomleft'});

    levelsCard.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'levelsCard'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    levelsCard.update = function (props) {
        this._div.innerHTML =`
        <div class="btn-group-horizontal layerGroup">
            <button type="button" class="btn btn-default layers" id="satLayer"><img class="layerImages layerSelected" src="resources/images/layers/sat.png" style="width: 52px;height=52px;border-radius:8px;"></img></button>
            <button type="button" class="btn btn-default layers" id="streetMapLayer"><img class="layerImages" src="resources/images/layers/streetMap.png" style="width: 52px;height=52px;border-radius:8px;"></img></button>
            <button type="button" class="btn btn-default layers" id="lightMapLayer"><img class="layerImages" src="resources/images/layers/lightMap.png" style="width: 52px;height=52px;border-radius:8px;"></button>
        </div>`
    };



    info.addTo(map);
    levelsCard.addTo(map);

     let baselayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxNativeZoom: 18,
        maxZoom: 50,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    //===========================PROVE PER MVC
    
   
    $(".layers").on( "click", function(e) {
        map.removeLayer(baselayer)
        mainpageController.applyMapLayer($(this).attr("id"), map);
    });

    $("#nightMapToggle").on( "click", function(e) {
        if (this.checked){
            $(this).prop('checked', true); 
            mainpageController.applyDarkMode(map);
        }else{
            $(this).prop('checked', false); 
            mainpageController.applyLightMode(map);
        }
    });

    





















    /*map.on('zoomstart', function(ev) {
        

        if (flagHeatMap) {

            heat.setOptions({
                radius: getRadius(map.currentZoom),
                max: 1.0,
                blur: 15,              
                gradient: {
                    0.0: 'green',
                    0.5: 'yellow',
                    1.0: 'red'
                },
                minOpacity: 0.7
            });
            // render the new options
            heat.redraw();
        }
    });*/





});


    //var markerpositions;
    //var map = L.map('map', {zoomControl: false}).setView([44.4992192,11.2616459], 12);
   /* var baselayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);*/






