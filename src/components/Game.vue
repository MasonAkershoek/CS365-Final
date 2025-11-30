<template>
    <div ref="pixiContainer" class="pixi-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Application, Graphics, Assets, Sprite } from 'pixi.js'
import bg1 from '../assets/bg1.png'

const pixiContainer = ref(null)
const app = ref(null)

onMounted( async() => {
  // Use the modular Application class
  const pixiapp = new Application()
  await pixiapp.init({
    width: 352,
    height: 352,
    backgroundAlpha: 0,
    antialias: true,
  })

  pixiContainer.value.appendChild(pixiapp.canvas)
  app.value = pixiapp

  const texture = await Assets.load(bg1)
  const bg = new Sprite(texture)

  // Make the background fill the Pixi canvas
  bg.width = pixiapp.renderer.width
  bg.height = pixiapp.renderer.height

  pixiapp.stage.addChild(bg)

})
defineExpose({ pixiContainer, app })
onBeforeUnmount(() => {
  app?.destroy(true, true)
})
</script>

