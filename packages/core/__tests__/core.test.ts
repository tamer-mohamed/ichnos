/* tslint:disable no-unused-expression */

import Ichnos from '../lib/core'

describe('@ichnos/core', () => {
  afterEach(() => {
    ;(window as any).dataLayer = undefined
  })

  describe('on initialize', () => {
    test('inject script tag with the provided GTM id', () => {
      const ichnos = new Ichnos({
        options: {
          id: 'GTM-XXX'
        },
        events: [{ type: 'buttonClick' }]
      })

      const actual = getScriptSrc()
      const expected = '//www.googletagmanager.com/gtm.js?id=GTM-XXX&l=dataLayer'

      expect(actual).toBe(expected)
    })

    test('pass options query to the query string', () => {
      const ichnos = new Ichnos({
        options: {
          id: 'GTM-XXX',
          query: {
            env: 'staging'
          }
        },
        events: [{ type: 'buttonClick' }]
      })

      let actual = getScriptSrc()

      const expected = '//www.googletagmanager.com/gtm.js?env=staging&id=GTM-XXX&l=dataLayer'

      expect(actual).toBe(expected)
    })

    test('fire gtm.start event', () => {
      new Ichnos({
        options: {
          active: true,
          id: 'GTM-XXX'
        },
        events: [{ type: 'addToCart' }]
      })

      const actual = (window as any).dataLayer[0]
      const expected = { event: 'gtm.js' }

      expect(actual).toMatchObject(expected)
    })
  })

  describe('send events', () => {
    test('send events payload to datalayer', () => {
      const ichnos = new Ichnos({
        options: {
          active: true,
          id: 'GTM-XXX'
        },
        events: [{ type: 'addToCart' }]
      })

      ichnos.send(
        ichnos.events.addToCart({
          category: 'add_to_cart'
        })
      )

      const actual = (window as any).dataLayer[1]
      const expected = { category: 'add_to_cart' }

      expect(actual).toEqual(expected)
    })

    test('does not send events when not active', () => {
      const ichnos = new Ichnos({
        options: {
          active: false,
          id: 'GTM-XXX'
        },
        events: [{ type: 'addToCart' }]
      })

      ichnos.send(ichnos.events.addToCart({ event: 'gtm', category: 'event_category' }))

      const actual = (window as any).dataLayer[1]

      expect(actual).not.toBeTruthy()
    })
  })

  describe('hooks', () => {
    test('call beforeSend hook', () => {
      const ichnos = new Ichnos({
        options: {
          active: true,
          id: 'GTM-XXX'
        },
        events: [{ type: 'addToCart' }],
        hook: {
          beforeSend(type, event) {
            return {
              ...event,
              newProperty: 'extra value'
            }
          }
        }
      })

      ichnos.send({ type: 'linkClick', payload: { event: 'gtm' } })

      const actual = (window as any).dataLayer[1]
      const expected = { event: 'gtm', newProperty: 'extra value' }

      expect(actual).toEqual(expected)
    })
  })
})

function getScriptSrc() {
  let src
  const script = document.querySelectorAll('script')
  script.forEach(s => {
    src = s.getAttribute('src')
  })

  return src
}
