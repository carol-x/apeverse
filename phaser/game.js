var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    pixelArt: true, 
    scene: {
        preload: preload,
        create: create, 
        update: update
    }
};

var game = new Phaser.Game(config);
var ape; 
var layer0; 
var layer1; 
var cursor; 

function preload ()
{
    this.load.image('tiles', 'assets/ground_tiles.png'); 
    this.load.tilemapTiledJSON('tilemap', 'assets/tiles.json');
}

function create ()
{
    // create the map
    map = this.make.tilemap({key: "tilemap"});
    const tileset = map.addTilesetImage("ground", "tiles");
    layer0 = map.createStaticLayer('basic_ground', tileset); 
    layer1 = map.createStaticLayer('special_ground', tileset);

    // game.impact.startSystem(Phaser.Physics.BOX2D);


    // create the player
    ape = this.add.sprite(600, 400, 'ape');
    // game.physics.box2d.enable(ape);
    // ape.body.fixedRotation = true;

    // scale up the map
    this.cameras.main.zoom = 3;
    // mount camera to player
    this.cameras.main.startFollow(ape);

    // cursor keys
    cursors = this.input.keyboard.createCursorKeys();

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 40,
        scale: { start: 0.5, end: 0 },
        blendMode: 'ADD'
    });

    emitter.startFollow(ape);
}

function update () 
{
    // ape.body.setZeroVelocity();
    var apeSpeed = 2; 

    if (cursors.left.isDown)
        {
        ape.x -= apeSpeed; 
        }
    else if (cursors.right.isDown)
        {
        ape.x += apeSpeed; 
        }

    if (cursors.up.isDown)
        {
        ape.y -= apeSpeed; 
        }
    else if (cursors.down.isDown)
        {
        ape.y += apeSpeed; 
        }
}