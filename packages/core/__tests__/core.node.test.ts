/**
 * @jest-environment node
 */
/* tslint:disable no-unused-expression */

import Ichnos from '../lib/core'

describe('@ichnos/core for SSR', () => {
  test('does not throw error in server', () => {
    expect(
      () =>
        new Ichnos({
          options: {
            id: 'GTM-XXX'
          }
        })
    ).not.toThrowError()
  })
})
