import Hero from "../components/Hero.js";
import About from "./About.js";
import Projects from "./Projects.js";
import Skills from "./Skills.js";
import Experience from "./Experience.js";
import Achievements from "./Achievements.js";
import Resume from "./Resume.js";
import Contact from "./Contact.js";
import Footer from "../components/Footer.js";

/**
 * Single-page composition of every section, in narrative order.
 */
export default function Home() {
  return `
  <main id="content">
    ${Hero()}
    ${About()}
    ${Projects()}
    ${Skills()}
    ${Experience()}
    ${Achievements()}
    ${Resume()}
    ${Contact()}
    ${Footer()}
  </main>`;
}
