import Ichnos, { Config } from '@ichnos/core'
import { all, flip, has, replace } from 'ramda'
import startsWith from 'ramda/es/startsWith'
import isEmpty from 'ramda/es/isEmpty'
import contains from 'ramda/es/contains'
import { DirectiveOptions } from 'vue'
const install = function(Vue: any, config: Config) {
  Vue.prototype.$ichnos = Vue.ichnos = new Ichnos(config)

  // <input v-ichnos:focusin="$ichnos.events['button.click']({category: 'XXX', label: 'XXX'})" />
  // TOOD: Handle vue-router page views
  const directive: DirectiveOptions = {
    bind(el, binding) {
      const event = binding.value
      const trigger = binding.arg

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
