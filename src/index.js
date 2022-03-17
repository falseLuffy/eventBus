export default class EventBus {
  events: Object;

  constructor() {
    this.events = {}
  }

  on(event: string | Array<string>, fn: Function) {

  }

  emit(event: string) {

  }

  once(event: string, fn: Function) {

  }

  off(event?: string | Array<string>, fn?: Function) {

  }
}
