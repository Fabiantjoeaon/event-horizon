
import {
    Vector3, 
    Points, 
    Geometry, 
    Color, 
    PointsMaterial,
    AdditiveBlending,
    VertexColors,
} from 'three';

import {MeshComponent} from 'whs';
import times from 'lodash/times';

export default class StarField extends MeshComponent {
    static defaults = {
        colors: [0xffffff],
        pointAmount: 5000,
        geometry: new Geometry(),
        material: new PointsMaterial({
            size: 0.1,
            blending: AdditiveBlending,
            opacity: 0.5,
            vertexColors: VertexColors, 
            depthTest: false, 
        })
    }

    constructor() {
        super();
    }

    generatePoint(i) {
        return new Vector3(
            // X
            Math.random() * 500 - 250,
            // Y
            Math.random() * 500 - 250,
            // Z
            Math.random() * 500 - 250
        );
    }

    generatePoints() {
        const {geometry, material, colors, pointAmount} =
            StarField.defaults;

        times(pointAmount, i => {
            geometry.colors.push(
                new Color(
                    colors[
                        Math.floor( Math.random() * colors.length )
                    ]   
                )
            )
            geometry.vertices.push(this.generatePoint(i));
        });
    }

    build() {
        this.generatePoints();
        const {geometry, material} = StarField.defaults;
        return new Points(
            geometry,
            material
        )
    }
}