const loadNotifications = async () => {
  try {
    const res = await fetch("notifications.json");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const container = document.getElementById("content");
    console.log(data);

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

// Dark mode toggle
const toggleDarkMode = document.getElementById("toggleTheme");
const themeIcon = toggleDarkMode.querySelector("img");

toggleDarkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDardkMode = document.body.classList.contains("dark");

  if (isDardkMode) {
    themeIcon.src = "assets/sun-svgrepo-com.svg";
    themeIcon.alt = "Light mode";
  } else {
    themeIcon.src = "assets/moon-dark-theme-svgrepo-com.svg";
    themeIcon.alt = "Dark mode";
  }
});
