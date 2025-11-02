import 'aframe'
// import 'aframe-inspector'
import 'mind-ar/dist/mindar-image-aframe.prod.js'
import config from './config.json'

const scene = document.getElementById('aframe-scene')

const overlay = config.scanningOverlay ? createOverlay() : null
if (overlay) document.body.insertBefore(overlay, scene)

scene.innerHTML = `
<a-scene
  mindar-image="autoStart: true; imageTargetSrc: ${config.triggerTarget}${
  overlay ? '; uiScanning: #scanning-overlay' : ''
}"
  color-space="sRGB"
  renderer="colorManagement: true, physicallyCorrectLights">
  <a-assets>
    <img id="trigger-asset" crossorigin="anonymous" src="${
      config.triggerTarget
    }" />
    <${
      config.sceneModel ? 'a-asset-item' : 'img'
    } id="model-asset" crossorigin="anonymous" src="${
  config.sceneModel || config.sceneImage
}"></${config.sceneModel ? 'a-asset-item' : 'img'}>
  </a-assets>
  <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
  <a-entity id="target" mindar-image-target="targetIndex: 0">
    ${
      config.background
        ? '<a-plane id="trigger" src="#trigger-asset" position="0 0 0" height="0.552" width="1"></a-plane>'
        : ''
    }
    ${createTarget()}
  </a-entity>
</a-scene>
`

let arSystem
const sceneEl = scene.querySelector('a-scene')
sceneEl.addEventListener('loaded', function () {
  arSystem = sceneEl.systems['mindar-image-system']
})

sceneEl.addEventListener('arReady', () => {
  console.log('MindAR is ready')
})
sceneEl.addEventListener('arError', (e) => {
  console.log('MindAR failed to start', e)
})

const targetEl = scene.querySelector('#target')
targetEl.addEventListener('targetFound', (e) => console.log('Target found', e))
targetEl.addEventListener('targetLost', (e) => console.log('Target lost', e))

function createOverlay() {
  const overlay = document.createElement('div')
  overlay.id = 'scanning-overlay'
  overlay.className = 'oz-overlay oz-overlay-scanning hidden'
  overlay.textContent = 'Scanning...'
  return overlay
}

function createTarget() {
  const baseAnim = config.animate
    ? 'property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate'
    : ''
  if (config.sceneModel) {
    return `<a-gltf-model id="model" src="#model-asset" position="0 0 0.1" rotation="0 0 0" scale="0.1 0.1 0.1" animation="${baseAnim}"></a-gltf-model>`
  }
  if (config.sceneImage) {
    return `<a-image id="model" src="#model-asset" position="0 0 0.1" rotation="0 0 0" height="1" width="1" animation="${baseAnim}"></a-image>`
  }
  return ''
}
