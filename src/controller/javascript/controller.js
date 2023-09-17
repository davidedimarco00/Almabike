/*This class contains the basic class for controller*/

export class Controller{
    //il riferimento alla view serve? secondo me no, ma è da ragionare
    constructor(model) {
      this.model = model;
    }

    getView() {
        return this.view;
    }

    getModel() {
        return this.model;
    }
  }

