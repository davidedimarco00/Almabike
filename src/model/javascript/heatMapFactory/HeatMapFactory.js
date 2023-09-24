/*QUSTA CLASSE CONSENTE DI CREARE DELLE HEATMAP IN BASE AL VALORE DEI DATI*/
export class HeatMapFactory {
    constructor(map) {
      this.map = map;
      this.greenLayer = L.heatLayer([], { gradient: { 0.2: 'green' } });
      this.yellowLayer = L.heatLayer([], { gradient: { 0.5: 'yellow' } });
      this.orangeLayer = L.heatLayer([], { gradient: { 0.7: 'orange' } });
      this.redLayer = L.heatLayer([], { gradient: { 1.0: 'red' } });
  
      this.greenData = [];
      this.yellowData = [];
      this.orangeData = [];
      this.redData = [];
  
      this.greenLayer.addTo(this.map);
      this.yellowLayer.addTo(this.map);
      this.orangeLayer.addTo(this.map);
      this.redLayer.addTo(this.map);
    }
  
    addData(lat, lng, soundValue) {
      if (soundValue >= 0 && soundValue < 60) {
        this.greenData.push([lat, lng]);
      } else if (soundValue >= 60 && soundValue < 80) {
        this.yellowData.push([lat, lng]);
      } else if (soundValue >= 80 && soundValue < 95) {
        this.orangeData.push([lat, lng]);
      } else if (soundValue >= 95) {
        this.redData.push([lat, lng]);
      }
  
      this.updateHeatmaps();
    }
  
    updateHeatmaps() {
      this.greenLayer.setLatLngs(this.greenData);
      this.yellowLayer.setLatLngs(this.yellowData);
      this.orangeLayer.setLatLngs(this.orangeData);
      this.redLayer.setLatLngs(this.redData);
    }
  }