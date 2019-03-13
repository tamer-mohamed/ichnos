import { Config, RegisteredEvent } from '@ichnos/core'

export default class Ichnos {
  events: any

  constructor({ options, events }: Config) {
    this.events = {}

    events.forEach(e => {
      this.events[e.type] = jest.fn(payload => ({
        type: e.type,
        payload
      }))
    })
  }
  send() {}
}
