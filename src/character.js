// The getImg function will take in a character name and grab all of the image data for that character
// The file structure of the image data is important.
// <CharacterName>
//   |- Idle
//   |   |- ( idle<frame#>.png )
//   |- Walking
//   |   |- ( waling<frame#>.png )
//   |- etc...

// This code is very bad and was quickly thrown togeather to produce a working product to demonstrate that i know how to make this better
// I will explain how i would do it. Firstly each state would be a seprate object that would implement the structure of a finite state mashine
// having each state as a seprate object would cut down on reused code and make it so only one function call would need to be made on the current state object
// This would also cut down on if statements because all the logic needed to determine the state would be stored in the object itself.
// Kinda a weird ramble but just wanted to demonstrate that i infact did learn something from sarkala and CS322 - Mason 

// Module imports
import { Application,
  Graphics,
  Text,
  TextStyle,
  Ticker,
  Assets,
  Sprite, 
  AnimatedSprite} from 'pixi.js'

  // Asset imports 
  const idelFrames = import.meta.glob("./assets/character/idle/*.png", {eager: true})
  const walkingFrames = import.meta.glob("./assets/character/walk/*.png", {eager: true})
  const dancingFrames = import.meta.glob("./assets/character/dance/*.png", {eager: true})
//   const sleepingFrames = import.meta.glob("./assets/character/sleep/")
//   const sickFrames = import.meta.glob("./assets/character/sick/")
//   const hungryFrames = import.meta.glob("./assets/character/hungry/")

// Load in all the textures
const walking = await framesToArray(walkingFrames)
const idle = await framesToArray(idelFrames)
const dancing = await framesToArray(dancingFrames)


async function framesToArray(framesObject){
    let x = Object.entries(framesObject)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default);
    x.forEach( async (value, index) => {
        x[index] = await Assets.load(value);
    })
    return x;
}

// Character class
export class Character {
    constructor(newName, pixiRef){

        // Character movement and location data
        this.position = {
            x: 240,
            y: 350,
            verticalVelocity: 0,
            direction: 1,
        };
        this.speed = 1
        this.jumpForce = -10
        this.gravity = .5

        // Texture data
        this.Textures = {}

        // Character State data
        this.states = {
            idle: 0,
            walking: 1,
            dancing: 2,
            sleeping: 3,
            jumping: 4
        };
        this.stateHasChanged = false
        this.state = 0;

        // misc
        this.name = newName;
        this.mouseIsOver = false;

        // Change of state logic call back
        setInterval(() => {
            const change = Math.round(Math.random()*10)
            switch (this.state){
                case 0:
                    if (change==1 || change==2){
                        this.state = this.states.dancing;
                        this.stateHasChanged = true
                    }else if (change>6 && change<=10){
                        this.state = this.states.walking;
                        this.stateHasChanged = true
                    }
                    break;
                case 1:
                    if (change==1 || change==2){
                        this.state = this.states.idle
                        this.stateHasChanged = true
                    }else if (change>7 && change<10){
                        this.flip()
                    }
                    break;
                case 2:
                    if (change > 5){
                        this.state = this.states.idle
                        this.stateHasChanged = true
                    }else if (change == 1 || change == 2){
                        this.state = this.states.walking
                        this.stateHasChanged = true
                    }
                case 3:
                    break;
                case 4:
                    break;

            }
        },2000)
        
        // Texture setup
        this.initTexture().then(() => {
            this.sprite = new AnimatedSprite(this.Textures.idle)
            this.sprite.play()
            this.sprite.animationSpeed = .05
            pixiRef.value.app.stage.addChild(this.sprite)
            this.sprite.anchor.set(0.5,0.5)

            pixiRef.value.app.ticker.add(() => {
                this.sprite.x = this.position.x
                this.sprite.y = this.position.y
                this.sprite.scale.x = -(this.position.direction)
            })
            pixiRef.value.app.ticker.add((delta) => {
                switch (this.state){
                    case 0:
                        if (this.stateHasChanged){
                            this.stateHasChanged = false;
                            this.sprite.textures = this.Textures.idle
                            this.sprite.play()
                        }
                        this.idle(delta)
                        break;
                    case 1:
                        if (this.stateHasChanged){
                            this.stateHasChanged = false;
                            this.sprite.textures = this.Textures.walking
                            this.sprite.play()
                        }
                        this.walking(delta)
                        break;
                    case 2:
                        if (this.stateHasChanged){
                            this.stateHasChanged = false;
                            this.sprite.textures = this.Textures.dancing
                            this.sprite.play()
                        }
                        this.dancing(delta)
                        break;
                    case 3:
                        if (this.stateHasChanged){
                            this.stateHasChanged = false;
                            this.sprite.textures = this.Textures.sleeping
                            this.sprite.play()
                        }
                        this.sleeping(delta)
                        break;
                    case 4:
                        this.jump(delta)
                        break;
                }
            })
        })
    }

    // This code sets the character up to begin the jumping animation
    startJump(){
        this.position.verticalVelocity = this.jumpForce
        this.state = this.states.jumping
        this.sprite.stop();
    }

    // This function handles the jumping and falling logic
    jump(delta){
        this.position.y += this.position.verticalVelocity*delta.deltaTime
        if (this.position.verticalVelocity < 5){
            this.position.verticalVelocity += this.gravity*delta.deltaTime
        }
        if (this.position.y >= 350){
            this.position.y = 350
            this.state = this.states.idle
            this.sprite.play()
            this.stateHasChanged = true
        }
    }

    // This function flips the character sprite over the y axsis
    flip(){
        if (this.position.direction > 0){
            this.position.direction = -1
        }else{
            this.position.direction = 1
        }
    }

    idle(){

    }

    walking(delta){
        this.move(delta)
    }

    dancing(){

    }

    sleeping(){

    }

    // This function handles the movment logic using delta time to ensure cross platform movment consistancy
    move(delta) {
        if (this.position.x-(this.sprite.width/2)<0){
            this.flip();
        }else if (this.position.x+(this.sprite.width/2)>480){
            this.flip();
        }
        this.position.x += (this.speed*(-this.position.direction))*delta.deltaTime // This line may need changes with new textures
    }

    // This function loads in all the textures into the textures object to be loaded into the animated sprite object
    async initTexture(){
         this.Textures.walking = walking
        this.Textures.idle = idle
        this.Textures.dancing = dancing
        // this.Textures.sleeping = await framesToArray()
    }
}