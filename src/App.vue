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
    character.value = new Character("Maosn", pixiRef)
    console.log("Mason")
  }

  function jump(){
    if (character.value.states.jumping != character.value.state){
      character.value.startJump();
    }
  }

  window.onload = () => {
    document.getElementById("popup").showModal();
  };

  function closePopup(){
    character.value = new Character(characterName, pixiRef)
    document.getElementById("popup").close()
  }
</script>

<style>
  
</style>

<template>
  <dialog id="popup">
    <h3>Welcome to soot sprite tamagachi!</h3>
    <p>Please enter your name and your characters name</p>
    <form id="info">
      <label for="playerName">Your name:</label>
      <input type="text" v-model="playerName" name="playerName" id="playerName">
      <label for="charName">Character name: </label>
      <input type="text" v-model="characterName" name="charName" id="charName">
    </form>
    <button @click="closePopup">Close</button>
  </dialog>
  <div class="gameSection">
    <h1>Mason</h1>
    <PixiCanvas ref="pixiRef" />
    <button @click="jump">Jump</button>
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
