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
  public _isInitialized: boolean
  public options: IOptions
  private _hooks: IHooks

  constructor({ options, hooks = {} }: { options: IOptions; params?: any; hooks?: IHooks }) {
    this._isInitialized = false
    this.options = options
    this._hooks = hooks

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
      this.getQueryString(queryParams)

    this.addScript(scriptSrc)
    ;(window as IWindow)[this.layer] = (window as IWindow)[this.layer] || []

    this.send({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
    this.isInitialized = true
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

  get isInitialized() {
    return this._isInitialized
  }

  set isInitialized(init: boolean) {
    this._isInitialized = init
  }

  send(event: any) {
    if (this.options.active) {
      let ichnosEvent = event

      /* istanbul ignore next */
      if (this.options.debug) {
        console.log('Ichnos:Event', ichnosEvent)
      }

      if (this.hooks.beforeSend && event.event !== 'gtm.js') {
        ichnosEvent = this.hooks.beforeSend(ichnosEvent)
      }

      ;(window as IWindow)[this.layer].push(ichnosEvent)
    }
  }
}
