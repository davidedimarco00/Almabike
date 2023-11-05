export class HeatMapFactory {
  constructor(map) {
    this.map = map;
    this.self = this;
    this.heatMapLayers = [];
    this.greenData = [];
    this.yellowData = [];
    this.orangeData = [];
    this.redData = [];
    this.isEmpty = true;
  }

  addData(data) {
    console.log(data);
    this.greenData = [];
    this.yellowData = [];
    this.orangeData = [];
    this.redData = [];
    for (var key of data) {
      let lat = key[0];
      let lng = key[1];
      let soundValue = key[2];
      if (soundValue >= 0 && soundValue < 60) {
        this.greenData.push([lat, lng, soundValue]);
      } else if (soundValue >= 60 && soundValue < 80) {
        this.yellowData.push([lat, lng, soundValue]);
      } else if (soundValue >= 80 && soundValue < 95) {
        this.orangeData.push([lat, lng, soundValue]);
      } else if (soundValue >= 95) {
        this.redData.push([lat, lng, soundValue]);
      }
    }
    this.updateHeatmaps();
  }

  updateHeatmaps(map) {
    if (this.isEmpty === false) {
      this.map.eachLayer(function (layer) {
        if (layer instanceof L.HeatLayer || layer instanceof L.marker) {
          layer.remove();
        }
      });
    }
    let greenheat = L.heatLayer(this.greenData, {
      blur: 1,
      radius: 25,
      opacity: 1,
      gradient: { 0.2: "green" },
    }).addTo(this.map);

    let yellowheat = L.heatLayer(this.yellowData, {
      blur: 1,
      radius: 25,
      gradient: { 0.5: "yellow" },
    }).addTo(this.map);

    let orangeheat = L.heatLayer(this.orangeData, {
      blur: 1,
      radius: 25,
      gradient: { 0.7: "orange" },
    }).addTo(this.map);

    let redheat = L.heatLayer(this.redData, {
      blur: 1,
      radius: 25,
      gradient: { 0.95: "red" },
    }).addTo(this.map);

    //this.heatMapLayers.push(greenheat, yellowheat, orangeheat, redheat);
    this.isEmpty = false;
  }
}
