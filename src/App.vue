<script setup>
import HelloWorld from './components/HelloWorld.vue'
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
function increment() {
  count.value++;
}
</script>

<template>
  <div class="app">

    <header class="statusBar">

      <!-- hygiene -->
      <div class="statusItem">
        <span class="statusLabel">Hygiene</span>
        <div class="statusBarTrack">
          <div class="statusBarFill statusBarFillHygiene"></div>
        </div>
      </div>

      <!-- happiness -->
      <div class="statusItem">
        <span class="statusLabel">Happiness</span>
        <div class="statusBarTrack">
          <div class="statusBarFill statusBarFillHappiness"></div>
        </div>
      </div>

      <!-- hunger -->
      <div class="statusItem">
        <span class="statusLabel">Hunger</span>
        <div class="statusBarTrack">
          <div class="statusBarFill statusBarFillHunger"></div>
        </div>
      </div>

    </header>

   <main class="gameArea">
    <PixiCanvas/>
   </main> 

<footer class="buttonBar">
  <button class="actionButton"> Feed </button>
  <button class="actionButton"> Play </button>
  <button class="actionButton"> Clean </button>
</footer>

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
