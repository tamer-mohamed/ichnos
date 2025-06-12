# `@ichnos/vue`

> Vue plugin for ichnos

For general information about Ichnos and core configuration, please see the main [README.md](../../README.md).

## Install

```bash
npm install @ichnos/vue
```

## Usage

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
  hook: {
    beforeSend: event => ({ // Assuming 'beforeSend' should be under a 'hook' object like in the core example
      event: 'my_app_events',
      ...event
    })
  }
})
```

Then, the Ichnos instance will be available via `this.$ichnos` in your Vue components. You can fire events imperatively using the `send` method or use Ichnos as a Vue directive.

### Using directive

Below is an example of how to fire an `addToCart` event on click:

```vue
<button v-ichnos:click.addToCart="{ category: 'xyz' }">Add to Cart</button>
```

This will send an event with the type `addToCart` and the specified payload when the button is clicked.

### Fire events Imperatively

Within any Vue component, you can access the `$ichnos` instance to fire any event using the `send` method:

```javascript
// Example within a Vue component method
export default {
  methods: {
    addProductToCart() {
      const { send, events } = this.$ichnos;
      send(events.addToCart({ category: 'xyz', productId: '123' }));
    }
  }
}
```
