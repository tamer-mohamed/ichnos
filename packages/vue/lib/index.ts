import Ichnos, { IOptions } from '@ichnos/core'

const install = function(Vue: any, initConf: IOptions, params?: any) {
  Vue.prototype.$ichnos = Vue.ichnos = new Ichnos({ options: initConf })
  // TOOD: Handle vue-router page views
}

export default { install }
