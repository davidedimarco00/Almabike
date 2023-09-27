import  {ChartFactory} from "../javascript/chartFactory/chartFactory.js";
import { HeatMapFactory } from "../javascript/heatMapFactory/HeatMapFactory.js";

export class MainpageModel {
    
    constructor() {
        this.ajaxCall = []; //array che contiene le chiamate ajax da eseguire, serve per la gestione della fine
        this.map=L.map('map', {zoomControl: false}).setView([44.4992192,11.2616459], 12);
        this.zonesAreVisible=false;
        this.selCheckbox;
        const self = this;
        this.flagHeatMap = false ;
        this.allPointsOnMap= [];
        this.allPolygonsOnMap= [];
        this.allPointsOnMap2 =[];
        this.ajaxResponse=[];
        this.heat;
        this.chartFactory = new ChartFactory('myChart');
        this.heatMapFactory = new HeatMapFactory(this.map);
    }

  
    initpage() {

        //INITIALIZING PAGE
        //Disable the default style of chart to customize it
        $('#myChart').removeAttr("style"); 
        //Graph tab click change status to active
        let checkboxes = 'input#inputdaily,input#inputmonthly,input#inputweekly,input#inputannual';

        self.selCheckbox=$('input#inputdaily').attr("id");

        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
        $('#datepicker').attr("value", today);

        $(checkboxes).on("click",  function() { //quando clicco su una bisogna lanciare un ajax che mi carica il chart corretto in live
            $(checkboxes).prop('checked', false);

            $(this).prop('checked', true);

            let selectedCheckbox =  $(this).attr("id");

            self.selCheckbox = selectedCheckbox;
            

            switch (selectedCheckbox) {
                case "inputdaily":
                    $('#datepicker').attr("type","date");
                    $('#dateLabel').text("Scegli un giorno");
                    $(".hour-input").prop("disabled", false);
                    break;
                case "inputmonthly":
                    $('#datepicker').attr("type","month"); 
                    $('#dateLabel').text("Scegli un mese");
                    $(".hour-input").prop("disabled", true);
                    break;
                case "inputannual":
                    $('#datepicker').attr("type","number");
                    $('#dateLabel').text("Scegli un anno");
                    $(".hour-input").prop("disabled", true);
                    break;
            }
        });

        $('#loadingSpinner').hide();

         //SOLO PER FARE TESTING
      this.map.on('click', function(e) {
         console.log(e.latlng.lat,e.latlng.lng);

      });
      //this.createChart();
      //Applico la mappa di default
      this.applyMapLayer("streetMapLayer");
      //poi ci metto le zone
      this.showZones(this.map);
      //poi aggiungo i controlli sulla mappa
      this.addMapControls(this.map);

    }


    searchButtonClick(){
      var $form = $("#chartForm");
      //alert("#datepicker, #input"+ selTab);
      // Let's select and cache all the fields
      var $inputs = $form.find("#datepicker, #"+self.selCheckbox+", .hour-input");
      // Serialize the data in the form
      var serializedData = $inputs.serialize();

     
      //alert(serializedData);

      alert("A post passo i valori\n" + serializedData);

      //FACCIO IL GRAFICO

      var formData = new URLSearchParams(serializedData);
      // Accedi al valore di un campo specifico, ad esempio 'typeofdate'
      let typeofdateValue = formData.get('typeofdate');
      let datePickerValue = formData.get('datepicker');


      console.log("ho selezionato: " + typeofdateValue);

      if (typeofdateValue == "daily") { //se h oselezionato il giorno
        let starthour = formData.get('starthour');
        let endhour = formData.get('endhour');

        if (starthour === null || starthour.trim() === '' || endhour === null || endhour.trim() === '' ) {
          //alert("i campi sono vuoti");
          //allora voglio il grafico giornaliero con tutte le misurazioni del giorno
          
          console.log("Sensore attualmente selezionato=", $('#selectSensor').val());
          this.getValuesForDailyChart($('#selectSensor').val(), datePickerValue, typeofdateValue);
          //console.log(this.ajaxResponse);
          

          //ed anche il grafico con la media

        }else{
          starthour = starthour +":00"; //preparo la formattazione dei due parametri
          endhour = endhour+":00";
          alert(starthour + " " + endhour);
          this.getValuesForDailyChartBetweenHours($('#selectSensor').val(), datePickerValue, starthour, endhour, typeofdateValue);

        }
      } else if (typeofdateValue=="monthly") {
          this.getValuesForMonthlyChart($('#selectSensor').val(), datePickerValue, typeofdateValue);
      } else if (typeofdateValue=="annual") {
          this.getValuesForAnnualChart($('#selectSensor').val(), datePickerValue, typeofdateValue);
      }


      //OTTENGO I VALORI CHE MI SERVONO
      /*values = this.getValuesForChart(serializedData);
      this.createChart(values);*/

      //COLORO LA MAPPA?

      //this.applyHeatMapLayerForSensor(serializedData, this.map);
    }


