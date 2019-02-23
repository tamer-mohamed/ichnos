# `@ichnos/vue`

> Vue plugin for ichnos

## Usage

```bash
npm install @ichnos/vue
```


### Setup Vue plugin
```ts
import {plugin} from '@ichnos/vue'
import Vue from 'vue'

Vue.use(plugin, {
  id: 'GTM-XXXX',
  active: true,
})
```

#### Plugin options
```ts
interface IOptions {
  id: string
  active?: boolean // default: true
  layer?: string // default: dataLayer
  debug?: boolean // default: false
}
```


### Setup Vue mixin 
you may need to tracking html elements using `data-track*` attributes.
find example below to track html elements and format gtm event before sending the event using `beforeSend` hook

```ts
import Vue from 'vue'
import {mixinFactory} from '@ichnos/vue'


new Vue({
    mixins: [
      mixinFactory({
        events: [
          {
            elements: ['a', 'button'],
            eventListeners: ['click'],
            mapTagNameToGTMEventName: {
              button: 'button',
              a: 'link',
            },
          },
          {
            elements: ['input', 'textarea', 'checkbox', 'radio'],
            eventListeners: ['focusin', 'focusout'],
            mapTagNameToGTMEventName: 'input',
          },
        ],
        beforeSend: (event) => ({
          event: 'gtmEvent',
          gtmEventCategory: event.category, // -> interpolated from data-trackcategory
          gtmEventLabel: event.label,
          gtmEventValue: event.value,
          gtmEventAction: event.action,
        }),
      }),
    ],
});
```

#### `mixinFactory` params

```ts
interface IMixinFactory {
  event: {
    elements: string[]
    eventListeners: string[]
    mapTagNameToGTMEventName: string | { [tagName: string]: string } 
  },
  beforeSend(event: any): any
}
```

### Fire events Imperatively 

in any vue component you will access to `$ichnos` instance to fire any event using `send` method.

```js
this.$ichnos.send({
  event: 'event_name'
})
```
