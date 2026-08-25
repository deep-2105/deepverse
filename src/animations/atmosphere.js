const random = (min, max) => min + Math.random() * (max - min);

const traveler = `<svg viewBox="0 0 160 80" aria-hidden="true"><g fill="currentColor"><path d="M8 48h118" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M120 44q24-5 32 5-15 2-32 0z"/><path d="M61 43q8-22 27-19 10 3 12 13-4 18-25 25-16 2-14-19z"/><circle cx="82" cy="18" r="7"/><path d="M52 42Q30 46 14 61q21-3 42-13z"/><path d="M78 25l-8-13 15 5z"/></g></svg>`;

export function initAtmosphere() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;
  if (reduce || mobile) return () => {};

  const layer = document.createElement("div");
  layer.className = "light-atmosphere";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);

  let travelerTimer;
  let stormTimer;
  let travelerExitTimer;
  let stormExitTimer;
  let travelerElement = null;
  let stopped = false;

  function scheduleTraveler() {
    travelerTimer = window.setTimeout(() => {
      if (stopped || document.hidden) return scheduleTraveler();
      travelerElement = document.createElement("div");
      travelerElement.className = "light-traveler";
      travelerElement.innerHTML = traveler;
      travelerElement.style.top = `${random(18, 66)}%`;
      travelerElement.style.setProperty("--flight-duration", `${random(5, 9)}s`);
      travelerElement.style.setProperty("--flight-offset", `${random(-10, 10)}vh`);
      travelerElement.classList.toggle("is-reversed", Math.random() > 0.5);
      layer.appendChild(travelerElement);
      travelerExitTimer = window.setTimeout(() => {
        travelerExitTimer = null;
        travelerElement?.remove();
        travelerElement = null;
        if (!stopped) scheduleTraveler();
      }, 9500);
    }, random(12000, 20000));
  }

  function scheduleStorm() {
    stormTimer = window.setTimeout(() => {
      if (stopped || document.hidden) return scheduleStorm();
      layer.classList.add("is-storm");
      stormExitTimer = window.setTimeout(() => {
        stormExitTimer = null;
        layer.classList.remove("is-storm");
        if (!stopped) scheduleStorm();
      }, 260);
    }, random(20000, 60000));
  }

  const onVisibility = () => {
    if (document.hidden) {
      window.clearTimeout(travelerTimer);
      window.clearTimeout(stormTimer);
      travelerTimer = null;
      stormTimer = null;
    } else if (!travelerElement && !travelerTimer) scheduleTraveler();
    if (!document.hidden && !stormTimer) scheduleStorm();
  };

  document.addEventListener("visibilitychange", onVisibility);
  scheduleTraveler();
  scheduleStorm();

  return () => {
    stopped = true;
    window.clearTimeout(travelerTimer);
    window.clearTimeout(stormTimer);
    window.clearTimeout(travelerExitTimer);
    window.clearTimeout(stormExitTimer);
    travelerElement?.remove();
    document.removeEventListener("visibilitychange", onVisibility);
    layer.remove();
  };
}
