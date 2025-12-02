<script setup>
  import PixiCanvas from './components/Game.vue'
  import { ref, onMounted, nextTick } from 'vue'
  import { Character, FoodStar } from './character';

  // reactive properties
  const pixiRef = ref();
  const character = ref();
  const playerName = ref();
  const characterName = ref();
  let foodSprites = []

  function jump(){
    if (character.value.states.jumping != character.value.state){
      character.value.startJump();
    }
  }

  function closePopup(){
    character.value = new Character(characterName, pixiRef)
    document.getElementById("popup").close()
  }

  // Update function to detect collisions between food and the character
  setInterval(() => {
    if (foodSprites.length > 0){
      for (const item of foodSprites){
        if (testForAABB(character.value, item)){
          item.remove(pixiRef)
          foodSprites = foodSprites.filter(f => f !== item)
        }
      }
    }
  },1000)

  function testForAABB(object1, object2) {
    if (!object1 || !object2) return false;
    const bounds1 = object1.sprite.getBounds();
    const bounds2 = object2.sprite.getBounds();

    return (
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y
    );
  }

  function feed(){
    for (let x=1; x<5; x++){
      let pos = 0;
      while (pos < 30 || pos > 300){
        pos = Math.round(Math.random()*300)
      }
      foodSprites.push(new FoodStar(pos, pixiRef))
    }
  }

  function globalUpdate(delta){
    if (character.value){
      character.value.update(delta)
    }
    for (const item of foodSprites){
      item.update(delta)
    }
  }

  function onPixiReady(app) {
    pixiRef.value = { app };
    pixiRef.value.app.ticker.add(globalUpdate);
    document.getElementById("popup")?.showModal();
  }

  onMounted(async () => {
    await nextTick(); 
    document.getElementById("popup")?.showModal();
  });
</script>

<style>
  #popup{
    border-radius: 20px;
    opacity: .96;
  }
  label{
    min-width: 100px;
  }
  #close{
    background-color: dimgrey;
  }
  #close:hover{
    border-color: darkcyan;
  }
</style>

<template>
  <dialog id="popup">
    <h3>Welcome to soot sprite tamagachi!</h3>
    <p>Please enter your name and your characters name</p>
    <label for="playerName">Your name:</label><br>
    <input type="text" v-model="playerName" name="playerName" id="playerName">
    <br><br>
    <label for="charName">Character name: </label><br>
    <input type="text" v-model="characterName" name="charName" id="charName">
    <br>
    <br>
    <button id="close" @click="closePopup">Start</button>
  </dialog>
  <div class="gameSection">
    <h1 class="silkscreen-regular">{{ characterName }}</h1>

    <PixiCanvas @ready="onPixiReady" ref="pixiRef" />
    <button @click="jump">Jump</button>
    <button @click="feed">Feed</button>
  </div>
</template>