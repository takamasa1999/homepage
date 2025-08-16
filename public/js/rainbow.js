function applyRainbow() {
  document.querySelectorAll(".rainbow").forEach((el) => {
    const text = el.textContent;
    el.innerHTML = "";
    [...text].forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.color = randomColor(); // Generates a hex color
      el.appendChild(span);
    });
  });
}
