import { Project, Scene3D, PhysicsLoader, THREE } from 'enable3d';

class MainScene extends Scene3D {
  box: any;
  cube: any;
  constructor() {
    //@ts-ignore
    super('MainScene');
  }

  init() {
    console.log('Init');
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  preload() {
    console.log('Preload');
  }

  create() {
    console.log('create');

    // Resize window.
    const resize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      this.renderer.setSize(newWidth, newHeight);
      //@ts-ignore
      this.camera.aspect = newWidth / newHeight;
      this.camera.updateProjectionMatrix();
    };

    window.onresize = resize;
    resize();

    // set up scene (light, ground, grid, sky, orbitControls)
    this.warpSpeed();

    // enable physics debug
    // this.physics.debug?.enable();

    // position camera
    this.camera.position.set(10, 10, 20);

    // blue box
    this.box = this.add.box({ y: 2, x: -2 }, { lambert: { color: 'deepskyblue' } });
    this.physics.add.existing(this.box, { mass: 1, collisionFlags: 2 });

    // pink box
    this.physics.add.box({ y: 5, x: 0 }, { lambert: { color: 'hotpink' } });

    // green sphere
    const sphere = this.add.sphere(
      { x: 0.2, y: 3, z: 0, radius: 0.8 },
      { lambert: { color: 0x00ff00, transparent: true, opacity: 0.9 } }
    );
    sphere.position.set(0.2, 6, 0);
    this.physics.add.existing(sphere, { mass: 1, collisionFlags: 2 });
    sphere.body.setFriction(0);

    const pos = [
      { y: 0, x: 1.01, z: 0 },
      { y: 1.01, x: 0, z: 0 },
      { y: 0, x: 0, z: 1.01 },
      { y: 0, x: 1.01, z: 1.01 },
      { y: 1.01, x: 0, z: 1.01 },
      { y: 1.01, x: 1.01, z: 1.01 },
    ];

    this.cube = this.add.box(
      {
        height: 1,
        width: 1,
        depth: 1,
        y: 10,
        x: 0,
        z: 0,
      },
      { lambert: { color: 'seagreen', transparent: true, opacity: 0.9 } }
    );
    pos.forEach((p) => {
      const childCube = this.add.box(
        {
          height: 1,
          width: 1,
          depth: 1,
          y: p.y,
          x: p.x,
          z: p.z,
        },
        { lambert: { color: 'seagreen', transparent: true, opacity: 0.9 } }
      );
      this.cube.add(childCube);
    });
    this.physics.add.existing(this.cube);
  }

  update() {
    this.box.rotation.x += 0.01;
    this.box.rotation.y += 0.01;
    this.box.body.needUpdate = true;
  }
}

PhysicsLoader('lib/ammo/kripken', () => new Project({ scenes: [MainScene], antialias: true }));
