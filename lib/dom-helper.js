/**
 * attach animation class and clean it on animationend
 *
 * @param {HTMLElement} el
 * @param {string} className
 * @param {Function} [cb]
 */
export function attachAnimation (el, className, cb) {
  if (!el) return
  el.classList.add(className)
  el.addEventListener('animationend', handler, false)
  function handler () {
    el.classList.remove(className)
    el.removeEventListener('animationend', handler)
    cb && cb()
  }
}
/**
 * append nodes to target
 *
 * @param {HTMLElement} node
 * @param {HTMLElement[]} nodeList
 */
export function appendChildren(node, nodeList) {
  nodeList.forEach(nodeItem => {
    node.appendChild(nodeItem)
  })
}

/**
 * remove all children of given node
 *
 * @param {HTMLElement} node
 */
export function removeChildren(node) {
  while(node.lastChild) {
    node.removeChild(node.lastChild)
  }
}

/**
 * a simple implementation of createElement
 *
 * @param {string} tagName html tag name
 * @param {Object} attributes attributes of node. only className and listeners are implemented now
 * @param {HTMLElement|string} ...children
 * @returns {HTMLElement}
 */
export function h(tagName, attributes, ...children) {
  const node = document.createElement(tagName)

  const classNames = attributes['className']
  if (classNames) {
    node.setAttribute('class', classNames)
  }

  const events = attributes['on']
  if (events) {
    for (const [eventName, listener] of Object.entries(events)) {
      node.addEventListener(eventName, listener, false)
    }
  }

  if (children) {
    for (const child of children) {
      if (typeof child === 'string') {
        node.appendChild(document.createTextNode(child))
      } else if (child instanceof HTMLElement) {
        node.appendChild(child)
      } else {
        console.log('unsupported node type')
      }
    }
  }

  return node
}
