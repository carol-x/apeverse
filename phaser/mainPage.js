require('@geckos.io/phaser-on-nodejs')
const Phaser = require('phaser')
var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

const FPS = 30
global.phaserOnNodeFPS = FPS // default is 60

class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }


    preload() {
        console.log("preload"); 
    }

    create() {
        console.log("works!"); 
    }
}

const config = {
    type: Phaser.HEADLESS,
    width: 1280,
    height: 720,
    banner: false,
    audio: false,
    scene: [MainScene],
    fps: {
        target: FPS
    },
    physics: {
        default: 'arcade',
        arcade: {
        gravity: { y: 300 }
        }
    }
}

// start the game
new Phaser.Game(config);
app.use(express.json());
server.listen(3000);
console.log('Express server started on port %s', server.address());