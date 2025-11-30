<script setup>
  import PixiCanvas from './components/Game.vue'
  import { ref, computed } from 'vue'
  import { Application, Graphics } from 'pixi.js'
  import { Character } from './character';

  // reactive properties
  const name = ref("Mason");
  const count = ref(0);
  const pixiRef = ref();
  const character = ref();
  const playerName = ref();
  const characterName = ref();

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

</style>