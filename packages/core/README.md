# `@ichnos/core`

JavaScript library for Tracking client-side events for Superior via Google Tag Manager (GTM).

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
