export default {
  input: 'lib/modal.js',
  output: [{
    file: 'dist/z-dialog.esm.js',
    format: 'esm'
  }, {
    file: 'dist/z-dialog.bundle.js',
    format: 'umd',
    name: 'ZDialog'
  }]
}