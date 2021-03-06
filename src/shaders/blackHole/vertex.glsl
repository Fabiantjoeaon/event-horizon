
attribute vec3 customColor;
varying vec3 vColor;
void main() 
{
	vColor = customColor; 
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

	// option (1): draw particles at constant size on screen
	// gl_PointSize = size;
    // option (2): scale particles as objects in 3D space
	gl_PointSize = 3.0 * ( 300.0 / length( mvPosition.xyz ) );
	gl_Position = projectionMatrix * mvPosition;
}