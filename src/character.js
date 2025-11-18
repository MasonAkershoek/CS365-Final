// The getImg function will take in a character name and grab all of the image data for that character
// The file structure of the image data is important.
// <CharacterName>
//   |- Idle
//   |   |- ( idle<frame#>.png )
//   |- Walking
//   |   |- ( waling<frame#>.png )
//   |- etc...

import { Application,
  Graphics,
  Text,
  TextStyle,
  Assets,
  Sprite } from 'pixi.js'

  import glorbpng from "./assets/Glorb.png"

export class Character {
    constructor(newName, pixiRef){
        this.position = {
            x: 240,
            y: 350,
            direction: 1,
        };
        this.speed = 10
        this.states = {
            idle: 0,
            walking: 1,
            dancing: 2,
            sleeping: 3,
            sleepy: 4,
            hungry: 5,
        };
        this.state = 0;
        this.name = newName;
        this.mouseIsOver = false;

        this.initTexture().then(() => {
            pixiRef.value.app.stage.addChild(this.sprite)
            this.sprite.anchor.set(0.5,0.5)

            pixiRef.value.app.ticker.add(() => {
                this.sprite.x = this.position.x
                this.sprite.y = this.position.y
                this.sprite.scale.x = -(this.position.direction)
            })
        })
    }

    move() {
        this.position.x += this.speed*this.position.direction   
    }

    async initTexture(){
        const texture = await Assets.load(glorbpng)
        this.sprite = await new Sprite(texture)
    }

    update(){

    }

    draw(){

    }
}