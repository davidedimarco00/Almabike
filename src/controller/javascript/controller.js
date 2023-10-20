/*This class contains the basic class for controller*/

export class Controller {
    constructor(model, view) {
      this.model = model;
      this.view = view;
    }

    getModel() {
        return this.model;
    }

    getView() {
      return this.view;
    }

    toString() {
      return `Controller (Model: ${this.model}, View: ${this.view})`;
    }

  }

