const loadNotifications = async () => {
  try {
    const res = await fetch("notifications.json");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const container = document.getElementById("content");

    data.forEach((notif) => {
      const div = document.createElement("div");
      div.className = "content";
      div.innerHTML = `
          <img src="${notif.avatar}" alt="${notif.username}'s avatar">
          <div class="title-content">
            <p>
              <a href="#" class="username">${notif.username}</a>
              ${notif.action}
              ${
                notif.target
                  ? `<a href="#" class="desc desc-text"> ${notif.target}</a>`
                  : ""
              }
            </p>
            <span class="timestamp">${notif.time}</span>
            ${
              notif.message ? `<div class="message">${notif.message}</div>` : ""
            }
          </div>
        `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Failed to load notifications:", error);
  }
};

loadNotifications();

// dark mode toggle

const toggleDarkMode = document.getElementById("toggleTheme");
const themeIcon = toggleDarkMode.querySelector("img");

// Fungsi untuk update icon sesuai mode
function updateThemeIcon(isDark) {
  themeIcon.src = isDark
    ? "assets/sun-svgrepo-com.svg"
    : "assets/moon-dark-theme-svgrepo-com.svg";
  themeIcon.alt = isDark ? "Light mode" : "Dark mode";
}

// Saat halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", () => {
  const darkModeFromStorage = localStorage.getItem("darkMode") === "true";

  if (darkModeFromStorage) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  updateThemeIcon(darkModeFromStorage);
});

toggleDarkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDarkMode = document.body.classList.contains("dark");

  themeIcon.src = isDarkMode
    ? "assets/sun-svgrepo-com.svg"
    : "assets/moon-dark-theme-svgrepo-com.svg";

  themeIcon.alt = isDarkMode ? "Light mode" : "Dark mode";
});
