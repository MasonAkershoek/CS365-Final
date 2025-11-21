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

  function jump(){
    if (character.value.states.jumping != character.value.state){
      character.value.startJump();
    }
  }

</script>

<template>
  <div>
    <h1>Mason</h1>
    <PixiCanvas ref="pixiRef" />
    <button @click="makeSquare">Make Square</button>
    <button @click="jump">Jump</button>
  </div>
</template>

<style scoped>

</style>
