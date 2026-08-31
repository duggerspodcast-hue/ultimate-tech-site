import{r as e}from"./rolldown-runtime-S-ySWqyJ.js";import{i as t,r as n}from"./framework-CXnKph_e.js";import{t as r}from"./index-1xco2heP.js";var i=e(t(),1),a=n(),o=`
  uniform float time;
  varying vec3 vNormal;
  varying vec3 vPosition;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(
      dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)
    ));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(
      0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)),
      0.0
    );
    m = m * m;
    return 42.0 * dot(
      m * m,
      vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3))
    );
  }

  void main() {
    float displacement = snoise(position * 1.9 + time * 0.52) * 0.22;
    vec3 newPosition = position + normal * displacement;
    vNormal = normalize(normalMatrix * normal);
    vPosition = newPosition;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`,s=`
  uniform vec3 color;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDirection = normalize(vec3(-0.32, 0.62, 1.0));
    float diffuse = 0.28 + max(dot(normal, lightDirection), 0.0) * 0.72;
    float fresnel = pow(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 2.2);
    vec3 finalColor = color * diffuse + vec3(0.94, 0.89, 0.81) * fresnel * 0.34;
    gl_FragColor = vec4(finalColor, 0.82);
  }
`;function c(){let e=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let t=e.current;if(!t)return;let n=!1,i,a=async()=>{let e=await r(()=>import(`./three.module-Dh--ou1o.js`),[]);if(n)return;let a=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,c=window.matchMedia(`(max-width: 700px), (pointer: coarse)`).matches,l=new e.Scene,u=new e.PerspectiveCamera(62,1,.1,100);u.position.z=3.25;let d=new e.WebGLRenderer({alpha:!0,antialias:!c,powerPreference:`high-performance`});d.setClearColor(0,0),d.outputColorSpace=e.SRGBColorSpace,d.domElement.setAttribute(`aria-hidden`,`true`),t.appendChild(d.domElement);let f=new e.IcosahedronGeometry(1.16,t.clientWidth<620?4:5),p=new e.ShaderMaterial({fragmentShader:s,transparent:!0,uniforms:{color:{value:new e.Color(`#d69a61`)},time:{value:0}},vertexShader:o,wireframe:!0}),m=new e.Mesh(f,p);m.rotation.set(-.2,.16,-.08),l.add(m);let h=0,g=!0,_=!1,v=()=>{let e=Math.max(1,t.clientWidth),n=Math.max(1,t.clientHeight);u.aspect=e/n,u.updateProjectionMatrix(),d.setPixelRatio(Math.min(window.devicePixelRatio||1,e<620?1.2:1.65)),d.setSize(e,n,!1)},y=e=>{p.uniforms.time.value=e*34e-5,m.rotation.y+=55e-5,m.rotation.x+=22e-5,d.render(l,u)},b=e=>{!g||!_||(y(e),h=window.requestAnimationFrame(b))},x=()=>{_||a||(_=!0,h=window.requestAnimationFrame(b))},S=()=>{_=!1,window.cancelAnimationFrame(h)};v(),y(1800);let C=new ResizeObserver(v);C.observe(t);let w=new IntersectionObserver(([e])=>{e?.isIntersecting?x():S()},{threshold:.02});w.observe(t),i=()=>{g=!1,S(),C.disconnect(),w.disconnect(),f.dispose(),p.dispose(),d.dispose(),d.domElement.remove()}},c=new IntersectionObserver(([e])=>{e?.isIntersecting&&(c.disconnect(),a())},{rootMargin:`320px`});return c.observe(t),()=>{n=!0,c.disconnect(),i?.()}},[]),(0,a.jsx)(`div`,{ref:e,className:`anomalous-matter`,"aria-hidden":`true`})}export{c as AnomalousMatter};