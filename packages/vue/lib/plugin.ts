import Ichnos, { IOptions } from '@ichnos/core'

const install = function(
  Vue: any,
  initConf: {
    options: IOptions
    params?: any
    schemas?: any
  }
) {
  Vue.prototype.$ichnos = Vue.ichnos = new Ichnos({ options: initConf.options })
  // TOOD: Handle vue-router page views
}

export const plugin = { install }
