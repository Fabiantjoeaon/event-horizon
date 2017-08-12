
varying vec3 vColor; // colors associated to vertices; assigned by vertex shader
void main() 
{
	// calculates a color for the particle
	// gl_FragColor = vec4( vColor, 1.0 );
  gl_FragColor = vec4( 0.5, 0.0, 1.0, 1.0 );
	
}