
import {
    App,
    ElementModule,
    SceneModule,
    DefineModule,
    PerspectiveCamera,
    RenderingModule,
    ResizeModule,
    Loop,
    Circle,
    AmbientLight,
    VirtualMouseModule
} from 'whs';

import times from 'lodash/times';

import { Vector3, MeshBasicMaterial} from 'three';

import TweenMax from 'gsap';
import {randomFloatInRange} from './helpers/MathHelper';

import BlackHoleCircle from './BlackHoleCircle';
import StarField from './StarField';

const camera = new PerspectiveCamera({
        z: 45,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 10000,
        position: new Vector3(0,0,50),
    });

const mouse = new VirtualMouseModule();

const app = new App([
    new ElementModule(),
    new SceneModule(),

    new DefineModule('camera', camera),
    new RenderingModule({
        antialias: true,
        preserveDrawingBuffer: true,
        bgColor: 0x000000
    }),
    mouse,
    new ResizeModule()
]);

// TODO: Extend Shape??
// TODO: custom attributes, like random color for each particle, can only be assigned to buffergeometries, like part. cloud link under here
//https://threejs.org/examples/webgl_buffergeometry_custom_attributes_particles.html

const blackHole = new BlackHoleCircle();
const starField = new StarField();
const eventHorizon = new Circle({
    geometry: {
        radius: BlackHoleCircle.defaults.radius - 9,
        segments: 60
    },
    // TODO: Write shader for event horizon
    material: new MeshBasicMaterial({
        color: 0x000000
    }),
    
    position: [
        blackHole.position.x,
        blackHole.position.y,
        blackHole.position.z - 2,
    ]
});
const ambientLight = new AmbientLight({
  light: {
    intensity: 0.8
  }
});

//TODO: Move to back but position light
blackHole.position.set(0,0,-30);
ambientLight.addTo(app);
blackHole.addTo(app);
starField.addTo(app);
eventHorizon.addTo(app)

const loop = new Loop(clock => {
    const intersects = mouse.intersection(blackHole);

    times(intersects.length, (i) => {
        const point = blackHole.geometry.vertices[
            intersects[i].index
        ];
        TweenMax.to(point, 1.6, { 
            x: point.x + randomFloatInRange(0, 5), 
            y: point.y + randomFloatInRange(0, 5), 
            z: point.z + randomFloatInRange(0, 5),
            // ease: SlowMo.ease.config(0.5, 0.3, false), 
            // ease: Elastic.easeOut.config(1, 0.3),
            ease: Power4.easeOut,
            repeat: 1,
            yoyo: true
        });
    });
    
    const rotateX = mouse.mouse.y / 500;
    const rotateY = mouse.mouse.x / 500;
    camera.rotation.x += rotateX;
    camera.rotation.y -= rotateY;
    
    blackHole.rotation.z += 0.0016;  
    blackHole.geometry.verticesNeedUpdate = true;
});

loop.start(app);
app.start();