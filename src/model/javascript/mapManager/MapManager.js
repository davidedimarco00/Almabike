/*Questa classe è il maanger della mappa stessa*/

export class MapManager {
  constructor(map) {
    this.map = map;
    this.zonesAreVisible = false;
    this.allPointsOnMap = [];
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
                                    In assenza di filtri e sensori selezionati la visualizzazione si basa sul livello medio di rumore nelle letie zona della città di Bologna.">
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

    if (this.zonesAreVisible) {
      this.addZones();
    }
  }

  addZones(type="all") { 

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
        let vertex = JSON.parse(response);
        if (vertex) {
          for (let key in vertex) {
            for (let key1 in vertex[key]) {
              let lat = vertex[key][key1]["lati"] / 100000;
              let lng = vertex[key][key1]["longi"] / 100000;
              let noise = vertex[key][key1]["Noise_dBA"];

              let point = {
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
                color: "black", // colore del bordo del poligono
                weight: 0.5,
                fillColor: "black", // colore del riempimento del poligono
                fillOpacity: 0.05, // opacità del riempimento del poligono
              },
              onEachFeature: function (feature, layer) { //per ogni poligono
                layer.bindPopup("<h6>Nessuna info sulla zona</h6>");

              }
            });
            polygons.addTo(self.map);




            

            // Crea un oggetto per memorizzare l'associazione tra punti e zone
            const pointsToZones = {};
            // Itera su ogni poligono
            polygons.eachLayer(function (zone) {
              const zoneName = zone.feature.properties.name;
              let vertices_x = zone.feature.geometry.coordinates[0].map(coord => coord[1]);
              let vertices_y = zone.feature.geometry.coordinates[0].map(coord => coord[0]);
              let points_polygon = vertices_x.length;

              // Itera su ciascun punto
              allPointsOnMap.forEach((point) => { //cicla su tutti i punti
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
                    if ((vertices_y[i] > latitude_y !== (vertices_y[j] > latitude_y)) &&
                      (longitude_x < (vertices_x[j] - vertices_x[i]) * (latitude_y - vertices_y[i]) / (vertices_y[j] - vertices_y[i]) + vertices_x[i])) {
                      c = !c;
                    }
                  }
                  return c;
                }
              });

              //console.log(pointsToZones);

              

              // Verifica se c'è un array di punti associati alla zona
              if (pointsToZones[zoneName]) {
                // Calcola un valore medio o qualsiasi logica per determinare il colore
                let averageValue = averageValueInZone(pointsToZones[zoneName]);
                let numberOfMeasure = numberOfMeasureInZone(pointsToZones[zoneName]);
                let maxNoise = getMaxNoise(pointsToZones[zoneName]);
                let minNoise = getMinNoise(pointsToZones[zoneName]);

                // Modifica lo stile del poligono in base al valore
                zone.setStyle({
                  fillColor: getColorValue(averageValue),
                  color: getColorValue(averageValue),
                  fillOpacity: 0.3,

                });

                //riempio il popup che referenzia la zona
                let statusIcon ="";
                if (averageValue < 60) {
                  statusIcon = "resources/images/svg/checkFill.svg";
                } else if (averageValue > 60 && averageValue < 95) {
                  statusIcon ="resources/images/svg/mediumStatus.svg";
                }
                else {
                  statusIcon ="resources/images/svg/exclamationcircle.svg";
                }

                let popupHTML =
                  ` <table>
                                                          <thead>
                                                              <tr>
                                                                  <th colspan="2">` +
                  zone.feature.properties.name +
                  `</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><small class="text-muted">Rumore medio:</small></td>
                                                <td id="zonePopupAverage">`+ averageValue + ` dB</td>
                                            </tr>
                                            <tr>
                                                <td><small class="text-muted">Numero di rilevazioni:</small></td>
                                                <td id="zonePopupMeasure">`+numberOfMeasure+`</td>
                                            </tr>
                                            <tr>
                                                <td id="zonePopupMaxSound"><small class="text-muted">Soglia massima registrata:</small></td>
                                                <td>`+maxNoise+` dB</td>
                                            </tr>
                                            <tr>
                                                <td id="zonePopupMinSound"><small class="text-muted">Soglia minima registrata:</small></td>
                                                <td>`+minNoise+` dB</td>
                                            </tr>
                                            <tr>
                                                <td><small class="text-muted">Stato zona:</small></td>
                                                <td>
                                                    <img src="`+statusIcon+`"></img>
                                                </td>
                                            </tr>
                                        </tbody>
                                 </table>`;


                //SPARO IL POPUP SULLA ZONA
                zone.setPopupContent(popupHTML);

              }



              function numberOfMeasureInZone(points) { 
                return points.length;
              }

              function getMaxNoise(points) { 
                return Math.max(...points.map(point => point.noise));
              }

              function getMinNoise(points) { 
                return Math.min(...points.map(point => point.noise));
              }


              function averageValueInZone(points) {
                if (points.length === 0) {
                  return 0; // Restituisci 0 se l'array è vuoto
                }

                let sum = 0;
                for (const element of points) {
                  sum += element.noise; // Supponendo che il valore "noise" sia nella terza posizione di ciascun elemento dell'array
                }

                let average = sum / points.length;
                return parseFloat(average.toFixed(2)); //approssimo a due cifre decimali
              }



              function getColorValue(value) {

                if (value < 60) {
                  return "green";
                } else if (value >= 60 && value <= 80) {
                  return "yellow";
                } else if (value > 80 && value <= 95) {
                  return "orange";
                } else if (value > 95) {
                  return "red";
                }
              }

            });
          });
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
    $("#zonesToggle").prop("checked", false);
  }


  clearClusterGroup() {
    let self = this;
    self.map.eachLayer(function (layer) {
      if (layer instanceof L.MarkerClusterGroup) {
        self.map.removeLayer(layer); // Rimuovi il markerClusterGroup dalla mappa
        layer.clearLayers(); // Rimuovi tutti i marker dal markerClusterGroup
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
