# `@ichnos/core`

JavaScript library for Tracking client-side events for Superior via Google Tag Manager (GTM).

# Usage

```bash
npm install @ichnos/core
```

```javascript
import Ichnos from 'ichnos'

// init library
const tracking = new Ichnos({ id: 'GTM-XXX' })
//...
//...
//...
// send events
tracking.send({ event: 'PageView' })
tracking.send({ event: 'VariantView', variantId: 'variant-a' })
```

#### Typescript support

```typescript
import Ichnos from 'ichnos'

const tracking = new Ichnos({ id: 'GTM-XXX' })
//...
//...
//...
type IVariantEvent = {
  event: string
  variantId: string
}
// send events
tracking.send<IEvent>({ event: 'PageView' })
tracking.send<IVariantEvent>({ event: 'VariantView', variantId: 'variant-a' })
```
