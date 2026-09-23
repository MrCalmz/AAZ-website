const AAZ_CONFIG = {
  whatsappNumber: "", // Replace with digits only, e.g. 2348012345678
  bookingFallback: "copy"
};

const $ = (selector, scope=document) => scope.querySelector(selector);
const $$ = (selector, scope=document) => [...scope.querySelectorAll(selector)];

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });

$$(".reveal").forEach(el => revealObserver.observe(el));

const header = $(".site-header");
const menu = $(".menu-toggle");
if (menu && header) {
  menu.addEventListener("click", () => {
    const open = header.classList.toggle("menu-open");
    menu.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });
  $$(".nav-links a", header).forEach(link => link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    menu.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }));
}

const form = $("#bookingForm");
if (form) {
  const status = $("#formStatus");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    const lines = [
      "AAZ GLOBAL LOGISTICS & AUTOS — BOOKING REQUEST",
      "",
      `Name: ${data.name || "Not provided"}`,
      `Phone / WhatsApp: ${data.phone || "Not provided"}`,
      `Service: ${data.service || "Not provided"}`,
      `Passengers: ${data.passengers || "Not provided"}`,
      `Pickup: ${data.pickup || "Not provided"}`,
      `Destination: ${data.destination || "Not provided"}`,
      `Date: ${data.date || "Not provided"}`,
      `Time: ${data.time || "Not provided"}`,
      `Notes: ${data.notes || "None"}`
    ];
    const message = lines.join("\n");

    if (AAZ_CONFIG.whatsappNumber) {
      const url = "https://wa.me/" + AAZ_CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message);
      window.open(url, "_blank", "noopener,noreferrer");
      status.textContent = "Opening WhatsApp with your booking request…";
      return;
    }

    try {
      await navigator.clipboard.writeText(message);
      status.textContent = "Booking request copied. Add the AAZ WhatsApp number in script.js to send requests directly.";
    } catch {
      window.prompt("Copy this booking request:", message);
      status.textContent = "Booking request prepared. Add the AAZ WhatsApp number in script.js for direct sending.";
    }
  });
}

const year = $("#year");
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (event) => {
    const target = $(link.getAttribute("href"));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
