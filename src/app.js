const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

//fillRect fills in coords given
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;

//create new class that will be used as our players
class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.lastKey;
  }

  draw() {
    //fillStyle selects the style of the fill
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 50, 150);
  }

  update() {
    this.draw();
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if(this.position.y + this.height + this.velocity.y >= canvas.height){
        this.velocity.y = 0
    }else{
        this.velocity.y += gravity;
    }
  }
}


//player is a new sprite as an object
const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

// player.draw();
// must enact method for js to know

const enemy = new Sprite({
    position: {
      x: 400,
      y: 100,
    },
    velocity: {
      x: 0,
      y: 0,
    },
  });

// enemy.draw();

//velocity tells velocity of object when animation loops

console.log(player);

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    
}

function animate() {
  //window.requestAnimationFrame will rerender whatever parameter is passed
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();


  player.velocity.x = 0;
  enemy.velocity.x = 0;

    //player movement
    if(keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -3;
    }else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 3;
    }

    //enemy movement
    if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 3;
    }else if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -3;
    }


}

//animate() will create an infinite loop
animate()


window.addEventListener('keydown', (e) => {
    switch(e.key){
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd'
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a'
            break;
        case 'w':
            player.velocity.y = -16;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft'
            break;
        case 'ArrowUp':
            enemy.velocity.y = -16;
            break;
    }
})


window.addEventListener('keyup', (e) => {
    //player movement
    switch(e.key){
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }

    //enemy movment
    switch(e.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }


})