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
