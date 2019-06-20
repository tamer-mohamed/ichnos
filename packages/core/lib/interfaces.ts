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

export interface EventCreator {
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

export interface IWindow {
  [key: string]: any
}

export interface Config {
  options: Options
  events: RegisteredEvent[]
  hook?: Hook
  params?: any
}
