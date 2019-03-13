import Ichnos, { Config } from '@ichnos/core'
import { DirectiveOptions } from 'vue'

const install = function(Vue: any, config: Config) {
  Vue.prototype.$ichnos = Vue.ichnos = new Ichnos(config)

  const directive: DirectiveOptions = {
    bind(el, binding) {
      const { value: event, /* istanbul ignore next */ modifiers = {}, arg: listener } = binding
      const modifiersNames = Object.keys(modifiers)

      if (!listener) {
        throw new Error('Ichnos: event listener is not provided')
      }

      if (modifiersNames.length > 1) {
        throw new Error('Ichnos: only one event type should be passed')
      }

      const ichnosEventType = modifiersNames[0] || listener

      if (!Vue.ichnos.events[ichnosEventType]) {
        throw new Error(`Ichnos: event ${ichnosEventType} is not registered`)
      }

      el.addEventListener(
        listener,
        () => {
          Vue.ichnos.send(Vue.ichnos.events[ichnosEventType](event))
        },
        {
          passive: true
        }
      )
    }
  }

  Vue.directive('ichnos', directive)
}

export const plugin = { install }
