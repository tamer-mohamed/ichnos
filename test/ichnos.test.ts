import Ichnos from '../src/ichnos'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('DummyClass is instantiable', () => {
    expect(new Ichnos()).toBeInstanceOf(Ichnos)
  })
})
