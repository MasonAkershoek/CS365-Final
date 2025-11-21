<script setup>
import PixiCanvas from './components/Game.vue'
import Game from './components/Game.vue'
</script>

<script>
import { ref, computed } from 'vue'

// reactive properties
const name = ref("Mason");
const count = ref(0);

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
.app {
  height: fit-content;
  display: flex;
  flex-direction: column;
  background: burlywood;
  padding: 20px;
  border:#374151;
  
}

.statusBar {
  display: flex;
  padding: 10px;
  gap: 10px;
}

.statusLabel {
text-transform: uppercase;
}

.statusItem {
  flex: 1;
  max-width: 220px;
  gap: 0.25rem;
}

.statusBarTrack {
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: #374151;
}

.statusBarFill {
  height: 100%;
  width: 60%;
  border-radius: 999px;
}

.buttonBar {
  display: flex;
  padding: 10px;
  gap: 10px;
  justify-content: space-between;
}

.actionButton {
  padding: 10px;
  width: 150px;
  text-transform: uppercase;
  text-align: center;

}

.statusBarFillHunger {
  background-color: orange;
}

.statusBarFillHygiene {
  background-color: blue;
}

.statusBarFillHappiness {
  background-color: green;
}

</style>
