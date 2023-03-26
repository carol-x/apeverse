// smart contract setup 
// window.ethereum.enable();

// game setup 
var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    pixelArt: true, 
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create, 
        update: update
    }
};

var game = new Phaser.Game(config);
var ape; 
var banana; 
var layer0; 
var layer1; 
var cursor; 
var scoreText;
var bananaCount = 0; 

function preload ()
{
    this.load.image('tiles', 'assets/ground_tiles.png'); 
    this.load.image('banana', 'assets/banana.png'); 
    this.load.image('star', 'assets/star.png'); 
    this.load.tilemapTiledJSON('tilemap', 'assets/tiles.json');
    this.load.spritesheet('ape', 'assets/ape_sprite.png', { frameWidth: 1262, frameHeight: 1262 });
}

function create ()
{
    // create the map
    map = this.make.tilemap({key: "tilemap"});
    const tileset = map.addTilesetImage("ground", "tiles");
    layer0 = map.createStaticLayer('basic_ground', tileset); 
    layer1 = map.createStaticLayer('special_ground', tileset);

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 70,
        scale: { start: 0.5, end: 0 },
        blendMode: 'ADD'
    });

    // create the player
    ape = this.physics.add.sprite(600, 400, 'ape');
    ape.setScale(0.05);
    ape.setCollideWorldBounds(true);

    var frames = this.anims.generateFrameNumbers('ape')
        //create animation from sprites
        this.anims.create({
            key: 'right',
            frames: frames,
            frameRate: 5,
            repeat: -1
        });
    ape.play('right');
    emitter.startFollow(ape);

    // scale up the map
    this.cameras.main.zoom = 3;
    // mount camera to player
    this.cameras.main.startFollow(ape);

    // create a group of bananas
    var banana = this.physics.add.group({
        key: 'banana',
        repeat: 10, 
        setScale: { x: 0.03, y: 0.03},
        setXY: {x: 0, y: 0, stepX: 75, stepY: 75}
    });

    this.physics.add.overlap(ape, banana, farmBanana, null, this);

    // cursor keys
    cursors = this.input.keyboard.createCursorKeys();

    scoreText = this.add.text(400, 400, 'Collect some bananas!', { fontSize: '12px', fill: '#000' });
    
    // add button 
    redeemButton = this.add.text(this.cameras.main.centerX-150, this.cameras.main.centerY-100, 'Redeem Bananas')
        .setOrigin(0.5)
        .setPadding(5)
        .setStyle({ backgroundColor: '#119' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', farmBanana)
        .on('pointerover', () => redeemButton.setStyle({ fill: '#f39c12' }))
        .on('pointerout', () => redeemButton.setStyle({ fill: '#FFF' }))

    swapButton = this.add.text(this.cameras.main.centerX-150, this.cameras.main.centerY-150, 'Swap Tokens')
        .setOrigin(0.5)
        .setPadding(5)
        .setStyle({ backgroundColor: '#119' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', farmBanana)
        .on('pointerover', () => swapButton.setStyle({ fill: '#f39c12' }))
        .on('pointerout', () => swapButton.setStyle({ fill: '#FFF' }))
    governanceButton = this.add.text(this.cameras.main.centerX-150, this.cameras.main.centerY-200, 'Vote Proposals')
        .setOrigin(0.5)
        .setPadding(5)
        .setStyle({ backgroundColor: '#119' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', farmBanana)
        .on('pointerover', () => governanceButton.setStyle({ fill: '#f39c12' }))
        .on('pointerout', () => governanceButton.setStyle({ fill: '#FFF' }))
}

function update () 
{
    var apeSpeed = 2; 

    if (cursors.left.isDown)
        {
        ape.x -= apeSpeed; 
        ape.flipX = true;
        }
    else if (cursors.right.isDown)
        {
        ape.x += apeSpeed; 
        ape.flipX = false;
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

function farmBanana (ape, banana)
{
    banana.disableBody(true, true);
    bananaCount += 1;
    scoreText.setText('#BANANA: ' + bananaCount);

}

function openWindow() {
    console.log("open window");
  
}

function closeWindow() {
    console.log("close window");

}
