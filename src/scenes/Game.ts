import Phaser from "phaser";

export default class Game extends Phaser.Scene
{
  constructor()
  {
    super('game');
  }

  preload()
  {
    this.load.image('background', 'house/bg_repeat_340x640.png');

    this.load.atlas(
      'rocket-mouse',
      'characters/rocket-mouse.png',
      'characters/rocket-mouse.json'
    )
  }

  create()
  {
    this.anims.create({
      key: 'rocket-mouse-run',
      frames: this.anims.generateFrameNames('rocket-mouse', {
        start: 1,
        end: 4,
        prefix: 'rocketmouse_run',
        zeroPad: 2,
        suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    });

    // this.add.image(0, 0, 'background').setOrigin(0, 0);

    const width = this.scale.width;
    const height = this.scale.height;

    this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0, 0);

    this.add.sprite(
      width * 0.5,
      height * 0.5,
      'rocket-mouse',
      'rocketmouse_fly01.png'
    ).play('rocket-mouse-run');
  }
}