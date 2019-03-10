# `@ichnos/core`

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
| ------------- | ------------- | ------- | --------- |
| id (required) |  `string`     |         |           |
| events (required) |  `{ type: String }`     |     []    | register event types          |
| active        |  `boolean`     | `false`  | whether to enable sending gtm events|
| layer         |  `string`     | `dataLayer` |whether to enable sending gtm events|
| debug         |  `boolean`     | `false` | show logs in the console |

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

### `config.hook`

Events defined with a lifecycle in ichnos to reduce any boilerplate and redundunt code and make it simple to roll out your tracking events. below list of hooks can be applied:

#### `beforeSend`

`beforeSend(type:string, payload: any, history: gtmEvents[])`

hook called before send gtm event to the datalayer

below is example to attach `event` property to all the events schema.

```js
import Ichnos from '@ichnos/core'

const ichnos = new Ichnos({
    // ...
    hook: {
        beforeSend: (type, payload, history) => {
            if(type === 'addToCart'){
                return {
                    userId: 'xyz'
                    ...payload
                }
            }
            return payload;
        }
    }
})
```

then, sending events with type `addToCart` will add `userId: 'xyz'` to it

```js
ichnos.send({ productId: 'abc' }); // { userId: 'xyz`, productId: 'abc' }
```
