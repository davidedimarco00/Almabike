/*Questa classe è il maanger della mappa stessa*/ 

export class MapManager {
  constructor(map) {
    this.map = map;
    this.zonesAreVisible = false;
    this.allPointsOnMap = [];
    this.allPointsOnMap2 = [];
  }

  addMapControls() {
    
    const levelsCard = L.control({ position: 'bottomleft' });
    levelsCard.onAdd = function () {
      const div = L.DomUtil.create('div', 'levelsCard');
      this.update(div);
      return div;
    };
    levelsCard.update = function (div) {
      div.innerHTML = `
        <div class="btn-group-horizontal layerGroup">
          <button type="button" class="btn btn-default layers" id="satLayer">
            <img class="layerImages layerSelected" src="resources/images/layers/sat.png" style="width: 52px;height:52px;border-radius:8px;" data-toggle="tooltip" data-placement="top" title="Satellite"></img>
          </button>
          <button type="button" class="btn btn-default layers" id="streetMapLayer">
            <img class="layerImages" src="resources/images/layers/streetMap.png" style="width: 52px;height:52px;border-radius:8px;" data-toggle="tooltip" data-placement="top" title="Mista"></img>
          </button>
          <button type="button" class="btn btn-default layers" id="lightMapLayer">
            <img class="layerImages" src="resources/images/layers/lightMap.png" style="width: 52px;height:52px;border-radius:8px;" data-toggle="tooltip" data-placement="top" title="Stradale">
          </button>
          <button type="button" class="btn btn-default layers" id="clearLayer">
            <img class="layerImages" src="resources/images/layers/broom-solid.svg" style="width: 52px;height:52px;border-radius:8px;" data-toggle="tooltip" data-placement="top" title="Pulisci mappa">
          </button>
        </div>`;
    };
    levelsCard.addTo(this.map);

    
    
    const zonesCard = L.control({ position: 'bottomleft' });
    zonesCard.onAdd = function () {
      const div = L.DomUtil.create('div', 'zonesCard');
      this.update(div);
      return div;
    };
    zonesCard.update = function (div) {
      div.innerHTML = `
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="zonesToggle" checked>
          <label class="form-check-label" for="zonesToggle">Visualizzazione a zone</label>
        </div>`;
    };
    zonesCard.addTo(this.map);




    const legendCard = L.control({ position: 'bottomright' });
    legendCard.onAdd = function () {
      const div = L.DomUtil.create('div', 'legendCard');
      this.update(div);
      return div;
    };
    legendCard.update = function (div) {
      div.innerHTML = '';

      const labels = ['<strong>Livello del suono</strong>'];
      const categories = [' > 95 dB', 'tra 80 dB e 95 dB', 'tra 60 dB e 80dB', ' < 60 dB '];
      const colors = ["red", "orange", "yellow", "green"];

      categories.forEach((category, index) => {
        labels.push(`
          <i class="fas fa-circle" style="color:${colors[index]};"></i> ${category}<br>
        `);
      });

      div.innerHTML = labels.join('<br>');
    };
    legendCard.addTo(this.map);


    const infoCard = L.control({ position: 'bottomleft' });
    infoCard.onAdd = function () {
      const div = L.DomUtil.create('div', 'infoCard');
      this.update(div);
      return div;
    };

    infoCard.update = function (div) {
      div.innerHTML = `

      <button type="button" class="btn btn-default custom-tooltip" data-toggle="tooltip"
       data-placement="top" title="Nell'interfaccia di Almabike, troverai una mappa interattiva che ti offre una visualizzazione chiara delle informazioni rilevanti. La mappa di Almabike è progettata per fornire una panoramica completa dei dati dei sensori e delle zone di interesse. Ecco alcune delle sue caratteristiche principali:

       Visualizzazione Predefinita dei Valori Globali: Quando apri la mappa, vedrai di default i valori globali dei sensori. Questi valori rappresentano una panoramica generale delle condizioni monitorate in tutto il sistema Almabike, consentendoti di avere una visione d'insieme.
       
       Filtraggio dei Valori Specifici: Tuttavia, hai anche la flessibilità di personalizzare la visualizzazione secondo le tue esigenze. Puoi utilizzare filtri per visualizzare specifici dati dei sensori o categorie, mettendo in risalto le informazioni che ti interessano di più.
       
       Zone Rappresentate in Rosso: Sulla mappa, le zone di particolare interesse sono rappresentate in rosso mediante l'uso di poligoni. Queste zone possono indicare aree con condizioni speciali o soggette a monitoraggio intensivo. Facendo clic su queste zone, è possibile ottenere ulteriori dettagli e informazioni specifiche.">
        <i class="fas fa-info-circle" data-toggle="modal" data-target="#myModal1"></i>
      </button>

     
      
      `
 
    };
    infoCard.addTo(this.map);





















  }

  applyMapLayer(mapLayer) {
    let self = this;
    const excludedLayerId = 72;

    this.map.eachLayer(function (layer) {
      if (layer._leaflet_id !== excludedLayerId) {
        self.map.removeLayer(layer);
      }
    });

    switch (mapLayer) {
      case "satLayer":
        L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
          },
        ).addTo(this.map);
        break;

      case "lightMapLayer":
        L.tileLayer(
          "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
          {
            maxZoom: 20,
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
          },
        ).addTo(this.map);
        break;

      case "streetMapLayer":
        L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxNativeZoom: 18,
          maxZoom: 50,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);
        break;

      case "darkMode":
        L.tileLayer(
          "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
          {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          },
        ).addTo(this.map);
        break;
    }

    if (this.zonesAreVisible) {
      this.addZones(this.map);
    }
  }

  addZones() { //da ragionare per il popup sulla zona
    let allPointsOnMap = [];
    let allPointsOnMap2 = [];
    let self = this;

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

                                       let popupHTML =
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

                                layer.bindPopup(popupHTML);

                    }

                  });

                  polygons.addTo(self.map);


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

  showZones() {
    // Implementazione del metodo showZones
    this.addZones();
    this.zonesAreVisible = true;
  }

  hideZones() {
    let self = this;
    this.zonesAreVisible = false;
    self.map.eachLayer(function (layer) {
      if (layer instanceof L.Polygon) {
        layer.remove();
      }
    });
  }

  clearMapLayers() {
    // Implementazione del metodo clearMapLayers
    let self = this;
    this.map.eachLayer(function (layer) {
      self.map.removeLayer(layer);
    });
    this.applyMapLayer("streetMapLayer");
  }

  getMap() {
    return this.map;
  }

  getZoneInfo(zone, map) {
    // Implementazione del metodo getZoneInfo
    // ...
  }

}
