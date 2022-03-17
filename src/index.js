import { toArray } from './utils'

export default class EventBus {
  constructor () {
    this.events = Object.create(null)
  }

  on (event, fn) {
    const that = this
    if (Array.isArray(event)) {
      event.forEach(name => {
        that.on(name, fn)
      })
    } else {
      (that.events[event] && (that.events[event] = [])).push(fn)
    }
    return that
  }

  emit (event) {
    const that = this
    const cbs = that.events[event]
    if (cbs) {
      const args = toArray(arguments, 1)
      cbs.forEach(cb => {
        cb.apply(that, args)
      })
    }
    return that
  }

  once (event, fn) {
    const that = this
    function on () {
      that.off(event, on)
      fn.apply(that, arguments)
    }
    on.fn = fn
    that.on(event, on)

    return that
  }

  off (event, fn) {
    const that = this
    if (!arguments.length) {
      that.events = Object.create(null)
      return that
    }

    if (Array.isArray(event)) {
      event.forEach(name => {
        that.off(name)
      })
      return that
    }

    const cbs = that.events[event]

    if (!cbs) return that
    if (!fn) {
      that.events[event] = null
      return that
    }
    // specific handler
    let cb
    let i = cbs.length
    while (i--) {
      cb = cbs[i]
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }
    return that
  }
}
