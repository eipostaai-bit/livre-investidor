const message = "Olá! Gostaria de entender qual plano da Livre Investidor faz sentido para mim.";
for (const link of document.querySelectorAll("[data-whatsapp]")) {
  const destination = new URL(link.href);
  destination.searchParams.set("text", message);
  link.href = destination.href;
}

if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.remove("awaiting");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 });

  for (const element of document.querySelectorAll(".reveal")) {
    if (element.getBoundingClientRect().top >= innerHeight) {
      element.classList.add("awaiting");
      observer.observe(element);
    }
  }
}

for (const row of document.querySelectorAll("[data-plan-row]")) {
  const track = row.querySelector(".plan-track");
  const controls = row.querySelector(".plan-controls");
  const previous = row.querySelector("[data-plan-prev]");
  const next = row.querySelector("[data-plan-next]");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  function updateControls() {
    previous.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  }

  function move(direction) {
    const step = track.children[1].offsetLeft - track.children[0].offsetLeft;
    const index = Math.round(track.scrollLeft / step) + direction;
    track.scrollTo({ left: index * step, behavior: reducedMotion.matches ? "instant" : "smooth" });
  }

  previous.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  track.addEventListener("scroll", updateControls, { passive: true });
  window.addEventListener("resize", updateControls);
  updateControls();
  controls.hidden = false;
}

