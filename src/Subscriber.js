"use strict"
export default class Subscriber {
  constructor(url) {
    this.eventSource = new EventSource(url)
    this.callbacks = []
    this.modifiedCallbacks = []
    this.events = []
  }

  on(event, callback) {
    let modified = me => {
      callback(JSON.parse(me.data))
    }
    this.callbacks.push(callback)
    this.modifiedCallbacks.push(modified)
    this.events.push(event)
    this.eventSource.addEventListener(event, modified)
  }

  /**
   * off event | 取消注册回调
   * @param {string} event if falsy off all event | 如果不存在
   * @param {function} callback 
   */
  off(event, callback) {
    if (!event) {
      //remove all
      this.modifiedCallbacks.forEach((x, i) => {
        this.eventSource.removeEventListener(this.events[i], x)
      })
      this.callbacks = []
      this.modifiedCallbacks = []
      this.events = []
      return
    }

    if (!callback) {
      //remove all named event
      let indexarr = this.events
        .map((x, i) => i)
        .filter((x, i) => this.events[i] == event)
      for (let i = indexarr.length - 1; i >= 0; i--) {
        this.removeIndex(i)
      }
      return
    }

    //remove one
    let index = this.callbacks.indexOf(callback)
    if (index != -1) {
      this.removeIndex(index)
    }
  }

  removeIndex(i) {
    this.eventSource.removeEventListener(this.events[i], this.modifiedCallbacks[i])
    this.events.splice(i, 1)
    this.callbacks.splice(i, 1)
    this.modifiedCallbacks.splice(i, 1)
  }

  /**
   * unsubscribe | 停止订阅
   */
  unsubscribe() {
    this.off()
    this.eventSource.close()
  }
}
