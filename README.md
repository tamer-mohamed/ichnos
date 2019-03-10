# Ichnos
Library for Tracking client-side events via Google Tag Manager (GTM).

## What is `Ichnos`?
 - Built with (Typescript)[https://www.typescriptlang.org/] :rocket:
 - Flexible-scalable solution for gtm tracking
 - Can be pluged to any view framework - see integrations
 - Redux-like: Easy to use and can hook into events 

# Usage

```bash
npm install @ichnos/core
```

if you using [yarn](https://yarnpkg.com) as package manager
```bash
yarn add @ichnos/core
```

# Getting started

## Initialize
Create Ichnos instance to inject gtm script.

```js
import Ichnos from '@ichnos/core'

const ichnos = new Ichnos({
    options: { id: 'GTM-XXX' },
    events: [
        { type: 'addToCart' },
        { type: 'buyItem' }
    ]
})
```

Ichnos instance API is: `{ send, events }`

#### `events`
return list of event creators as function indexed by event name to accept payload
##### Predfined events 
- `pageView`
    use it to fire page view for single page application
    `ichnos.events.pageView('page-path')`

#### `send`
apply hooks (if any) and send the event payload to gtm

```js
ichnos.send(
    ichnos.events.pageView('page-path')
)
```

```js
tracking.send(ichnos.events.addToCart({productId: '123' }))
tracking.send(ichnos.events.pageView('page-path'))
```

## Config

### Options


### Hooks
Events defined with a lifecycle in ichnos to reduce any boilerplate and redundunt code and make it simple to roll out your tracking events. 

you can use `beforeSend` hook to patch all the events before it is sent to gtm.
below is example to attach `event` property to all the events schema.

```ts
import Ichnos from '@ichnos/core'

const ichnos = new Ichnos({
    options: { id: 'GTM-XXX' },
    events: [ { type: 'addToCart' }]
    hooks: {
        beforeSend: (type, payload) => {
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

