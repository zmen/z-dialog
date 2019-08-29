import context from './context'
import { h, attachAnimation } from './dom-helper'

let overlay = null

export function updateOverlay() {
  const container = context.container
  const dialogs = context.dialogs

  // if overlay is not initilized and a dialog is created
  if (!overlay && dialogs.length > 0) {
    overlay = h('div', {
      className: 'z-dialog-overlay',
      on: {
        click: function () {
          const dialogs = context.dialogs
          dialogs.length > 0 && dialogs.pop().close()
          dialogs.length <= 0 && closeOverlay()
        }
      }
    })
    attachAnimation(overlay, 'z-fade-in')
    container.insertBefore(overlay, container.childNodes[0])
  }
  // close overlay if no dialog instance exists
  if (dialogs.length === 0) {
    closeOverlay()
  }
  // make sure that overlay is exactly behind the last dialog
  if (overlay) {
    overlay.style.zIndex = Math.max(dialogs.length - 1, 0)
  }
}

export function closeOverlay() {
  attachAnimation(overlay, 'z-fade-out', function () {
    overlay && context.container.removeChild(overlay)
    overlay = null
  })
}


