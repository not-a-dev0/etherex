var constants = require('../js/constants');
var EthereumClient = require('../clients/EthereumClient');

var ConfigActions = function() {

  this.updateEthereumClient = function () {
    var configState = this.flux.store('config').getState();

    var clientParams = {
      address: configState.address,
      host: configState.host
    };
    var ethereumClient = new EthereumClient(clientParams);

    this.dispatch(constants.config.UPDATE_ETHEREUM_CLIENT_SUCCESS, {
      ethereumClient: ethereumClient
    });
  };

  this.updatePercentLoaded = function(percent) {
    this.dispatch(constants.config.UPDATE_PERCENT_LOADED_SUCCESS, {
      percentLoaded: percent
    });
  };

  this.updateAddress = function(payload) {
    this.dispatch(constants.config.UPDATE_ADDRESS, {
      address: payload.address
    });
    this.flux.actions.config.updateEthereumClient();
    this.flux.actions.market.updateMarkets();
  };

  this.updateDemoMode = function(value) {
    this.dispatch(constants.config.UPDATE_DEMO_MODE, {
      enable: value
    });
  };

  this.initializeState = function() {
    this.flux.actions.config.updateEthereumClient();
    this.flux.actions.network.checkNetwork();
  };
};

module.exports = ConfigActions;
