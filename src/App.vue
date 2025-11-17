<script setup>
import PixiCanvas from './components/Game.vue'
</script>

<script>
  import { ref, computed } from 'vue'
  import { Application, Graphics } from 'pixi.js'
  import { Character } from './character';

  // reactive properties
  const name = ref("Mason");
  const count = ref(0);
  const pixiRef = ref();
  const character = ref();

  // computed properties
  const doubleCount = computed(() => count.value * 2);

  // methods
  function increment(){
    count.value++;
  }

  function makeSquare(){// Example: spinning square
    character.value = new Character("Maosn", pixiRef)
    console.log("Mason")
  }

  function moveLeft(){
    character.value.position.x -= 10
    character.value.sprite.scale.x = 1
  }

  function moveRight(){
    character.value.position.x += 10
    character.value.sprite.scale.x = -1
  }

</script>

<template>
  <div>
    <h1>Mason</h1>
    <PixiCanvas ref="pixiRef" />
    <button @click="makeSquare">Make Square</button>
    <button @click="moveLeft">Move Left</button>
    <button @click="moveRight">Move Right</button>
  </div>
</template>

<style scoped>

</style>
