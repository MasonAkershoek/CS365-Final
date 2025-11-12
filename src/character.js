// The getImg function will take in a character name and grab all of the image data for that character
// The file structure of the image data is important.
// <CharacterName>
//   |- Idle
//   |   |- ( idle<frame#>.png )
//   |- Walking
//   |   |- ( waling<frame#>.png )
//   |- etc...

function getImg(characterType){

}

export class Character {
    constructor(characterType, newName){
        this.Img = getImg(characterType);
        this.position = {
            x: 0,
            y: 0,
            direction: 0,
        };
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
        this. stats = {
            hunger: 100,
            sleep: 100,
            clean: 100,
            happy: 100,
            level: 1,
        }
        this.mouseIsOver = false;
    }

    checkMouseHover(){
        
    }

    update(){

    }

    draw(){

    }
}