import Ichnos from '@ichnos/core'
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $ichnos: any
  }

  interface VueConstructor {
    $ichnos: Ichnos
  }
}
