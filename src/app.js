const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

//fillRect fills in coords given
c.fillRect(0, 0, canvas.width, canvas.height)

//create new class that will be used as our players
class Sprite {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
    }

    draw() {
        //fillStyle selects the style of the fill
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 50, 150);
    }
}

//player is a new sprite as an object
const player = new Sprite({
    x: 0,
    y: 0
});

// must enact method for js to know
player.draw();

const enemy = new Sprite({
    x: 400,
    y: 100
})

enemy.draw()

//velocity tells velocity of object when animation loops


console.log(player)


function animate() {
    //window.requestAnimationFrame will rerender whatever parameter is passed
    window.requestAnimationFrame(animate)
}


//animate() will create an infinite loop