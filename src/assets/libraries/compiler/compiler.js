import { OfflineCompiler } from '../../src/image-target/offline-compiler.js'

import { writeFile } from 'fs/promises'
import { loadImage } from 'canvas'

const imagePaths = ['examples/image-tracking/assets/circle-example/circle.png']

async function run() {
  const images = await Promise.all(imagePaths.map((value) => loadImage(value)))
  const compiler = new OfflineCompiler()
  await compiler.compileImageTargets(images, console.log)
  const buffer = compiler.exportData()
  await writeFile(
    'examples/image-tracking/assets/circle-example/circle.mind',
    buffer
  )
}

run()
