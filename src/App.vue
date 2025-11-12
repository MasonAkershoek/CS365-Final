<script setup>
import HelloWorld from './components/HelloWorld.vue'
import PixiCanvas from './components/Game.vue'
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
</script>

<template>
  <div>
    <h1>Mason</h1>
    <PixiCanvas />
  </div>
</template>

<style scoped>

</style>
