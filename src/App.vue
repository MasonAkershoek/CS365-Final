<script setup>
import PixiCanvas from './components/Game.vue'
</script>

<script>
  import { ref, computed } from 'vue'
  import { Application, Graphics } from 'pixi.js'

  // reactive properties
  const name = ref("Mason");
  const count = ref(0);
  const pixiRef = ref();

  // computed properties
  const doubleCount = computed(() => count.value * 2);

  // methods
  function increment(){
    count.value++;
  }

  function makeSquare(){// Example: spinning square
  const square = new Graphics()
    .rect(-25, -25, 50, 50)
    .fill(0xff6600)

  square.x = pixiRef.value.app.renderer.width / 2
  square.y = pixiRef.value.app.renderer.height / 2
  pixiRef.value.app.stage.addChild(square)

  pixiRef.value.app.ticker.add(() => {
    square.rotation += 0.02
  })}

</script>

<template>
  <div>
    <h1>Mason</h1>
    <PixiCanvas ref="pixiRef" />
    <button @click="makeSquare">Make Square</button>
  </div>
</template>

<style scoped>

</style>
