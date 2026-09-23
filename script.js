document.documentElement.classList.add("js");

const AAZ_CONFIG = {
  whatsappNumber: "", // Digits only, e.g. 2348012345678
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -20px 0px" })
  : null;

if (revealObserver) $$(".reveal").forEach((el) => revealObserver.observe(el));
else $$(".reveal").forEach((el) => el.classList.add("is-visible"));

const header = $(".site-header");
const menu = $(".menu-toggle");
if (header && menu) {
  menu.addEventListener("click", () => {
    const open = header.classList.toggle("menu-open");
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    document.body.classList.toggle("menu-open", open);
  });
  $$(".nav-links a", header).forEach((link) => link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
  }));
}

const today = new Date();
const dateMin = today.getFullYear() + "-" + String(today.getMonth()+1).padStart(2,"0") + "-" + String(today.getDate()).padStart(2,"0");
$$('input[type="date"]').forEach((input) => input.min = dateMin);

const bookingForm = $("#bookingForm");
if (bookingForm) {
  const status = $("#formStatus", bookingForm);
  const markField = (field, invalid) => invalid ? field.setAttribute("aria-invalid","true") : field.removeAttribute("aria-invalid");

  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const required = $$("[required]", bookingForm);
    let valid = true;
    required.forEach((field) => {
      const invalid = !String(field.value || "").trim();
      markField(field, invalid);
      if (invalid) valid = false;
    });

    if (!valid) {
      status.textContent = "Please complete the highlighted fields before preparing your request.";
      bookingForm.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(bookingForm).entries());
    const message = [
      "AAZ GLOBAL LOGISTICS & AUTOS — BOOKING REQUEST",
      "",
      "Name: " + (data.name || "Not provided"),
      "Phone / WhatsApp: " + (data.phone || "Not provided"),
      "Service: " + (data.service || "Not provided"),
      "Passengers: " + (data.passengers || "Not provided"),
      "Pickup: " + (data.pickup || "Not provided"),
      "Destination: " + (data.destination || "Not provided"),
      "Date: " + (data.date || "Not provided"),
      "Time: " + (data.time || "Not provided"),
      "Notes: " + (data.notes || "None")
    ].join("\n");

    if (AAZ_CONFIG.whatsappNumber) {
      const clean = AAZ_CONFIG.whatsappNumber.replace(/\D/g, "");
      window.open("https://wa.me/" + clean + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
      status.textContent = "Opening WhatsApp with your booking request…";
      return;
    }

    try {
      await navigator.clipboard.writeText(message);
      status.textContent = "Booking request copied. Add the AAZ WhatsApp number in script.js to enable one-tap sending.";
    } catch {
      window.prompt("Copy this booking request:", message);
      status.textContent = "Booking request prepared. Add the AAZ WhatsApp number in script.js to enable one-tap sending.";
    }
  });
}

$$('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = $(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  });
});

const year = $("#year");
if (year) year.textContent = new Date().getFullYear();
