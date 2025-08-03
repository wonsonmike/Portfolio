const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

function setTheme(theme) {
  if (theme === 'dark') {
    themeToggle.textContent = '☀️';
  } else {
    themeToggle.textContent = '🌙';
  }
  html.setAttribute("data-theme", theme);
  localStorage.setItem('theme', theme);
}

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
  setTheme(newTheme);
});

// Check localStorage for saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);


