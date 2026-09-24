document.documentElement.classList.add("js");

const AAZ_CONFIG = {
  whatsappNumber: "2348034626665", // Digits only, e.g. 2348012345678
  quickWhatsAppMessage: "Hello AAZ Global Logistics Ventures & Autos, I would like to arrange a private chauffeur journey. Please let me know availability and what details you need from me.",
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const cleanWhatsAppNumber = () => AAZ_CONFIG.whatsappNumber.replace(/\D/g, "");
const whatsappUrl = (message) => {
  const number = cleanWhatsAppNumber();
  return number ? "https://wa.me/" + number + "?text=" + encodeURIComponent(message) : "";
};

const addWhatsAppQuickButton = () => {
  if (!AAZ_CONFIG.whatsappNumber || $(".whatsapp-quick")) return;
  const link = document.createElement("a");
  link.className = "whatsapp-quick";
  link.href = whatsappUrl(AAZ_CONFIG.quickWhatsAppMessage);
  link.setAttribute("aria-label", "Message AAZ Global Logistics Ventures & Autos on WhatsApp");
  link.innerHTML = '<span class="whatsapp-glyph" aria-hidden="true"></span><span>WhatsApp</span>';
  document.body.appendChild(link);
};

const addMobileMenuEnhancements = () => {
  const header = $(".site-header");
  const menu = $(".menu-toggle");
  const nav = $(".nav-links");
  if (!header || !menu || !nav || $(".mobile-menu-cta", nav)) return;

  const navCta = $(".nav-cta", header);
  const cta = document.createElement("a");
  cta.className = "mobile-menu-cta";
  cta.href = navCta?.getAttribute("href") || "contact.html#booking";
  cta.innerHTML = 'Request a Journey <span aria-hidden="true">→</span>';

  const note = document.createElement("span");
  note.className = "mobile-menu-note";
  note.textContent = "PRIVATE CHAUFFEUR SERVICE · ABUJA · NATIONWIDE";
  nav.append(cta, note);
};

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
  const setMenuState = (open) => {
    header.classList.toggle("menu-open", open);
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    document.body.classList.toggle("menu-open", open);
  };

  menu.addEventListener("click", () => {
    setMenuState(!header.classList.contains("menu-open"));
  });

  $$(".nav-links a", header).forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("menu-open")) {
      setMenuState(false);
      menu.focus();
    }
  });
}

const today = new Date();
const dateMin =
  today.getFullYear() +
  "-" +
  String(today.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(today.getDate()).padStart(2, "0");

$$('input[type="date"]').forEach((input) => {
  input.min = dateMin;
});

const bookingForm = $("#bookingForm");
if (bookingForm) {
  const status = $("#formStatus", bookingForm);

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const required = $$("[required]", bookingForm);
    let valid = true;

    required.forEach((field) => {
      const invalid = !String(field.value || "").trim();
      field.toggleAttribute("aria-invalid", invalid);
      if (invalid) valid = false;
    });

    if (!valid) {
      status.textContent = "Please complete the highlighted fields.";
      bookingForm.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(bookingForm).entries());
    const message = [
      "Hello AAZ Global Logistics Ventures & Autos.",
      "",
      "I would like to arrange a private chauffeur journey.",
      "",
      "Name: " + (data.name || "Not provided"),
      "Service: " + (data.service || "Not specified"),
      "Journey: " + (data.journey || "Not provided"),
      "Date: " + (data.date || "Not provided"),
      "Pickup time: " + (data.time || "Not provided"),
      "",
      "Please let me know availability and any follow-up details you need from me."
    ].join("\n");

    const url = whatsappUrl(message);
    if (url) {
      status.textContent = "Opening WhatsApp…";
      window.location.href = url;
      return;
    }

    status.textContent = "WhatsApp is not configured for this site yet.";
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

addMobileMenuEnhancements();
addWhatsAppQuickButton();

const year = $("#year");
if (year) year.textContent = new Date().getFullYear();
