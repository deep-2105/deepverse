import * as THREE from "three";

/**
 * Magical floating particle field rendered with Three.js into #particles-canvas.
 * Golden embers + faint blue arcane dust drifting upward, reacting subtly to the mouse.
 * Returns a cleanup function.
 */
export function initParticles(canvasId = "particles-canvas") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return () => {};

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch (err) {
    // WebGL unavailable — degrade gracefully, CSS starfield remains
    console.warn("DeepVerse: WebGL unavailable, particles disabled.");
    canvas.style.display = "none";
    return () => {};
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 26;

  // Build two point clouds: warm embers + cool arcane dust
  const groups = [];

  function makeCloud(count, color, size, spread, speed) {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.6;
      phases[i] = Math.random() * Math.PI * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const sprite = makeGlowSprite(color);
    const mat = new THREE.PointsMaterial({
      size,
      map: sprite,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.9,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);
    groups.push({ points, positions, phases, speed, spread });
  }

  makeCloud(reduce ? 120 : 320, "#f5d27a", 0.5, 50, 0.6); // golden embers
  makeCloud(reduce ? 80 : 200, "#6ea8ff", 0.32, 56, 0.35); // arcane dust

  // Soft radial sprite texture
  function makeGlowSprite(color) {
    const s = 64;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const ctx = c.getContext("2d");
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, color);
    g.addColorStop(0.25, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2);
    ctx.fill();
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  // Pointer parallax
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  function onMove(e) {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }
  window.addEventListener("pointermove", onMove, { passive: true });

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  resize();
  window.addEventListener("resize", resize);

  const clock = new THREE.Clock();
  let raf;
  function tick() {
    const t = clock.getElapsedTime();
    const dt = Math.min(clock.getDelta(), 0.05);

    mouse.x += (mouse.tx - mouse.x) * 0.04;
    mouse.y += (mouse.ty - mouse.y) * 0.04;

    groups.forEach((grp, gi) => {
      const arr = grp.positions;
      for (let i = 0; i < arr.length; i += 3) {
        // drift upward + gentle horizontal sway
        arr[i + 1] += grp.speed * dt * (reduce ? 0.4 : 1);
        arr[i] += Math.sin(t * 0.4 + grp.phases[i / 3]) * 0.004;
        if (arr[i + 1] > grp.spread / 2) arr[i + 1] = -grp.spread / 2;
      }
      grp.points.geometry.attributes.position.needsUpdate = true;
      grp.points.rotation.z = t * 0.01 * (gi + 1);
    });

    camera.position.x += (mouse.x * 3 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y * 3 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }
  tick();

  return function cleanup() {
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("resize", resize);
    groups.forEach((g) => {
      g.points.geometry.dispose();
      g.points.material.map?.dispose();
      g.points.material.dispose();
    });
    renderer.dispose();
  };
}
