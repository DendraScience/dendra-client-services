/**
 * Main tests
 */

describe('Test', function () {
  const config = {
    io: {
      options: {
        path: '/api/v1/socket.io'
      },
      uri: 'http://128.32.109.75' // Preview environment
    }
  }
  let services

  it('should import', function () {
    services = require('../../dist')

    expect(services).to.have.property('init')
  })

  it('should init', function () {
    services.init(config)

    expect(services).to.have.property('app')
    expect(services).to.have.property('socket')
    expect(services).to.have.property('systemTime')
  })

  it('should get system time', function () {
    return services.systemTime.get('utc').then(utc => {
      expect(utc).to.have.property('now')
    })
  })
})
