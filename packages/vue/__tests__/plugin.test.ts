import { createLocalVue, mount } from '@vue/test-utils'
import { plugin } from '../lib'

describe('@ichnos/vue', () => {
  test('init ichnos and add $ichnos instance', () => {
    const localVue = createLocalVue()

    localVue.use(plugin, {
      options: {
        id: 'GTM-XXX'
      }
    })

    const actual = (localVue as any).prototype.$ichnos

    expect(actual).toBeTruthy()
  })
})
