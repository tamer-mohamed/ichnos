import { createLocalVue, mount } from '@vue/test-utils'
import Ichnos from '@ichnos/core'
import { plugin } from '../lib'

jest.mock('@ichnos/core')

describe('@ichnos/vue', () => {
  let localVue: any
  let ichnos: Ichnos

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(plugin, {
      events: [
        {
          type: 'inputFocusIn'
        }
      ],
      options: {
        id: 'GTM-XXX'
      }
    })

    ichnos = (localVue as any).ichnos
  })

  test('init ichnos and add $ichnos instance', () => {
    const actual = (localVue as any).prototype.$ichnos

    expect(actual).toBeInstanceOf(Ichnos)
  })

  test('send events', () => {
    const sendMock = jest.spyOn(ichnos, 'send')

    const event = { type: 'gtm', payload: { event: 'test' } }

    ichnos.send(event)

    const actual = sendMock
    const expected = [event]

    expect(actual).toBeCalledWith(...expected)
  })

  describe('directive', () => {
    test('call send when directive triggered', () => {
      const sendMock = jest.spyOn(ichnos, 'send')

      const wrapper = mount(
        {
          template: `<input v-ichnos:focusin.inputFocusIn="{ category: 'x', label:'y'}"  />`
        },
        {
          localVue
        }
      )

      wrapper.find('input').trigger('focusin')

      const actual = sendMock
      const expected = [
        {
          type: 'inputFocusIn',
          payload: { category: 'x', label: 'y' }
        }
      ]

      expect(actual).toBeCalledWith(...expected)
    })

    test('set the event type as the listner if event type is not provided', () => {
      localVue = createLocalVue()
      localVue.use(plugin, {
        events: [
          {
            type: 'focusin'
          }
        ],
        options: {
          id: 'GTM-XXX'
        }
      })

      ichnos = (localVue as any).ichnos

      const sendMock = jest.spyOn(ichnos, 'send')

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
      const expected = [
        {
          type: 'focusin',
          payload: { category: 'x', label: 'y' }
        }
      ]

      expect(actual).toBeCalledWith(...expected)
    })
  })
  describe('handeling errors', () => {
    test('should throw an error when there is no listener defined', () => {
      expect(() =>
        mount(
          {
            template: `<input v-ichnos />`
          },
          {
            localVue
          }
        )
      ).toThrowError()
    })

    test('should throw an error when event is not registered', () => {
      expect(() =>
        mount(
          {
            template: `<input v-ichnos:click.notRegistered />`
          },
          {
            localVue
          }
        )
      ).toThrowError()
    })

    test('should throw an error when there is more than one event type', () => {
      expect(() =>
        mount(
          {
            template: `<input v-ichnos:click.inputFocusIn.invalidEventType />`
          },
          {
            localVue
          }
        )
      ).toThrowError()
    })
  })
})
