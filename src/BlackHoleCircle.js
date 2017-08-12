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
    TextureLoader
} from 'three';
import {MeshComponent} from 'whs';
import times from 'lodash/times';

import {randomFloatInRange, normalizeOneZero, normalizeInRange} from './helpers/MathHelper';
import blackHoleVertexShader from './shaders/blackHole/vertex.glsl';
import blackHoleFragmentShader from './shaders/blackHole/fragment.glsl';

export default class BlackHoleCircle extends MeshComponent {
    static defaults = {
        colorsArray: [
            [
                .768,
                .47,
                .81
            ],
            [
                .8,
                .70,
                .80
            ],
            [   
                700,
                0.8,
                0.734
            ],
            [
                880,
                .81,
                .67
            ],
            [
                0,
                0,
                .73
            ]
        ],
        particles: 10000,
        radius: 25,
        geometry: new BufferGeometry(),
        material: new ShaderMaterial({
            vertexShader: blackHoleVertexShader,
            fragmentShader: blackHoleFragmentShader,
            uniforms: {
                // time: window.customUniforms.time,
                texture: {
                    value: new TextureLoader().load( './assets/spark1.png')
                }
            },
            blending: AdditiveBlending,
            depthTest:      false,
            transparent:    true
        })
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
        const {colorsArray,particles, geometry, material, radius} =
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

            color.setHSL(
                ...colorsArray[Math.floor(Math.random()*colorsArray.length)]
            );

            colors[i3 + 0] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            sizes[i] = 10;
        }

        // HINT: Set attributes to that these are accesible inside shaders
        geometry.addAttribute('position', new BufferAttribute(positions, 3));
        geometry.addAttribute('customColor', new BufferAttribute(colors, 3));
        geometry.addAttribute('size', new BufferAttribute(sizes, 1));
    }
    //TODO: rotate point around own axis function
    build() {
        this.generatePoints();
        const {geometry, material} = BlackHoleCircle.defaults;
        material.uniforms.time = window.customUniforms.time;
        return new Points(
            geometry,
            material
        );
    }
}