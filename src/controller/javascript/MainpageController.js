/*This class contains the basic class for controller*/

import  {MainpageModel} from "../../model/javascript/MainpageModel.js";

import  {Controller} from "../../controller/javascript/controller.js";

export class MainPageController extends Controller {

  constructor() {
    super();
    this.model = new MainpageModel();
  }

  initializePage(){
    this.model.initpage(this.model.getMap());
  }

  
  showZones(){
    this.model.showZones(this.model.getMap());  
  }

  applyMapLayer(mapLayer) {
    this.model.applyMapLayer(mapLayer);
  }

  hideZones(){
    this.model.hideZones(this.model.getMap());
  }

  clearLayers(){
    this.model.clearMapLayers();
  }

  applyDarkMode(){
    this.model.darkMode(this.model.getMap());
  }

  applyLightMode(map){
    this.model.lightMode(this.model.getMap());
  }


  getBaseInfoFromSelectedSensor(selectedSensor){
    console.log("selected Sensor: " + selectedSensor);
    this.model.getBaseInfoFromSelectedSensor(this.model.getMap(), selectedSensor);
    this.model.getAllStatsFromSensor(selectedSensor);
    //this.model.createHeatMap();
  }



  searchButtonClick(){
    this.model.searchButtonClick();
  }

  showLoadingSpinner() {
    this.model.showLoadingSpinner();
  }

  hideLoadingSpinner() {
    this.model.hideLoadingSpinner();
  }

  colorZone(){
    this.model.verifyPointInsidePolygon();
  }

}

