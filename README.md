# ZDialog

> A simple dialog modal implementation

## Quick Start

```shell
npm install

# development with Parcel
npm run dev

# bundle with rollup
npm run build
```

## Usage/API

Used as umd:

```html
<link rel="./dist/z-dialog.css" />
<body>
  <script src="./dist/z-dialog.bundle.js"></script>
  <script>
    const dialog = new ZDialog({/* options */})
    // ...
  </script>
</body>
```

Used as es6-module:

```javascript
import ZDialog from './dist/z-dialog.esm.js'
import './dist/z-dialog.css'

// create a new instance
const dialog = new ZDialog({
  title: 'Your Title',
  content: 'You Content',
  confirm: 'Confirm Text',
  cancel: 'Cancel Text',
  // Alert | Confirm
  dialogType: 'Alert'
})

const log = console.log

// open an instance
dialog.open()
// attach a listener on 'open' event
dialog.on('open', () => { log('dialog is open') })
// you can attach more listeners
dialog.on('open', () => { log('another listener') })
// or unbind it with named function
function handler() { log('temp listener') }
dialog.on('open', handler)
dialog.emit('open')
// 'alert dialog is open'
// 'another listener'
// 'temp listener'
dialog.unbind('open', handler)
dialog.emit('open')
// 'alert dialog is open'
// 'another listener'

// available events: 'open', 'close', 'confirm', 'cancel
dialog.on('close', () => { log('dialog is closed') })

// you can get dialog.content | dialog.title | dialog.cancel | dialog.confirm directly
console.log(dialog.content)
// any changes to those attributes with trigger render
setInterval(() => {
  dialog.content = `Date: ${new Date()}`
}, 1000)

// delay close event
// for 'confirm | cancel' events, if any listener returns a Promise
// the 'close' event won't be fired until all those Promise are fulfilled
dialog.on('confirm', () => {
  return new Promise((resolve => setTimeout(() => resolve(), 2000))
})

```

## Custom theme

A simple way to change the theme is to modify predefined css variables.

```css
:root {
  --animate-duration: .5s;
  --bg-overlay: rgba(0, 0, 0, .4);
  --color-border: #e8e8e8;
  --color-light: #fff;
  --color-primary: #108ee9;
  --radius: 4px;
  --width-dialog: 520px;
  --zindex-container: 1000;
}

```

If you want futher modification, just use another stylesheet.

