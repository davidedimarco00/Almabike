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
        <div class="custom-tooltip form-check form-switch justify-content-center" title ="Visualizza le zone sulla mappa">
          <input class="form-check-input" type="checkbox" id="zonesToggle" checked>
          <label class="form-check-label" for="zonesToggle">Visualizzazione a zone</label>
        </div>

        <div class="custom-tooltip form-check form-switch justify-content-center" title="Visualizza le statistiche dell'orario notturno dalle 18 alle 06 del giorno successivo">
          <input class="form-check-input" type="checkbox" id="nightToggle">
          <label class="form-check-label" for="nightToggle">Statistiche notturne</label>
        </div>
        
        
        
        `;
    };
    zonesCard.addTo(this.map);


    const infoCard = L.control({ position: 'bottomleft' });
    infoCard.onAdd = function () {
      const div = L.DomUtil.create('div', 'infoCard');
      this.update(div);
      return div;
    };

    infoCard.update = function (div) {
      div.innerHTML = `

      <button type="button" class="btn btn-default custom-tooltip" data-toggle="tooltip"
       data-placement="top" title="La mappa visualizza i dati globali del sensore selezionato.
                                    In assenza di filtri e sensori selezionati la visualizzazione si basa sul livello medio di rumore nelle varie zona della città di Bologna.">
        <i class="fas fa-info-circle"></i>
      </button>

      `
 
    };
    infoCard.addTo(this.map);

    const loginCard = L.control({ position: 'topright' });
    loginCard.onAdd = function () {
      const div = L.DomUtil.create('div', 'loginCard');
      this.update(div);
      return div;
    };


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
   
    if (this.zonesAreVisible ) {
      this.addZones();
    }
  }

  addZones(type="all") { //da ragionare per il popup sulla zona

    let allPointsOnMap = [];
    let self = this;

    let url = ""; //si basa su quale php chiamare in base al tipo di chiamata

    switch (type) { //di default chiama all
      case "all":
        url = "./src/controller/php/getAllPointsForPolygons.php"
        break;
      case "night":
        url = "./src/controller/php/getAllPointsForNightPolygons.php"
        break;
      case "day":
        url = "./src/controller/php/getAllPointsForDayPolygons.php"
        break;

    }

    $.ajax({
      url: url,
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


              allPointsOnMap.push(point);
     
          
            }
          }
          self.allPointsOnMap = allPointsOnMap;
 
        }

            let zones = fetch("./resources/json/bologna.geojson");

        
              zones
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  const polygons = L.geoJSON(data, {
                    style: {
                      color: "white", // colore del bordo del poligono
                      weight: 1,
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
                  //console.log(allPointsOnMap2);

                  // Crea un oggetto per memorizzare l'associazione tra punti e zone
                  const pointsToZones = {};

                  // Itera su ogni poligono
                  polygons.eachLayer(function (zone) {
                    const zoneName = zone.feature.properties.name;
                    //console.log("itero su " + zoneName );
                    let vertices_x = zone.feature.geometry.coordinates[0].map(coord => coord[1]);
                    let vertices_y = zone.feature.geometry.coordinates[0].map(coord => coord[0]);
                    let points_polygon = vertices_x.length;

                    // Itera su ciascun punto
                    allPointsOnMap.forEach((point) => {
                      const longitude = point.lat;
                      const latitude = point.lng;
                      let noise = point.noise;

                   

                      // Verifica se il punto è all'interno del poligono
                      if (is_in_polygon(points_polygon, vertices_x, vertices_y, longitude, latitude)) {
                      
                        // Mappa il punto alla zona
                        if (!pointsToZones[zoneName]) {
                          pointsToZones[zoneName] = [];
                        }
                        pointsToZones[zoneName].push(point);
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

                       //COLORO LA ZONA

                    });

                    //console.log(pointsToZones);

                    // Verifica se c'è un array di punti associati alla zona
                    if (pointsToZones[zoneName]) {
                      // Calcola un valore medio o qualsiasi logica per determinare il colore
                      let averageValue = averageValueInZone(pointsToZones[zoneName]);
                      
                      // Modifica lo stile del poligono in base al valore
                      zone.setStyle({
                        fillColor: getColorValue(averageValue),
                        color: getColorValue(averageValue),
                        fillOpacity: 0.3,
                        
                      });
                    }
       
                  
                  function averageValueInZone(points) {

                    if (points.length === 0) {
                      return 0; // Restituisci 0 se l'array è vuoto
                    }
                  
                    let sum = 0;
                    for (let i = 0; i < points.length; i++) {
                      sum += points[i].noise; // Supponendo che il valore "noise" sia nella terza posizione di ciascun elemento dell'array
                    }

                    //console.log(sum);

                    let average = sum / points.length;
          
                    return average;
                  }
                  
                  function getColorValue(value) {
                    
                    if (value < 60) {
                      return "green";
                    } else if (value >= 60 && value <=80 ){
                      return "yellow";
                    } else if (value > 80 && value <=95 ){
                      return "orange";
                    } else if (value > 95 ){
                      return "red";
                    }
                  }



                  });

                  // Ora pointsToZones contiene l'associazione tra zone e punti
                  


                 




                  


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


  showColoredNightZone() {
    this.addZones("night");
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
