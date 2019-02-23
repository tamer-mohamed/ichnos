import Ichnos, { IOptions } from '@ichnos/core'
import Vue, { FunctionalComponentOptions } from 'vue'

export interface IchnosComponentOptions {
  send?: (event: any) => string
}

declare module 'vue/types/vue' {
  interface Vue {
    $ichnos: any
  }

  interface VueConstructor {
    $ichnos: Ichnos
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    $ichnos: Ichnos
  }

  interface FunctionalComponentOptions<Props = DefaultProps, PropDefs = PropsDefinition<Props>> {
      $ichnos: Ichnos
  }
}
