# `@ichnos/vue`

> Vue plugin for ichnos

## Usage

```bash
npm install @ichnos/vue
```

```javascript
import ichnosVue from '@ichnos/vue'
import Vue from 'vue'

Vue.use(ichnosVue, {
  id: 'GTM-XXXX',
  active: true
})
```

in any vue component you should have access to `$ichnos` instance to fire any event using `send` method.

Typescript

```typescript
type IEvent = {
  event: string
}

this.$ichnos.send<IEvent>({
  event: 'event_name'
})
```

Javascript

```javascript
this.$ichnos.send({
  event: 'event_name'
})
```
