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
            verticalVelocity: 0,
            direction: 1,
        };
        this.speed = .3
        this.states = {
            idle: 0,
            walking: 1,
            dancing: 2,
            sleeping: 3,
            jumping: 4
        };
        this.state = 0;
        this.name = newName;
        this.mouseIsOver = false;

        setInterval(() => {
            const change = Math.round(Math.random()*10)
            switch (this.state){
                case 0:
                    if (change==1 || change==2){
                        // this.state = this.states.dancing;
                    }else if (change>6 && change<=10){
                        this.state = this.states.walking;
                    }
                    break;
                case 1:
                    if (change==1 || change==2){
                        this.state = this.states.idle
                    }else if (change>7 && change<10){
                        this.flip()
                    }
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;

            }
        },2000)

        this.initTexture().then(() => {
            pixiRef.value.app.stage.addChild(this.sprite)
            this.sprite.anchor.set(0.5,0.5)

            pixiRef.value.app.ticker.add(() => {
                this.sprite.x = this.position.x
                this.sprite.y = this.position.y
                this.sprite.scale.x = -(this.position.direction)
            })
            pixiRef.value.app.ticker.add(() => {
                switch (this.state){
                    case 0:
                        this.idle()
                        break;
                    case 1:
                        this.walking()
                        break;
                    case 2:
                        this.dancing()
                        break;
                    case 3:
                        this.sleeping()
                        break;
                    case 4:
                        this.jump()
                        break;
                }
            })
        })
    }

    startJump(){
        this.position.verticalVelocity = -5
        this.state = this.states.jumping
    }

    jump(){
        this.position.y += this.position.verticalVelocity
        if (this.position.verticalVelocity < 5){
            this.position.verticalVelocity += .05
        }
        if (this.position.y >= 350){
            this.position.y = 350
            this.state = this.states.idle
        }
    }

    flip(){
        if (this.position.direction > 0){
            this.position.direction = -1
        }else{
            this.position.direction = 1
        }
    }

    idle(){

    }

    walking(){
        this.move()
    }

    dancing(){

    }

    sleeping(){

    }

    move() {
        if (this.position.x-(this.sprite.width/2)<0){
            this.flip();
        }else if (this.position.x+(this.sprite.width/2)>480){
            this.flip();
        }
        this.position.x += this.speed*this.position.direction   
    }

    async initTexture(){
        const texture = await Assets.load(glorbpng)
        this.sprite = await new Sprite(texture)
    }
}