<script setup>
  import PixiCanvas from './components/Game.vue'
  import { ref, computed, reactive } from 'vue'
  import { Character, FoodStar } from './character';
  import { v4 as uuidv4 } from 'uuid';

  // reactive properties
  const pixiRef = ref();
  const character = ref();
  const playerName = ref();
  const characterName = ref();
  const characterStats = reactive({
    hunger: 100,
    happieness: 100,
  })
  const petFact = ref(null);
  let foodSprites = []

  function jump(){
    if (character.value.states.jumping != character.value.state){
      character.value.startJump();
    }
  }

  function closePopup(){
    character.value = reactive(new Character(characterName, pixiRef, characterStats))
    document.getElementById("popup").close()
  }

  // Update function to detect collisions between food and the character
  setInterval(() => {
    if (foodSprites.length > 0){
      for (const item of foodSprites){
        if (testForAABB(character.value, item)){
          item.remove(pixiRef)
          foodSprites = foodSprites.filter(f => f !== item)
          character.value.getFed()
        }
      }
    }
  },1000)

  const charIsInit = computed(() => {
    if (character.value == null){
      return false
    }
    return true
  })

const getCharHunger = computed(() => {
  if (!character.value) return "—"
  return character.value.status.hunger
})

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

  async function onPixiReady(app) {
    pixiRef.value = { app };
    pixiRef.value.app.ticker.add(globalUpdate);
    const response = await fetch("http://localhost:2003/services/getData")
    const data = await response.json()
    console.log(data)
    const aUUID = document.cookie.split("=");
    console.log(aUUID)
    if (aUUID.length > 1){
      if (aUUID[0] == "uuid"){
        
      }
    }else{
      document.cookie = "uuid=" + uuidv4()
      document.getElementById("popup")?.showModal();
    }
    document.getElementById("popup")?.showModal();
  }

  function getPetFact() {
  var T = document.getElementById("infoBox");
  T.style.display = "block";

  fetch('/petFacts.json')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      const facts = data.facts || []
      if (facts.length === 0) {
        petFact.value = 'No information available'
        return
      }
      const index = Math.floor(Math.random() * facts.length)
      petFact.value = facts[index]
    })
    .catch((err) => {
      console.error('Error loading info', err)
      petFact.value = 'Cannot load info'
    })
}

  // onMounted(async () => {
  //   await nextTick(); 
  //   document.getElementById("popup")?.showModal();
  // });
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
  #status{
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    padding: 10px;
    justify-content: space-evenly;
    width: 40%;
    margin: auto;
  }
  .statusIndicator{
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: solid black 2px;
    border-radius: 20px;
    background-color: burlywood;
    color: black;
    min-width: 150px;
    font-size: 20px;
  }
  .statusIndicator p {
    margin: 0px;
  }
  #CharHeader{
    background-color: burlywood;
    border: solid black;
    border-radius: 20px;
    width: fit-content;
    margin: auto;
    padding: 10px;
    color: black;
  }
  #buttonBox{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 30%;
    margin: auto;
  }
  .buttoncontainer{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .buttonsprite{
    background-image: url("./assets/button.png");
    background-repeat: no-repeat;
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background-color: rgba(0,0,0,0);
    margin: auto;
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
    <h1 v-if="charIsInit" id="CharHeader" class="silkscreen-regular">{{ characterName }}</h1>
    <div id="status">
      <div class="statusIndicator">
        <label class="silkscreen-regular" for="hunger">hunger</label><br>
        <p class="silkscreen-regular" id="hunger" v-if="charIsInit">{{ character.status.hunger }}</p>
      </div>
      <div class="statusIndicator">
        <label class="silkscreen-regular" for="happynes">happynes</label><br>
        <p class="silkscreen-regular" id="happynes" v-if="charIsInit">{{  }}</p>
      </div>
    </div>
    <PixiCanvas @ready="onPixiReady" ref="pixiRef" />
    <div id="buttonBox">
      <div class="buttoncontainer">
        <button id="butt" class="buttonsprite" @click="jump"></button>
        <label for="butt">Jump</label>
      </div>
      <div class="buttoncontainer">
        <button id="butt2" class="buttonsprite" @click="feed"></button>
        <label for="butt2">Feed</label>
      </div>
      <div class="buttoncontainer">
        <button id="butt3" class="buttonsprite" @click="getPetFact"></button>
        <label for="butt3"> Info! </label>
      </div>
    </div>
    <div  class="statusIndicator" id="infoBox" style="display:none; font-size: 20px;">
      <p> {{ petFact }} </p> 
    </div>
  </div>
</template>