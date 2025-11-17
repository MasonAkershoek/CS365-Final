<template>
    <div ref="pixiContainer" class="pixi-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Application, Graphics } from 'pixi.js'

const pixiContainer = ref(null)
const app = ref(null)

onMounted( async() => {
  // Use the modular Application class
  const pixiapp = new Application()
  await pixiapp.init({
    width: 480,
    height: 480,
    backgroundColor: 0x1e1e1e,
    antialias: true,
  })

  pixiContainer.value.appendChild(pixiapp.canvas)
  app.value = pixiapp

})
defineExpose({ pixiContainer, app })
onBeforeUnmount(() => {
  app?.destroy(true, true)
})
</script>

