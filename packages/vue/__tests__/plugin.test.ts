import { createLocalVue, mount } from '@vue/test-utils'
import Ichnos from '@ichnos/core'
import { plugin } from '../lib'

jest.mock('@ichnos/core')

const localVue = createLocalVue()

describe('@ichnos/vue', () => {
  test('init ichnos and add $ichnos instance', () => {
    localVue.use(plugin, {
      options: {
        id: 'GTM-XXX'
      }
    })

    const actual = (localVue as any).prototype.$ichnos

    expect(actual).toBeInstanceOf(Ichnos)
  })

  test('send events', () => {
    const sendMock = jest.fn()
    Ichnos.prototype.send = sendMock

    localVue.use(plugin, {
      options: {
        id: 'GTM-XXX'
      }
    })
    ;(localVue as any).prototype.$ichnos.send({ event: 'gtm' })

    const actual = sendMock
    const expected = [{ event: 'gtm' }]

    expect(actual).toBeCalledWith(...expected)
  })

  describe('directive', () => {
    test('call send when directive triggered', () => {
      const sendMock = jest.fn()
      Ichnos.prototype.send = sendMock

      localVue.use(plugin, {
        options: {
          id: 'GTM-XXX'
        }
      })

      const wrapper = mount(
        {
          template: `<input v-ichnos:focusin="{ category: 'x', label:'y'}"  />`
        },
        {
          localVue
        }
      )

      wrapper.find('input').trigger('focusin')

      const actual = sendMock
      const expected = [{ category: 'x', label: 'y' }]

      expect(actual).toBeCalledWith(...expected)
    })
  })
})
