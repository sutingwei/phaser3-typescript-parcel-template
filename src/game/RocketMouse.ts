import Phaser from "phaser";
import AnimationKeys from "~/consts/AnimationKeys";
import TextureKeys from "~/consts/TextureKeys";

export default class RoekctMouse extends Phaser.GameObjects.Container
{
  private flames : Phaser.GameObjects.Sprite;
  private cursors : Phaser.Types.Input.Keyboard.CursorKeys;
  private mouse : Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number)
  {
    super(scene, x, y);

    this.mouse = scene.add.sprite(0, 0, TextureKeys.RocketMouse)
        .setOrigin(0.5, 1)
        .play(AnimationKeys.RocketMouseRun);
    
    this.flames = scene.add.sprite(-63, -15, TextureKeys.RocketMouse)
        .play(AnimationKeys.RocketFlamesOn);
    this.enableJetpack(false);

    this.add(this.flames);
    this.add(this.mouse);

    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.mouse.width, this.mouse.height);
    body.setOffset(this.mouse.width * -0.5, -this.mouse.height);

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  enableJetpack(enabled: boolean)
  {
    this.flames.setVisible(enabled);
  }

  preUpdate()
  {
    const body = this.body as Phaser.Physics.Arcade.Body;

    if (this.cursors.space?.isDown)
    {
      body.setAccelerationY(-600);
      this.enableJetpack(true);

      this.mouse.play(AnimationKeys.RocketMouseFly, true);
    }
    else
    {
      body.setAccelerationY(0);
      this.enableJetpack(false);
    }

    if (body.blocked.down)
    {
      this.mouse.play(AnimationKeys.RocketMouseRun, true);
    }
    else if (body.velocity.y > 0)
    {
      this.mouse.play(AnimationKeys.RocketMouseFall, true);
    }
  }
}