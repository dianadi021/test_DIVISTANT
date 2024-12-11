class Control {
  constructor(modelService) {
    this._Service = modelService;
  }


  EndpointControl(req, res, next) {
    const pattern = /control/i;
    if (pattern.test(req.originalUrl)) {
      setTimeout(async () => {
        await this._Service.SetTempSavesDatas();
      }, 1000)
      console.log(`Save to temporary ${this.name}`);
    }
    next();
  };
}

module.exports = Control;