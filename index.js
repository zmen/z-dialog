import ZDialog from './lib/modal'

// example I
const dialogI = new ZDialog({
  title: 'Dialog I',
  content: 'Content of dialog I',
})
const btn1 = document.querySelector('.btn1')
btn1.addEventListener('click', () => {
  dialogI.open()
}, false)

// example II
const dialogII = new ZDialog({
  title: 'Dialog II',
  content: 'Content of dialog II'
})
const dialogIII = new ZDialog({
  title: 'Dialog III',
  content: 'Content of dialog III '.repeat(10)
})
const dialogIV = new ZDialog({
  title: 'DialogIV',
  content: 'Content of dialog IV'
})
const btn2 = document.querySelector('.btn2')
btn2.addEventListener('click', () => {
  dialogII.open()
  dialogIII.open()
  dialogIV.open()
}, false)

// example III
const dialogVI = new ZDialog({
  title: 'Dialog VI',
  content: 'close in 6 seconds'
})
const btn3 = document.querySelector('.btn3')
btn3.addEventListener('click', () => {
  dialogVI.open()
  let count = 5
  const timer = setInterval(() => {
    if (count <= 0) {
      dialogVI.close()
      dialogVI.content = 'close in 6 seconds'
      clearInterval(timer)
    } else {
      dialogVI.content = `close in ${count} seconds`
      count--
    }
  }, 1000)
  dialogVI.on('close', () => {
    clearInterval(timer)
    dialogVI.content = 'close in 6 seconds'
  })
}, false)

// example IV
const dialogIIV = new ZDialog({
  title: 'Dialog IIV',
  content: 'content '.repeat(5),
  dialogType: 'Alert'
})
const btn4 = document.querySelector('.btn4')
btn4.addEventListener('click', () => {
  dialogIIV.open()
}, false)

// example VI
const dialogIIIV = new ZDialog({
  title: 'Dialog IIIV',
  content: 'content of dialogIIIV'
})
dialogIIIV.on('open', () => { alert('dialog is opened') })
dialogIIIV.on('cancel', () => { alert('click on cancel') })
dialogIIIV.on('confirm', () => { alert('click on confirm') })
dialogIIIV.on('close', () => { alert('dialog is closed') })
const btn5 = document.querySelector('.btn5')
btn5.addEventListener('click', () => {
  dialogIIIV.open()
}, false)

// example IIV
const dialogVV = new ZDialog({
  title: 'Dialog VV',
  content: 'content of dialog VV',
  cancel: 'close instantly',
  confirm: 'close after 2 seconds'
})
dialogVV.on('confirm', () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 2000)
  })
})
const btn6 = document.querySelector('.btn6')
btn6.addEventListener('click', () => {
  dialogVV.open()
}, false)


