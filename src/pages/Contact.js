import { icon } from "../utils/svg.js";
import { profile } from "../utils/data.js";

export default function Contact() {
  const links = [
    { icon: "mail", label: profile.email, sub: "Email", href: `mailto:${profile.email}` },
    { icon: "phone", label: profile.phone, sub: "Phone", href: `tel:${profile.phone.replace(/[^+\d]/g, "")}` },
    { icon: "map", label: profile.location, sub: "Location", href: "#contact" },
  ]
    .map(
      (l) => `
      <a class="contact__link" href="${l.href}">
        ${icon(l.icon)}
        <div><b>${l.label}</b><span>${l.sub}</span></div>
      </a>`
    )
    .join("");

  return `
  <section class="section contact" id="contact">
    <canvas class="contact__spell" id="contact-spell" aria-hidden="true"></canvas>
    <div class="section-head">
      <span class="eyebrow">The Final Act</span>
      <h2 class="section-title gold-text">Summon Me</h2>
      <p class="section-sub">Have a story worth telling? Let's build something cinematic together.</p>
    </div>

    <div class="contact__grid">
      <div class="contact__intro reveal">
        <p>Send an owl, a signal, or a message in a bottle — I read them all and reply within a day.</p>
        <div class="contact__links">${links}</div>
      </div>

      <form class="form glass reveal" id="contact-form" novalidate>
        <div>
          <label for="cf-name">Your Name</label>
          <input id="cf-name" name="name" type="text" placeholder="Albus Dumbledore" required />
        </div>
        <div>
          <label for="cf-email">Your Email</label>
          <input id="cf-email" name="email" type="email" placeholder="you@realm.dev" required />
        </div>
        <div>
          <label for="cf-msg">The Message</label>
          <textarea id="cf-msg" name="message" placeholder="Tell me about your quest..." required></textarea>
        </div>
        <button type="submit" class="btn btn--gold">✦ Send the Owl</button>
        <p class="form__note" id="cf-note">Encrypted by moonlight. No spam, ever.</p>
      </form>
    </div>
  </section>`;
}