    getValuesForDailyChart(selectedSensor, date, typeofdateValue) { //giornalieri

      let self = this;

      console.log("I'm here ", selectedSensor, date);
          $.ajax({
            url: "./src/controller/php/getAllMeasureForDay.php",
            type: "POST",
            data: {"selectedSensor": selectedSensor, "date": date},
            cache: false,
      
            success: success,
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
            },
          });
          function success(response)  {

            let responseParsed = JSON.parse(response);

            self.createChart(responseParsed,typeofdateValue);
            
          }
    }


    getValuesForDailyChartBetweenHours(selectedSensor, date, startHour, endHour, typeofdateValue) { //giornalieri nelle ore...

      let self = this;

      console.log("I'm here ", selectedSensor, date);

      
          $.ajax({
            url: "./src/controller/php/getAllMeasureForDayBetweenHours.php",
            type: "POST",
            data: {"selectedSensor": selectedSensor, "date": date, "starthour": startHour, "endhour": endHour},
            cache: false,
      
            success: success,
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
            },
          });


          function success(response)  {

            console.log(response);

            let responseParsed = JSON.parse(response);

            self.createChart(responseParsed, typeofdateValue);
            
          }

    }

    getValuesForMonthlyChart(selectedSensor, month, typeofdateValue) { //mensili

      let self = this;

      console.log("I'm here ", selectedSensor, typeofdateValue);
          $.ajax({
            url: "./src/controller/php/getAllMeasureForMonth.php",
            type: "POST",
            data: {"selectedSensor": selectedSensor, "month": month},
            cache: false,
      
            success: success,
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
            },
          });
          function success(response)  {
            console.log(response);

            let responseParsed = JSON.parse(response);

            

            self.createChart(responseParsed, typeofdateValue);
            
          }
    }

    getValuesForAnnualChart(selectedSensor, year, typeofdateValue) { //annuale

      let self = this;

      console.log("I'm here ", selectedSensor, typeofdateValue);
          $.ajax({
            url: "./src/controller/php/getAllMeasureForYear.php",
            type: "POST",
            data: {"selectedSensor": selectedSensor, "year": year},
            cache: false,
      
            success: success,
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
            },
          });
          function success(response)  {
            console.log("Risultato query: " +response);

            let responseParsed = JSON.parse(response);

            

            self.createChart(responseParsed, typeofdateValue);
            
            
          }
    }


    /*MAP FUNCTIONS*/

    addMapControls(map){

        //card dei livelli
        let levelsCard = L.control({position: 'bottomleft'});

        levelsCard.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'levelsCard'); // create a div with a class "info"
            this.update();
            return this._div;
        };

        levelsCard.update = function (props) {
            this._div.innerHTML =` 
            <div class="btn-group-horizontal layerGroup">
                <button type="button" class="btn btn-default layers" id="satLayer"><img class="layerImages layerSelected" src="resources/images/layers/sat.png" style="width: 52px;height=52px;border-radius:8px;" data-toggle="tooltip" data-placement="top" title="Satellite"></img></button>
                <button type="button" class="btn btn-default layers" id="streetMapLayer"><img class="layerImages" src="resources/images/layers/streetMap.png" style="width: 52px;height=52px;border-radius:8px;" data-toggle="tooltip" data-placement="top" title="Mista"></img></button>
                <button type="button" class="btn btn-default layers" id="lightMapLayer"><img class="layerImages" src="resources/images/layers/lightMap.png" style="width: 52px;height=52px;border-radius:8px;" data-toggle="tooltip" data-placement="top" title="Stradale"></button>
                <button type="button" class="btn btn-default layers" id="clearLayer"><img class="layerImages" src="resources/images/layers/broom-solid.svg" style="width: 52px;height=52px;border-radius:8px;" data-toggle="tooltip" data-placement="top" title="Pulisci mappa"></button>
            </div>`
        };
        levelsCard.addTo(map);

        //card delle zone
        let zonesCard = L.control({position: 'bottomleft'});

        zonesCard.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'zonesCard'); // create a div with a class "info"
            this.update();
            return this._div;
        };

        zonesCard.update = function (props) {
            this._div.innerHTML =`
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="zonesToggle" checked>
                <label class="form-check-label" for="zonesToggle">Visualizzazione a zone</label>
            </div>`
        };
        zonesCard.addTo(map);
        

        //card della legenda della mappa
       /* var legend = L.control({position: 'bottomright'});
        legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'infolegend');
        labels = ['<strong>Categories</strong>'],
        categories = ['Road Surface','Signage','Line Markings','Roadside Hazards','Other'];
         
        
            this.div.innerHTML = labels.join('<br>AAA');
        return this.div;
        };


        legend.addTo(map);*/

        let legendCard = L.control({position: 'bottomright'});

        

        legendCard.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'legendCard'); // create a div with a class "info"
            this.update();
            return this._div;
        };

        legendCard.update = function (props) {

            this._div.innerHTML ='';

            let labels = ['<strong>Categories</strong>'], 
            categories = ['Road Surface','Signage','Line Markings','Roadside Hazards','Other'],
            colors = ["red", "orange", "yellow", "green", "black"]

            for (var i = 0; i < categories.length; i++) {
       

              this._div.innerHTML +=
                  labels.push(
                    '<i class="fas fa-circle" style="color:'+colors[i]+';"</i> ' + categories[i] + '<br>'
                  );
  
            }

          this._div.innerHTML = labels.join('<br>');
            


        };
        legendCard.addTo(map);







    }
  
    applyMapLayer(mapLayer, map=this.map) {

      this.map.eachLayer(function (layer) {
        console.log(layer._leaflet_id);
        if (layer._leaflet_id != 72) {
          //overlay zones layer
          map.removeLayer(layer);
        }
      });

  

      switch (mapLayer) {
        case "satLayer":
          L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            {
              attribution:
                "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            },
          ).addTo(this.map);
  
          break;
  
        case "lightMapLayer":
          L.tileLayer(
            "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
            {
              maxZoom: 20,
              attribution:
                '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            },
          ).addTo(this.map);
  
          break;
        case "streetMapLayer":
           L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxNativeZoom: 18,
            maxZoom: 50,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }).addTo(this.map);
  
          break;
  
        case "darkMode":
          L.tileLayer(
            "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
            {
              maxZoom: 19,
              attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            },
          ).addTo(this.map);
          break;
      }

      if (this.zonesAreVisible){
        this.addZones(this.map);
      }
    }
  
    darkMode(map) {
      let oldlink = document.getElementsByTagName("link").item(0);
  
      let newlink = document.createElement("link");
      newlink.setAttribute("rel", "stylesheet");
      newlink.setAttribute("type", "text/css");
      newlink.setAttribute("href", "src/view/css/darkMode/mainPageStyleDark.css");
  
      document
        .getElementsByTagName("head")
        .item(0)
        .replaceChild(newlink, oldlink);
  
      this.applyMapLayer("darkMode", map);
      ////QUI SOTTO DEVO CAMBIARE IL COLORE (in colori di default) DEI CONTROLLI E DEGLI ELEMENTI DEL DOM
      //potrei caricare un altro css della stessa pagina con i colori cambiati e impostare una vriabile di sessione in cui specifico che la modalità scelta è quella light o dark
  
      //QUI SOTTO DEVO CAMBIARE IL COLORE DEI CONTROLLI E DEGLI ELEMENTI DEL DOM
    }
  
    lightMode(map) {
      let oldlink = document.getElementsByTagName("link").item(0);
  
      let newlink = document.createElement("link");
      newlink.setAttribute("rel", "stylesheet");
      newlink.setAttribute("type", "text/css");
      newlink.setAttribute("href", "src/view/css/mainPageStyle.css");
  
      document
        .getElementsByTagName("head")
        .item(0)
        .replaceChild(newlink, oldlink);
  
      this.applyMapLayer("darkMode", map);
      this.applyMapLayer("streetMapLayer", map);
      ////QUI SOTTO DEVO CAMBIARE IL COLORE (in colori di default) DEI CONTROLLI E DEGLI ELEMENTI DEL DOM
      //potrei caricare un altro css della stessa pagina con i colori cambiati e impostare una vriabile di sessione in cui specifico che la modalità scelta è quella light o dark
    }
  
    addZones(map) {
      let polygonsVertex = [];
      let allPointsOnMap = [];
      let allPointsOnMap2 = [];

      $.ajax({
        url: "./src/controller/php/getAllPointsForPolygons.php",
        cache: false,
  
        success: function (response) {
          // alert(response);
          let vertex = JSON.parse(response);
  
          if (vertex) {
            for (var key in vertex) {
              for (var key1 in vertex[key]) {


                var lat = vertex[key][key1]["lati"] / 100000;
                var lng = vertex[key][key1]["longi"] / 100000;
                var noise = vertex[key][key1]["Noise_dBA"];

                var point = {
                  lat: lat,
                  lng: lng,
                  noise: noise
                };

                var point2 = {
                  lat: lat,
                  lng: lng,
         
                };

                allPointsOnMap.push(point);
                allPointsOnMap2.push(point2);
            
              }
            }
            self.allPointsOnMap = allPointsOnMap;
            self.allPointsOnMap2 = allPointsOnMap2;

            
      
          }

              let zones = fetch("./resources/json/bologna.geojson");

          
                zones
                  .then((response) => {
                    return response.json();
                  })
                  .then((data) => {
                    const polygons = L.geoJSON(data, {
                      style: {
                        color: "red", // colore del bordo del poligono
                        weight: 0.8,
                        fillColor: "black", // colore del riempimento del poligono
                        fillOpacity: 0.05, // opacità del riempimento del poligono
                      },
            
                      onEachFeature: function (feature, layer) { //per ogni poligono

                                 /*         let popupHTML =
                                  ` <table>
                                                            <thead>
                                                                <tr>
                                                                    <th colspan="2">` +
                                  feature.properties.name +
                                  `</th>
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
                                   </table>`;
  
                                  layer.bindPopup(popupHTML);*/

                      }

                    });

                    polygons.addTo(map);


                    polygons.eachLayer(function (zone) {

                            let vertices_x = zone.feature.geometry.coordinates[0].map(coord => coord[1]); // longitude points of polygon
                            console.log("PER " + zone.feature.properties.name + " abbiamo il seguente array di latitudini \n\n" + vertices_x);
                          
                            let vertices_y = zone.feature.geometry.coordinates[0].map(coord => coord[0]); // latitude points of polygon
                            console.log("PER " + zone.feature.properties.name + " abbiamo il seguente array di longitudine \n\n" + vertices_y);




                            let points_polygon = vertices_x.length;
                        
                            // Crea il poligono utilizzando Leaflet
                          // const polygon = L.polygon(data.geometry.coordinates[0]).addTo(map);
                        
                            // Coordinata del punto da verificare
                            let longitude = 44.5387; // latitude of point to be checked
                            let latitude = 11.2846; // longitude of point to be checked
                          
                            // Verifica se il punto è all'interno del poligono
                            if (is_in_polygon(points_polygon, vertices_x, vertices_y, longitude, latitude)) {
                                console.log("Il punto è all'interno del poligono!");
                                // Puoi fare altre azioni qui, ad esempio aggiungere un marker o mostrare un messaggio
                            } else {
                                console.log("Il punto non è all'interno del poligono");
                            }

                            function is_in_polygon(points_polygon, vertices_x, vertices_y, longitude_x, latitude_y, c) {
                              let i, j;
                              for (i = 0, j = points_polygon - 1; i < points_polygon; j = i++) {
                                  if ((vertices_y[i] > latitude_y !== (vertices_y[j] > latitude_y)) && (longitude_x < (vertices_x[j] - vertices_x[i]) * (latitude_y - vertices_y[i]) / (vertices_y[j] - vertices_y[i]) + vertices_x[i])) {
                                      c = !c;
                                  }
                              }
                              return c;
                          }


            })


                 /** 
                    let zonesToPointInside = {};
                    
                    polygons.eachLayer(function (zone) {
                      var zoneBounds = zone.getBounds(); // Ottieni i limiti della zona

                     // Itera attraverso gli oggetti dei punti nell'array
                     self.allPointsOnMap2.forEach(function (point) {
                      var pointCoords = [point.lat, point.lng]; // Coordinate del punto
              
                      // Verifica se il punto è all'interno dei limiti della zona
                      if (zoneBounds.contains(L.latLng(pointCoords[0], pointCoords[1]))) {
                          // Crea un marker per il punto e aggiungilo al gruppo dei marker dei punti
                         /* var marker = L.marker(pointCoords);
                          pointMarkers.addLayer(marker);*/

                        /*  if (!zonesToPointInside.hasOwnProperty(zone.feature.properties.name) ){
                            zonesToPointInside[zone.feature.properties.name] = [pointCoords]
                          }else {
                            zonesToPointInside[zone.feature.properties.name].push(pointCoords);
                          }*/

                          
                          //console.log("Il punto (" + point.lat + " " + point.lng + ") si trova dentro la zona: " + zone.feature.properties.name );
                      //}
            //});
                      
                    });




                    //console.log(zonesToPointInside);
                      //questo va ma è impreciso

                   /* for (const zona in zonesToPointInside) {
                      if (zona === "AEROPORTO") {
                          const punti = zonesToPointInside[zona];
                          for (const punto of punti) {
                              const lat = punto[0]; // Latitudine
                              const lng = punto[1]; // Longitudine
                              
                              // Crea un marker Leaflet e aggiungilo alla mappa
                              L.marker([lat, lng]).addTo(map)
                                  .bindPopup(`Zona: ${zona}<br>Lat: ${lat}<br>Lng: ${lng}`);
                          }
                      }
                  }*/
                  

            
                   /*   let mappa = {};
                    
                      for (let feature of data.features) {

                          mappa[feature.properties.name] = feature.geometry.coordinates;
                          
                           //console.log("Per " + feature.properties.name + " abbiamo l'array di coordinate\n " + feature.geometry);
                      }

                      
                      

                      for (let nome in mappa) {
                        
                        let array_poligono = mappa[nome];

                        

                        for (let point of self.allPointsOnMap2) {
                         

                         // console.log("Considero " + nome + " Col punto: " + point.lat + " "+point.lng);


                          let leafletPolygon = L.polygon(array_poligono);
                          console.log(array_poligono);

                          if(point.lat !=0) {

                            if (leafletPolygon.contains(new L.LatLng(point.lat, point.lng))){
                              console.log("Il punto " + point.lat + " " + point.lng + "è contenuto dentro " + nome );
                            }else{
  
                            }

                          }

                         
                          
                        }*/


                    
                    //alert(polygonsVertex.toString());

        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
        },
      });


  


  


      




    }
  
    showZones(map) {
      this.addZones(map);
      this.zonesAreVisible=true;
    }
  
    hideZones(map) {
        this.zonesAreVisible=false;
        map.eachLayer(function (layer) {
            if (layer instanceof L.Polygon) {
            layer.remove();
            }
        });
    }

    clearMapLayers(map=this.map){
      this.map.eachLayer(function (layer) {
        map.removeLayer(layer);
      });
      this.applyMapLayer("streetMapLayer")
    }

    
    //DASHBOARD FUNCTIONS






    getAllStatsFromSensor(selectedSensor) {
      
      let self = this;

      console.log("I'm here ", selectedSensor);
          $.ajax({
            url: "./src/controller/php/getAllStatsFromSensor.php",
            type: "POST",
            data: selectedSensor,
            cache: false,
      
            success: success,
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
            },
          });
          function success(response)  {
            console.log("Risultato query: " +response);

            let responseParsed = JSON.parse(response);
            self.buildCardLabelsForSensor(responseParsed);
          }
    }


     
    getBaseInfoFromSelectedSensor(map, selectedSensor) {
      let flag = true;
      let markers;
      let sensorInfo;
      let self = this;
  
      $.ajax({
        url: "./src/controller/php/getDynamicSensorCoord.php",
        type: "post",
        data: selectedSensor,
        cache: false,
  
        success: function (response) {
          //alert(response);
  
          let positions = JSON.parse(response);
  
  
          sensorInfo = positions;
  
          if (markers != undefined) {
            markers.clearLayers();
          }
  
          if (positions) {
            markers = L.markerClusterGroup();
            let soundLevels = [];
            let data=[];
            
  
            for (var key in positions) {
              for (var key1 in positions[key]) {
                var title =
                  "Livello sonoro:" + positions[key][key1]["Noise_dBA"] + "dB";
                var marker = L.marker(
                  new L.LatLng(
                    positions[key][key1]["lati"] / 100000,
                    positions[key][key1]["longi"] / 100000,
                  ),
                  {
                    title: title,
                  },
                );
  
                soundLevels.push(positions[key][key1]["Noise_dBA"]);
                data.push([positions[key][key1]["lati"] / 100000, positions[key][key1]["longi"] / 100000, positions[key][key1]["Noise_dBA"]]);
  
                marker.bindPopup(title);
                markers.addLayer(marker);
                //L.marker([ positions[key][key1]["lati"]/100000, positions[key][key1]["longi"]/100000 ]).addTo(map);
                //console.log(positions[key][key1]["lati"]/1000)
              }
              
              map.addLayer(markers);
              flag = true;
             // $("#maxSoundLevelLabel").text(Math.max.apply(Math, soundLevels));
              //qui bisogna aggiungere la media
             // $("#minSoundLevelLabel").text(Math.min.apply(Math, soundLevels));
            }
            //console.log(soundLevels);
            //console.log(data);
            soundLevels = [];
            
            self.heatMapFactory.addData(data);
            


          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
        },
      });
    }
  
    getZoneInfo(zone, map) {
      return 1;
    }

    getMap() {
        return this.map;
    }

    getSensorAssociatedWithUser(username) {

        $.ajax({
            url: "./src/controller/php/getSensorAssociatedWithUser.php",
            cache: false,  
            type: "post",
            data: username,
            success: function (response) {
                alert(response)
                let result =  JSON.parse(response);
            }    
          });
    }


    applyHeatMapLayerForSensor(data, map) {


      $.ajax({
        url: "./src/controller/php/getDynamicSoundLevelChart.php",
        type: "POST",
        data:  data,
        cache: false,
        success: function (response) {

          

           if (self.flagHeatMap){
               map.removeLayer(self.heat);
           }

           let data= JSON.parse(response);


           console.log(data);
           let heatPoints = [];

           for(var key in data) {
               for (var key1 in data[key]) {
                   let heatPoint = [data[key][key1]["lati"]/100000, data[key][key1]["longi"]/100000, data[key][key1]["Noise_dBA"]/100];
                   heatPoints.push(heatPoint);
               }
           }

               self.heat = L.heatLayer(heatPoints, {
                   radius: 25,
                   blur: 1,
          
                   //da 0 a 60 verde, da 60 a 80 giallo, da 80 a 95 arancione, sopra i 95 rosso
                   gradient: {0: 'green', 0.6:'yellow', 0.80: 'orange', 0.95: 'red'}}).addTo(map);
          

           self.flagHeatMap=true;
           

       

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

    }

    showLoadingSpinner() {
      $('#loadingSpinner').show();

    }
  
    hideLoadingSpinner() {
      $('#loadingSpinner').hide();
    }


    createChart(data, type){

      alert("Okay ora devo fare il grafico di un " + type);
      console.log("dati\n\n\n\n", data);



      //isolo l'array che m'interessa per il grafico
      let yaxis=[];
      let xaxis = [];
      if (type == 'daily') {
          
          for (var key in data) {
            for (var key1 in data[key]) {

                yaxis.push(data[key][key1]["Noise_dBA"]);
                xaxis.push(data[key][key1]["Hour"]);
                
            }
          }
      }
      
      else if (type=="monthly") {
        for (var key in data) {
          for (var key1 in data[key]) {
              yaxis.push(data[key][key1]["DailyAverageNoise"]);
              xaxis.push(data[key][key1]["Day"]);
              
          }
        }
      }
      else if (type=="annual"){
        for (var key in data) {
          for (var key1 in data[key]) {
              yaxis.push(data[key][key1]["MonthlyAverageNoise"]);
              xaxis.push(data[key][key1]["Month"]);
              
          }

        }
      }

      console.log("Valori in ordinate: " + yaxis + "\n Valori in ascissa: " + xaxis);

   
      // Esepio di utilizzo
           

            const lineChartData = {
                labels: xaxis,
                values: yaxis
            };

            const barChartData = {
                labels: ['Label A', 'Label B', 'Label C'],
                values: [50, 40, 60]
            };

            const pieChartData = {
                labels: ['Slice 1', 'Slice 2', 'Slice 3'],
                values: [30, 25, 45]
            };

            this.chartFactory.createLineChart(lineChartData);
            //chartFactory.createBarChart(barChartData);
            //chartFactory.createPieChart(pieChartData);



    }

    buildCardLabelsForSensor(data) {

      /*QUI FACCIO UN CICLO SUI COMPONENTI E FACCIO UN CHECK PER OGNI COMPONENTE
       CHE SE IL VALORE DEL TESTO è TOP ALLORA LA CARD DIVENTA ROSSA, ARANCIONE, GIALLA, VERDE*/

      $("#sensor").text(data['result'][0]['ID_device']);
      $("#measurements").text(data['result'][0]['Total']);
      $("#lastMeasurement").text(data['result'][0]['LastDate']);
      $("#firstMeasurements").text(data['result'][0]['FirstDate']);
      //$("#averageMeasurement").text(data['result'][0]['ID_device']);
      $("#minSoundLevel").text(data['result'][0]['MinNoise']);
      $("#maxSoundLevel").text(data['result'][0]['MaxNoise']);
      $("#averageSoundLevel").text(data['result'][0]['AvgNoise']);

    }


   
  }





