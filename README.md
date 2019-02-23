# Ichnos

Library for Tracking client-side events via Google Tag Manager (GTM).

# Usage

```bash
npm install @ichnos/core
```

```javascript
import Ichnos from '@ichnos/core'

// init library
const tracking = new Ichnos({ id: 'GTM-XXX' })
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

