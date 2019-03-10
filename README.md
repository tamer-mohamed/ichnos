# Ichnos
Library for Tracking client-side events via Google Tag Manager (GTM).

## What is `Ichnos`?
 - Built with (Typescript)[https://www.typescriptlang.org/] :rocket:
 - Flexible-scalable solution for gtm tracking
 - Can be pluged to any view framework - see integrations
 - Redux-like: Easy to use and can hook into events 

## Install

```bash
npm install @ichnos/core
```

if you using [yarn](https://yarnpkg.com) as package manager
```bash
yarn add @ichnos/core
```

## Getting started
Create Ichnos instance and register event types.

```js
import Ichnos from '@ichnos/core'

const ichnos = new Ichnos({
    options: { id: 'GTM-XXX' },  
    events: [  // register events
        { type: 'addToCart' }
    ]
})
```
next, you can fire events with payload as follow:

```js 
ichnos.send(
    ichnos.events.addToCart({ productId: 'abc' })
)
```

## Configurations

### `config.options`

| Name          | type          | default | comments  |
| ------------- |:-------------:| -------:|----------:|
| id (required) |  `String`     |         |           |
| events (required) |  `{ type: String }`     |     []    | register event types          |
| active        |  `Boolean`     |         | whether to enable sending gtm events|
| layer         |  `String`     | `dataLayer` |whether to enable sending gtm events|
| debug         |  `Boolean`     | `false` | show logs in the console |

### `config.events`
array of events types to register to ichnos instance, Example:

```js 
const ichnos = new Ichnos({
    // ...
    events: [{ type: 'addToCart' }]
    // ...
})
```

then, you can use it to generate event with payload before send

```js
ichnos.send(
    ichnos.events.addToCart({ productId: 'abc'})
)
```

### Hooks

Events defined with a lifecycle in ichnos to reduce any boilerplate and redundunt code and make it simple to roll out your tracking events. 

| Name          | signature     | comments  |
| ------------- |:-------------:| -----:|
| `beforeSend`  | `beforeSend(type:string, payload: Payload, history: gtmEvents[]): Payload | false` | cancel sending the event if false is returned |

#### `beforeSend`

`beforeSend(type:string, payload: any, history: gtmEvents[])`

hook called before send gtm event to the datalayer

below is example to attach `event` property to all the events schema.

```ts
import Ichnos from '@ichnos/core'

const ichnos = new Ichnos({
    options: { id: 'GTM-XXX' },
    events: [ { type: 'addToCart' }]
    hook: {
        beforeSend: (type, payload, history) => {
            let event = payload;

            if(type === 'addToCart'){
                return {
                    userId: 'xyz'
                    ...event
                }
            }

            return event;
        }
    }
})
//...
//...

ichnos.send(ichnos.events.addToCart({ productId: '123' })); // { userId: 'xyz', productId: '123' }
```

# Integrations

- [x] [@ichnos/vue](https://github.com/tamer-mohamed/ichnos/tree/master/packages/vue) - Vue integration
- [ ] @ichnos/react
- [ ] @ichnos/preact
- [ ] @ichnos/angular