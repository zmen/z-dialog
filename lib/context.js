const context = {}

context.uid = 0
context.container = null
context.dialogs = []

// where the contain attachs to
context.parentNode = document.body

// create container
context.init = function () {
  if (!this.container) {
    this.container = document.createElement('div')
    this.container.setAttribute('class', 'z-dialog-container')
    this.parentNode.appendChild(this.container)
  }
}

// store new dialog
context.add = function (dialogInstance) {
  this.dialogs.push(dialogInstance)
  updateZIndex()
}

// remove dialog
context.remove = function (dialogInstance) {
  this.dialogs = this.dialogs.filter(item => item !== dialogInstance)
  updateZIndex()
}

// close and destroy all dialogs
context.destroyAll = function () {
  while (this.dialogs.length) {
    this.dialogs.pop().close()
  }
}

// update zIndex of dialog.$el
function updateZIndex() {
  context.dialogs.forEach((dialog, index) => {
    dialog.$el.style.zIndex = index
  })
}

export default context

