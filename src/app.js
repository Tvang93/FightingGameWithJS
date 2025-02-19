const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const playerHealth = document.getElementById("playerHealth")
const enemyHealth = document.getElementById("enemyHealth")

canvas.width = 1024;
canvas.height = 576;

//fillRect fills in coords given
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;

//create new class that will be used as our players
class Sprite {
  constructor({ position, velocity, color, offset}) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
        position: {
            x: this.position.x,
            y: this.position.y
        },
        offset, //same as saying offset: offset
        width: 100,
        height: 50,
    }
    this.color = color;
    this.isAttacking
  }

  draw() {
    //fillStyle selects the style of the fill
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //this is where attackbox is drawn
    if(this.isAttacking){
        c.fillStyle = "green"
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }
  }

  update() {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if(this.position.y + this.height + this.velocity.y >= canvas.height){
        this.velocity.y = 0
    }else{
        this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
        this.isAttacking = false;
    }, 100);
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
  color: 'red',
  offset: {
    x: 0,
    y: 0
  }
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
    color: 'blue',
    offset: {
        x: -50,
        y: 0,
    }
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

function rectangularCollision({rect1, rect2}) {
   return (rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
   rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
   rect1.attackBox.position.y + rect1.attackBox.height >= rect2.attackBox.position.y &&
   rect1.attackBox.position.y <= rect2.position.y + rect2.height)
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

    //detect for collision
    if(rectangularCollision({rect1: player, rect2: enemy}) &&
        player.isAttacking){
        console.log("hit")
        player.isAttacking = false;
        enemyHealth.style.width = "20%"
    }

    //detect for collision
    if(rectangularCollision({rect1: enemy, rect2: player}) &&
        enemy.isAttacking){
        console.log("counter")
        enemy.isAttacking = false;
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
        case ' ':
            player.attack();
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
        case 'ArrowDown':
            enemy.attack();
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