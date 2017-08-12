import {
    Vector3, 
    Points, 
    BufferGeometry,
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
        pointAmount: 10000,
        radius: 25,
        geometry: new Geometry(),
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
        const {colors, pointAmount, geometry, material} =
            BlackHoleCircle.defaults;

        // this.position = new Vector3(0,0,-600);
        times(pointAmount, i => {
            geometry.colors.push(
                new Color(
                    colors[
                        Math.floor( Math.random() * colors.length )
                    ]   
                )
            )
            // material.uniforms.vPosition.value = this.generatePoint(i);
            geometry.vertices.push(this.generatePoint(i));
            
        });
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