import Ichnos, { Config } from '@ichnos/core'
import { DirectiveOptions } from 'vue'

const install = function(Vue: any, config: Config) {
  Vue.prototype.$ichnos = Vue.ichnos = new Ichnos(config)

  const directive: DirectiveOptions = {
    bind(el, binding) {
      const event = binding.value
      const trigger = binding.arg

      /* istanbul ignore else */
      if (trigger) {
        el.addEventListener(trigger, () => {
          Vue.ichnos.send(event)
        })
      } else {
        //TODO: discuss:handle with no args provided ?
      }
    }
  }

  Vue.directive('ichnos', directive)
}

export const plugin = { install }
