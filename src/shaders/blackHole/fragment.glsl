
varying vec3 vColor;
uniform sampler2D texture;
uniform float time;

void main() 
{
		gl_FragColor = vec4( vColor, 1.0 ) * time;
		gl_FragColor = gl_FragColor * texture2D(texture, gl_PointCoord);
}