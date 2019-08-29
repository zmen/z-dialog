import context from './context'
import { updateOverlay } from './overlay'
import { h, appendChildren, removeChildren, attachAnimation } from './dom-helper'

class ZDialog {

  constructor(options) {
    this.uid = context.uid++
    this.$el = null
    // reactive texts
    this._defineReactive('title', options.title || 'Default Title')
    this._defineReactive('content', options.content || 'Default Content')
    this._defineReactive('confirm', options.confirm || 'Confirm')
    this._defineReactive('cancel', options.cancel || 'Cancel')
    // 'Alert' or 'Confirm'
    this.dialogType = options.dialogType || 'Confirm'
    this.events = {
      'close': [],
      'open': [],
      'confirm': [],
      'cancel': []
    }
  }

  // auto-render helper
  _defineReactive(attr, value) {
    Object.defineProperty(this, attr, {
      get() { return value},
      set(newValue) {
        if (newValue !== value) {
          value = newValue
          this.render()
        }
      }
    })
  }

  open() {
    context.init()
    if (!this.$el) {
      this.$el = h('div', {className: `z-dialog z-dialog--${this.uid}`})
    }

    context.add(this)
    updateOverlay()

    this.render()
    context.container.appendChild(this.$el)
    attachAnimation(this.$el, 'z-scale-in')
    this.emit('open')
  }

  // render new childNodes
  render() {
    removeChildren(this.$el)
    appendChildren(this.$el, [
      h('div', {
        className: 'z-dialog__close', 
        on: { 'click': this.close.bind(this) }
      }, '✕'),
      h('div', { className: 'z-dialog__header' }, this.title),
      h('div', { className: 'z-dialog__content' }, this.content),
      h('div', { className: 'z-dialog__footer' },
        this.dialogType === 'Confirm' && h('button', {
          className: 'z-dialog__btn',
          on: { 'click': this._onClickCancel.bind(this) }
        }, this.cancel),
        h('button', {
          className: 'z-dialog__btn z-dialog__btn--primary',
          on: { 'click': this._onClickConfirm.bind(this) }
        }, this.confirm),
      )
    ])
  }

  close() {
    if (!context.container || !context.container.contains(this.$el)) return
    // remove from context
    context.remove(this)
    updateOverlay()
    attachAnimation(this.$el, 'z-scale-out', () => {
      context.container.removeChild(this.$el)
      this.emit('close')
    })
  }

  _onClickCancel() {
    this.emit('cancel').then(() => this.close())
  }

  _onClickConfirm() {
    this.emit('confirm').then(() => this.close())
  }

  closeAll() {
    context.destroyAll()    
    updateOverlay()
  }

  // register listener on target event
  on(eventName, listener) {
    const listeners = this.events[eventName]
    if (listeners && typeof listener === 'function') {
      listeners.push(listener)
    }
  }

  // unbind a registered listener
  unbind(eventName, listener) {
    const listeners = this.events[eventName]
    if (listeners) {
      listeners = listeners.filter(fn => fn !== listener)
    }
  }

  // invoke all listeners on given event
  emit(eventName, data) {
    const listeners = this.events[eventName]
    if (listeners) {
      // to delay close event
      return Promise.all(
        listeners.map(fn => fn.call(this, data))
          .filter(p => p instanceof Promise)
      )
    }
    return Promise.resolve(false)
  }
}

export default ZDialog

