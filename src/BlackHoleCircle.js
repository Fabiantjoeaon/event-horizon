import {
    Vector3, 
    Points, 
    BufferGeometry,
    BufferAttribute,
    Geometry, 
    Color, 
    PointsMaterial,
    ShaderMaterial,
    Mesh,
    AdditiveBlending,
    VertexColors,
} from 'three';
import {MeshComponent} from 'whs';
import times from 'lodash/times';

import {randomFloatInRange} from './helpers/MathHelper';
import blackHoleVertexShader from './shaders/blackHole/vertex.glsl';
import blackHoleFragmentShader from './shaders/blackHole/fragment.glsl';

export default class BlackHoleCircle extends MeshComponent {
    static defaults = {
        colors: [ 0x474fab, 0xff0080, 0x8000ff, 0x7e0d7b, 0x9d9d9d],
        particles: 10000,
        radius: 25,
        geometry: new BufferGeometry(),
        material: new ShaderMaterial({
            vertexShader: blackHoleVertexShader,
            fragmentShader: blackHoleFragmentShader
        }),
        // material: new PointsMaterial({
        //     size: 0.1,
        //     blending: AdditiveBlending,
        //     opacity: 0.5,
        //     vertexColors: VertexColors, 
        //     depthTest: false, 
        // })
    }
    constructor() {
        //FIXME: bind to this instead of statics
        super({});
    }

    generatePoint(i) {
        const {radius} = BlackHoleCircle.defaults;
        return new Vector3(
            // X
            radius * Math.sin((i) / (Math.PI * 2)),
            // Y
            radius * Math.cos((i) / (Math.PI * 2)),
            // Z
            randomFloatInRange(
                randomFloatInRange(0, 30),
                randomFloatInRange(0, 50)
            )
        );
    }

    generatePoints() {
        const {particles, geometry, material, radius} =
            BlackHoleCircle.defaults;

        const positions = new Float32Array(particles * 3);
        const colors = new Float32Array(particles * 3);
        const sizes = new Float32Array(particles);
        
        const color = new Color();

        // HINT: You need i3 to skip over 2 values, so that you can set xyz, and rgb
        // with a normal iterator it is not possible to skip,
        // and with i3 you can get the following array values with + 0, 1, and 2
        for ( let i = 0, i3 = 0; i < particles; i ++, i3 += 3 ) {
            positions[i3 + 0] = radius * Math.sin((i) / (Math.PI * 2));
            positions[i3 + 1] = radius * Math.cos((i) / (Math.PI * 2));
            positions[i3 + 2] = randomFloatInRange(
                randomFloatInRange(0, 30),
                randomFloatInRange(0, 50)
            );

            color.setHSL(i / particles, 1.0, 0.5);

            colors[i3 + 0] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            sizes[i] = 10;
        }

        // HINT: Set attributes to that these are accesible inside shaders
        geometry.addAttribute('position', new BufferAttribute(positions, 3));
        geometry.addAttribute('customColor', new BufferAttribute(positions, 3));
        geometry.addAttribute('size', new BufferAttribute(sizes, 1));
    }
    //TODO: rotate point around own axis function
    build() {
        this.generatePoints();
        const {geometry, material} = BlackHoleCircle.defaults;
        return new Points(
            geometry,
            material
        );
    }
}