document.addEventListener("DOMContentLoaded", () => {
  const REQUESTS_KEY = "aidRequests"; // 👈 المفتاح الموحد

  let allRequests = JSON.parse(localStorage.getItem(REQUESTS_KEY)) || [];

  const container = document.getElementById("cards-container");

  // لتنسيق المبلغ
  function formatCurrency(amount) {
    if (amount < 1000) {
      return "$" + amount;
    } else {
      return "$" + amount.toLocaleString("en-US");
    }
  }
  // لانشاء الكارد
  function createCard(data) {
    const card = document.createElement("div");
    card.classList.add("card");
    // card.className = "help-card";
    card.id = data.id; // ← هنا لازم تكون موجودة
    card.setAttribute("data-category", data["card-category"]);

    card.innerHTML = `
      <img src="${data.img}" alt="${data["card-title"]}">
      <div class="badge ${data.type}">${data.status}</div>
      <div class="card-body">
        <div class="card-title">${data["card-title"]}</div>
        <div class="card-desc">${data["card-desc"]}</div>
        <div class="card-category">${data["card-category"]}</div>
        <div class="progress-bar">
          <div class="progress-bar-fill" style="width: ${Math.min(
            (data.collected / data.goal) * 100,
            100
          )}%;"></div>
        </div>
        <div class="progress-text">${formatCurrency(
          data.collected
        )} / ${formatCurrency(data.goal)} دولار</div>
      </div>
    `;
    // عند الضغط على الكادر
    card.addEventListener("click", () => {
      if (card.id) {
        // تحقق من وجود id
        localStorage.setItem("selectedRequest", JSON.stringify(data));
        localStorage.setItem("viewSource", "donor");
        window.location.href = `help-details.html?id=${card.id}`;
      } else {
        console.error("Error: Card ID is missing or invalid.");
      }
    });

    container.appendChild(card);
  }

  allRequests.forEach((card) => createCard(card));
});

// دالة الفلترة
function filterCards(category) {
  const allCards = document.querySelectorAll(".card");

  allCards.forEach((card) => {
    if (category === "all" || card.getAttribute("data-category") === category) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });

  // تحديث الزر النشط
  document
    .querySelectorAll(".filters button")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelector(`.filters button[onclick*="${category}"]`)
    .classList.add("active");
}
