import { all, flip, has, is } from 'ramda'

const trackingDataset = ['trackcategory', 'tracklabel', 'trackvalue']
const hasRequiredArgs = (dataSet: any) => all(flip(has)(dataSet), ['trackcategory'])

type IMixinEvent = {
  elements: string[]
  eventListeners: string[]
  mapTagNameToGTMEventName: any
}

// TODO: update factory signature
export function mixinFactory({
  events,
  beforeSend
}: {
  events: IMixinEvent[]
  beforeSend(event: any): any
}): any {
  return {
    mounted() {
      events.map(trackingEvent => {
        trackingEvent.eventListeners.map(event => {
          document.body.addEventListener(event, (e: any) => {
            const tagName = e.target.tagName.toLowerCase()

            if (trackingEvent.elements.includes(tagName)) {
              if (hasRequiredArgs(e.target.dataset)) {
                const [category, label = '', value = ''] = trackingDataset.map(
                  (arg: string) => e.target.dataset[arg]
                )

                const trackingAction = []
                if (is(String, trackingEvent.mapTagNameToGTMEventName)) {
                  trackingAction.push(trackingEvent.mapTagNameToGTMEventName)
                } else if (is(Object, trackingEvent.mapTagNameToGTMEventName)) {
                  trackingAction.push(trackingEvent.mapTagNameToGTMEventName[tagName])
                }
                trackingAction.push(event)

                let eventToSend = {
                  category,
                  action: trackingAction.join('.'),
                  label: label,
                  value: value
                }

                if (beforeSend) {
                  eventToSend = beforeSend(eventToSend)
                }

                this.$ichnos.send(eventToSend)
              }
            }
          })
        })
      })
    }
  }
}
