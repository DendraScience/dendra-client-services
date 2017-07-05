'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Dendra/Feathers services provider for client-side use.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author J. Scott Smith
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license BSD-2-Clause-FreeBSD
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module dendra-client-services
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _client = require('feathers/client');

var _client2 = _interopRequireDefault(_client);

var _client3 = require('feathers-socketio/client');

var _client4 = _interopRequireDefault(_client3);

var _feathersHooks = require('feathers-hooks');

var _feathersHooks2 = _interopRequireDefault(_feathersHooks);

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SERVICES = {
  datapoint: '/datapoints',
  datapointLookup: '/datapoints/lookup',
  datastream: '/datastreams',
  datastreamLookup: '/datastreams/lookup',
  membership: '/memberships',
  organization: '/organizations',
  person: '/persons',
  place: '/places',
  scheme: '/schemes',
  som: '/soms',
  station: '/stations',
  systemSchema: '/system/schemas',
  systemTime: '/system/time',
  thing: '/things',
  uom: '/uoms',
  vocabulary: '/vocabularies'
};

var ServicesProvider = function () {
  function ServicesProvider() {
    _classCallCheck(this, ServicesProvider);
  }

  _createClass(ServicesProvider, [{
    key: 'init',
    value: function init(config) {
      var _this = this;

      var socket = this.socket = (0, _socket2.default)(config.io.uri, config.io.options);
      var app = this.app = (0, _client2.default)().configure((0, _feathersHooks2.default)()).configure((0, _client4.default)(socket, config.socketio && config.socketio.options));

      Object.keys(SERVICES).forEach(function (key) {
        _this[key] = app.service(SERVICES[key]);
      });
    }
  }]);

  return ServicesProvider;
}();

exports.default = new ServicesProvider();
module.exports = exports['default'];