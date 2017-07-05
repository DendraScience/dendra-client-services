/**
 * Dendra/Feathers services provider for client-side use.
 *
 * @author J. Scott Smith
 * @license BSD-2-Clause-FreeBSD
 * @module dendra-client-services
 */

import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import hooks from 'feathers-hooks'
import io from 'socket.io-client'

const SERVICES = {
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
}

class ServicesProvider {
  init (config) {
    const socket = this.socket = io(config.io.uri, config.io.options)
    const app = this.app = feathers()
      .configure(hooks())
      .configure(socketio(socket, config.socketio && config.socketio.options))

    Object.keys(SERVICES).forEach(key => {
      this[key] = app.service(SERVICES[key])
    })
  }
}

export default new ServicesProvider()
