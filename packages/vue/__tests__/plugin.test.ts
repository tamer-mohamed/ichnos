import { createLocalVue } from '@vue/test-utils'
import Ichnos from '@ichnos/core'
import { plugin } from '../lib'

jest.mock('@ichnos/core')

describe('@ichnos/vue', () => {
  test('init ichnos and add $ichnos instance', () => {
    const localVue = createLocalVue()

    localVue.use(plugin, {
      options: {
        id: 'GTM-XXX'
      }
    })

    const actual = (localVue as any).prototype.$ichnos

    expect(actual).toBeInstanceOf(Ichnos)
  })

  test('send events', () => {
    Ichnos.prototype.send = jest.fn()

    const actual = Ichnos.prototype.send
    const localVue = createLocalVue()

    localVue.use(plugin, {
      options: {
        id: 'GTM-XXX'
      }
    })
    ;(localVue as any).prototype.$ichnos.send({ event: 'gtm' })

    const expected = [{ event: 'gtm' }]

    expect(actual).toBeCalledWith(...expected)
  })
})
