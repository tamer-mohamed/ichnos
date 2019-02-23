import debug from 'debug'
export interface IOptions {
  id: string
  active?: boolean
  layer?: string
  pageTracking?: boolean
  query?: any
  debug?: boolean
  scriptURL?: string
}

export interface IHooks {
  beforeSend?: (event: any) => any
}

interface IWindow {
  [key: string]: any
}

const inBrowser: boolean = typeof window !== 'undefined'

export default class Tracking {
  public options: IOptions
  private _hooks: IHooks

  constructor({
    options,
    params = {},
    hooks = {}
  }: {
    options: IOptions
    params?: any
    hooks?: IHooks
  }) {
    this.options = options
    this._hooks = hooks

    if (!inBrowser) {
      return
    }

    if (!options.id) {
      throw new Error('GTM ID is not provided')
    }

    const queryParams = {
      ...(options.query || {}),
      id: options.id,
      l: this.layer
    }

    const scriptSrc =
      (options.scriptURL || '//www.googletagmanager.com/gtm.js') +
      '?' +
      this.getQueryString(queryParams)

    this.addScript(scriptSrc)
    ;(window as IWindow)[this.layer] = (window as IWindow)[this.layer] || []

    if (this.options.active) {
      ;(window as IWindow)[this.layer].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
    }
  }

  private addScript(scriptSrc: string) {
    const head = document.getElementsByTagName('head')[0]

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = scriptSrc
    head.appendChild(script)
  }

  private getQueryString(params: any) {
    return Object.keys(params)
      .filter(key => params[key] !== null && params[key] !== undefined)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&')
  }

  get layer() {
    return this.options.layer || 'dataLayer'
  }

  get hooks() {
    return this._hooks
  }

  set hooks(value) {
    this.hooks = value
  }

  send<Event>(event: Event) {
    if (inBrowser && this.options.active) {
      let ichnosEvent = event

      if (this.options.debug) {
        console.log('Ichnos:Event', ichnosEvent)
      }

      if (this.hooks.beforeSend) {
        ichnosEvent = this.hooks.beforeSend(ichnosEvent)
      }

      ;(window as IWindow)[this.layer].push(ichnosEvent)
    }
  }
}
