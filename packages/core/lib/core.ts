export interface Options {
  id: string
  active?: boolean
  layer?: string
  pageTracking?: boolean
  query?: any
  debug?: boolean
  scriptURL?: string
}

export interface IchnosEvent {
  type: string
  payload: any
}

interface EventCreator {
  (payload: any): IchnosEvent
}
export interface EventsCreator {
  [key: string]: EventCreator
}

export interface Hook {
  beforeSend?<Payload>(type: string, payload: Payload, history: any[]): Payload | false
}

export interface RegisteredEvent {
  type: string
}
interface IWindow {
  [key: string]: any
}

export interface Config {
  options: Options
  events: RegisteredEvent[]
  hook?: Hook
  params?: any
}

const inBrowser: boolean = typeof window !== 'undefined'

export default class Tracking {
  options: Options
  isInitialized: Boolean
  hook: Hook
  events: EventsCreator = {
    gtmInit: this.createEvent('gtmInit'),
    pageView: this.createEvent('pageView')
  }

  constructor({ options, events, hook }: Config) {
    this.isInitialized = false
    this.hook = hook || {}
    this.options = options

    events.forEach(e => {
      this.events[e.type] = this.createEvent(e.type)
    })

    if (!inBrowser) {
      return
    }

    const queryParams = {
      ...(options.query || {}),
      id: options.id,
      l: this.layer
    }

    const scriptSrc =
      (options.scriptURL || '//www.googletagmanager.com/gtm.js') +
      '?' +
      this._getQueryString(queryParams)

    this._addScript(scriptSrc)
    ;(window as IWindow)[this.layer] = (window as IWindow)[this.layer] || []

    this.send(
      this.events.gtmInit({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      })
    )

    this.isInitialized = true
  }

  private _addScript(scriptSrc: string) {
    const head = document.getElementsByTagName('head')[0]

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = scriptSrc
    head.appendChild(script)
  }

  private _getQueryString(params: any) {
    return Object.keys(params)
      .filter(key => params[key] !== null && params[key] !== undefined)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&')
  }

  get layer() {
    return this.options.layer || 'dataLayer'
  }

  private _pushToGTM(event: any) {
    ;(window as IWindow)[this.layer].push(event)
  }

  getHistory() {
    return (window as IWindow)[this.layer]
  }

  send = ({ type, payload }: IchnosEvent) => {
    if (!type || !payload) {
      throw new Error('type and payload are required')
    }
    if (this.options.active) {
      const history = this.getHistory()

      if (typeof this.hook.beforeSend === 'function' && type !== 'gtmInit') {
        const ret = this.hook.beforeSend(type, payload, history)

        if (ret === false) {
          this.debug("event: not sent because beforeSend hook didn't return the event", payload)
          return
        } else {
          this.debug('event:sent', ret)
          this._pushToGTM(ret)
        }
      } else {
        this._pushToGTM(payload)
      }
    }
  }

  debug /* istanbul ignore next */(
    message: string,
    payload: any,
    type: 'warn' | 'error' | 'log' = 'log'
  ) {
    if (this.options.debug === true) {
      console[type](`Ichnos:${message}`, payload)
    }
  }

  createEvent(type: string): EventCreator {
    return (payload: any) => ({
      type,
      payload
    })
  }
}
