<template>
    <div ref="pixiContainer" class="pixi-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Application, Graphics } from 'pixi.js'

const pixiContainer = ref(null)
let app

onMounted( async() => {
  // Use the modular Application class
  app = new Application()
  await app.init({
    width: 480,
    height: 270,
    backgroundColor: 0x1e1e1e,
    antialias: true,
  })

  pixiContainer.value.appendChild(app.canvas)

  // Example: spinning square
  const square = new Graphics()
    .rect(-25, -25, 50, 50)
    .fill(0xff6600)

  square.x = app.renderer.width / 2
  square.y = app.renderer.height / 2
  app.stage.addChild(square)

  app.ticker.add(() => {
    square.rotation += 0.02
  })
})

onBeforeUnmount(() => {
  app?.destroy(true, true)
})
</script>

