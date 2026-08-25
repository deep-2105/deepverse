import { profile, projects, skills, education } from "../utils/data.js";

function answer(question) {
  const q = question.toLowerCase();
  if (q.includes("attendx")) return projects.find((project) => project.name === "AttendX")?.desc || "AttendX is in the project archive.";
  if (q.includes("blindside")) return projects.find((project) => project.name === "BlindSide")?.desc || "BlindSide is in the project archive.";
  if (q.includes("study") || q.includes("education")) return `${education[0].role} at ${education[0].org}.`;
  if (q.includes("technology") || q.includes("tech") || q.includes("skill")) return skills.map((skill) => skill.items).join("; ");
  if (q.includes("contact") || q.includes("reach")) return `You can reach Deep at ${profile.email} or ${profile.phone}.`;
  if (q.includes("who") || q.includes("deep")) return `${profile.alias} is a ${profile.role}.`;
  if (q.includes("built") || q.includes("project")) return projects.map((project) => project.name).join(", ") + ".";
  return "Ask me about Deep Sharma, projects, technologies, education, or contact details.";
}

export function initLumos(root) {
  if (!root) return;
  const form = root.querySelector("form");
  const input = root.querySelector("input");
  const output = root.querySelector("[data-lumos-output]");
  form.addEventListener("submit", (event) => { event.preventDefault(); output.textContent = answer(input.value); input.value = ""; });
}
