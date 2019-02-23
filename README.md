# Ichnos

Library for Tracking client-side events via Google Tag Manager (GTM).

# Usage

```bash
npm install @ichnos/core
```

```javascript
import Ichnos from '@ichnos/core'

// init library
const tracking = new Ichnos({
    options: { id: 'GTM-XXX' },
})
//...
//...
//...
// send events
tracking.send({ event: 'PageView' })
tracking.send({ event: 'VariantView', variantId: 'variant-a' })
```

### Hooks
Events defined with a lifecycle in ichnos to reduce any boilerplate and redundunt code and make it simple to roll out your tracking events. 

you can use `beforeSend` hook to patch all the events before it is sent to GTM.
below is example to attach `event` property to all the events schema.

```ts
import Ichnos from '@ichnos/core'

// init library
const tracking = new Ichnos({
    options: { id: 'GTM-XXX' },
    hooks: {
        beforeSend: (event) => ({
            event: 'global_property',
            ...event,
        })
    }
})
//...
//...
//...
// send events
tracking.send({ event: 'PageView' })
tracking.send({ event: 'VariantView', variantId: 'variant-a' })
```


# Integrations

- [x] [@ichnos/vue](https://github.com/tamer-mohamed/ichnos/tree/master/packages/vue) - Vue integration
- [ ] @ichnos/react
- [ ] @ichnos/preact
- [ ] @ichnos/angular

