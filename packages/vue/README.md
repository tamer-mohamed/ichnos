# `@ichnos/vue`

> Vue plugin for ichnos

## Usage

```bash
npm install @ichnos/vue
```


### Setup Vue plugin
```javascript
import ichnosVue from '@ichnos/vue'
import Vue from 'vue'

Vue.use(ichnosVue, {
  id: 'GTM-XXXX',
  active: true,
})
```

#### Plugin options
`active` 
use `true` if you want to enable sending the value to GTM. useful for local development

`debug`

`id` 
GTM ID

### Setup vue mixin 
you may need to tracking html elements using `data-track*` attributes.
find example below to track html elements and format gtm event before sending the event using `beforeSend` hook

```ts
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
