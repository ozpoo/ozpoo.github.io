import 'aframe'
import 'mind-ar/dist/mindar-image-aframe.prod.js'

let arSystem

const sceneEl = document.querySelector('a-scene')
sceneEl.addEventListener('loaded', function () {
  arSystem = sceneEl.systems['mindar-image-system']
})
sceneEl.addEventListener('arReady', () => {
  console.log('MindAR is ready')
})
sceneEl.addEventListener('arError', (e) => {
  console.log('MindAR failed to start', e)
})

const targetEl = document.querySelector('#target')
targetEl.addEventListener('targetFound', (e) => console.log('Target found', e))
targetEl.addEventListener('targetLost', (e) => console.log('Target lost', e))
