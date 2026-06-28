/**
 * Adaptive WebAudio ambient + cinematic SFX engine. No asset files; everything
 * is procedurally synthesised (original/royalty-free). A control cluster gives
 * a Mute button, Ambient toggle, Effects toggle and a Volume slider. SFX use a
 * StereoPanner so each event sounds from its on-screen direction. Unlocks on
 * first gesture per autoplay rules.
 */
let SFX = null;

export function initSound() {
  const cluster = document.createElement("div");
  cluster.className = "sound-cluster";
  cluster.innerHTML = `
    <button class="sound-toggle" aria-label="Toggle sound"><div class="bars"><i></i><i></i><i></i><i></i></div></button>
    <div class="sound-panel">
      <label class="sp-row"><span>Ambient</span><input type="checkbox" data-amb checked></label>
      <label class="sp-row"><span>Effects</span><input type="checkbox" data-fx checked></label>
      <label class="sp-row"><span>Volume</span><input type="range" data-vol min="0" max="100" value="60"></label>
    </div>`;
  document.body.appendChild(cluster);
  const btn = cluster.querySelector(".sound-toggle");
  const ambBox = cluster.querySelector("[data-amb]");
  const fxBox = cluster.querySelector("[data-fx]");
  const vol = cluster.querySelector("[data-vol]");

  let ctx, master, ambGain, sfxGain, on = false, shimmerTimer, windTimer;
  let muted = true, ambOn = true, fxOn = true, level = 0.6;

  function build() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = level; master.connect(ctx.destination);
    ambGain = ctx.createGain(); ambGain.gain.value = 0; ambGain.connect(master);
    sfxGain = ctx.createGain(); sfxGain.gain.value = 0.55; sfxGain.connect(master);
    [55, 82.4, 110].forEach((f, i) => {
      const osc = ctx.createOscillator(), g = ctx.createGain();
      osc.type = i === 2 ? "triangle" : "sine"; osc.frequency.value = f; g.gain.value = 0.12;
      osc.connect(g).connect(ambGain); osc.start();
    });
    SFX = makeSfx(ctx, sfxGain, () => muted || !fxOn);
    wireUiSounds(); SFX.startup();
  }
  function shimmer() { if (!on || !ambOn) return; const o=ctx.createOscillator(),g=ctx.createGain(); o.type="sine"; o.frequency.value=660+Math.random()*660; g.gain.value=0; o.connect(g).connect(ambGain); const t=ctx.currentTime; g.gain.linearRampToValueAtTime(.05,t+.4); g.gain.linearRampToValueAtTime(0,t+2.4); o.start(t); o.stop(t+2.5); shimmerTimer=setTimeout(shimmer,3000+Math.random()*4000); }
  function wind() { if (!on || !ambOn || muted) return; SFX && SFX.wind(); windTimer = setTimeout(wind, 8000 + Math.random() * 12000); }

  btn.addEventListener("click", () => {
    if (!ctx) build(); if (ctx.state === "suspended") ctx.resume();
    on = !on; muted = !on; btn.classList.toggle("is-on", on); cluster.classList.toggle("is-open", on);
    ambGain.gain.linearRampToValueAtTime(on && ambOn ? 0.5 : 0, ctx.currentTime + 1.0);
    if (on) { shimmer(); wind(); } else { clearTimeout(shimmerTimer); clearTimeout(windTimer); }
  });
  ambBox.addEventListener("change", () => { ambOn = ambBox.checked; if (ctx) ambGain.gain.linearRampToValueAtTime(on && ambOn ? 0.5 : 0, ctx.currentTime + .5); if (ambOn && on) { shimmer(); wind(); } });
  fxBox.addEventListener("change", () => { fxOn = fxBox.checked; });
  vol.addEventListener("input", () => { level = vol.value / 100; if (ctx) master.gain.linearRampToValueAtTime(level, ctx.currentTime + .1); });

  return () => { clearTimeout(shimmerTimer); clearTimeout(windTimer); };
}

function makeSfx(ctx, bus, isMuted) {
  const out = (node, pan = 0) => { if (!pan) return node.connect(bus); const p = ctx.createStereoPanner(); p.pan.value = Math.max(-1, Math.min(1, pan)); node.connect(p).connect(bus); return p; };
  const tone = (freq, dur, type = "sine", vol = 0.12, slideTo, pan = 0) => {
    if (isMuted()) return; const o = ctx.createOscillator(), g = ctx.createGain(); o.type = type; const t = ctx.currentTime;
    o.frequency.setValueAtTime(freq, t); if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); out(g, pan); o.start(t); o.stop(t + dur + 0.02);
  };
  const noise = (dur, vol = 0.08, pan = 0) => {
    if (isMuted()) return; const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate); const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random()*2-1)*(1-i/d.length); const s = ctx.createBufferSource(); s.buffer = buf;
    const g = ctx.createGain(); g.gain.value = vol; s.connect(g); out(g, pan); s.start();
  };
  return {
    hover: () => tone(880, .08, "sine", .04, 1320), click: () => tone(440, .12, "triangle", .1, 660),
    sparkle: (p) => { tone(1200, .18, "sine", .06, 2400, p); setTimeout(()=>tone(1800,.12,"sine",.04,0,p),60); },
    portal: (p) => tone(120, .7, "sawtooth", .08, 900, p), whoosh: (p) => { noise(.5,.06,p); tone(300,.5,"sawtooth",.04,80,p); },
    thunder: () => noise(.9, .12), owl: (p) => { tone(520,.18,"sine",.07,380,p); setTimeout(()=>tone(480,.22,"sine",.06,340,p),200); },
    ravens: (p) => { [0,120,260,400].forEach(d=>setTimeout(()=>tone(900,.06,"square",.03,600,p),d)); },
    success: () => [523,659,784].forEach((f,i)=>setTimeout(()=>tone(f,.25,"triangle",.08),i*90)),
    download: () => [392,523].forEach((f,i)=>setTimeout(()=>tone(f,.2,"sine",.08),i*100)),
    startup: () => [330,494,659,880].forEach((f,i)=>setTimeout(()=>tone(f,.4,"triangle",.07),i*110)),
    swoosh: (p) => noise(.4, .05, p), wings: (p) => [0,120,240].forEach(d=>setTimeout(()=>noise(.12,.03,p),d)),
    dragon: (p) => tone(70, 1.1, "sawtooth", .07, 48, p), chime: (p) => [880,1320,1760].forEach((f,i)=>setTimeout(()=>tone(f,.3,"sine",.04,0,p),i*70)),
    comet: (p) => { tone(1600,.5,"sine",.05,200,p); noise(.4,.04,p); }, page: (p) => noise(.18,.03,p),
    lantern: (p) => tone(700,.4,"sine",.03,900,p), wind: () => noise(1.6,.05),
  };
}

export function sfx(name, pan = 0) { try { SFX && SFX[name] && SFX[name](pan); } catch {} }

function wireUiSounds() {
  document.querySelectorAll(".btn, .nav-link, .ecard, .eprow__nav button").forEach((el) => {
    el.addEventListener("pointerenter", () => sfx("hover"), { passive: true }); el.addEventListener("click", () => sfx("click"));
  });
  document.querySelectorAll("[data-resume]").forEach((b) => b.addEventListener("click", () => sfx("download")));
  document.querySelectorAll(".ecard[data-nav]").forEach((c) => c.addEventListener("click", () => sfx("portal")));
}
