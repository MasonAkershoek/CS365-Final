<template>
    <div ref="pixiContainer" class="pixi-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Application, Assets, Sprite } from 'pixi.js'
import bg1 from '../assets/bg1.png'

const emit = defineEmits(['ready']);
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
  emit('ready', app.value);

})
defineExpose({ pixiContainer, app })
</script>

