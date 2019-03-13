# `@ichnos/vue`

> Vue plugin for ichnos

## Install

```bash
npm install @ichnos/vue
```

### Setup Vue plugin

```ts
import { plugin } from '@ichnos/vue'
import Vue from 'vue'

Vue.use(plugin, {
  events: [{ type: 'addToCart' }],
  options: {
    id: 'GTM-XXXX',
    active: true
  },
  beforeSend: event => ({
    event: 'my_app_events',
    ...event
  })
})
```

then, ichnos instance will be available via \$ichnos in vue instance.
next, you can either fire events imperatively using `send` method or use ichnos as vue-directive

#### Using directive

Below example to fire `focusin` event

```vue
<button v-ichnos:click.addToCart="{ category: 'xyz' }" />
```

### Fire events Imperatively

in any vue component you will access to `$ichnos` instance to fire any event using `send` method.

```js
const { send, events } = this.$ichnos
send(events.addToCart({ category: 'xyz' }))
```
