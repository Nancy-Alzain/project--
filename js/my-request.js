document.addEventListener("DOMContentLoaded", () => {
  const userType = localStorage.getItem("userType");
  const currentUserEmail = localStorage.getItem("tempEmail");

  if (!currentUserEmail || !userType) {
    alert("يجب تسجيل الدخول أولاً");
    window.location.href = "login.htm";
    return;
  }

  let allRequests = JSON.parse(localStorage.getItem("aidRequests")) || [];

  const myRequests = allRequests.filter(
    (req) => req.ownerEmail === currentUserEmail
  );

  const container = document.getElementById("my-requests-container");

  if (myRequests.length === 0) {
    container.innerHTML = "<p>لم تقم بإضافة أي طلبات بعد.</p>";
    return;
  }

  myRequests.forEach((request) => {
    const card = document.createElement("div");
    const isFinished = request.goal <= request.collected;
    const percentage = Math.min((request.collected / request.goal) * 100, 100);

    card.className = "request-card";
    card.setAttribute("data-status", isFinished ? "finished" : "pending");
    card.setAttribute("data-id", request.id); // نحتاج هذا للحذف والتعديل

    card.innerHTML = `
      <img src="${request.img}" alt="صورة الطلب">
      <div class="request-content">
        <div class="request-title">${request["card-title"]}</div>
        <div class="request-desc">${request["card-desc"]}</div>
        <div class="request-type">${request["card-category"]}</div>
        <div class="request-amount">تم جمع ${request.collected}$ من أصل ${
      request.goal
    }$</div>
        <div class="progress-bar">
          <div class="progress" style="width: ${percentage}%"></div>
        </div>
        <div class="request-status ${isFinished ? "finished" : "pending"}">
          الحالة: ${isFinished ? "منتهية" : "قيد الانتظار"}
        </div>
        <p><strong>التاريخ:</strong> ${request.date || "غير محدد"}</p>
      </div>
      <div class="request-actions">
        <button class="btn-view">عرض التفاصيل</button>
        <button class="btn-edit">تعديل</button>
        <button class="btn-delete">حذف</button>
      </div>
    `;

    container.appendChild(card);
  });

  const filterButtons = document.querySelectorAll(".filter-btn");
  document.querySelector('[data-filter="all"]')?.classList.add("active");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      const cards = document.querySelectorAll(".request-card");

      cards.forEach((card) => {
        const status = card.getAttribute("data-status");

        if (filter === "all" || status === filter) {
          card.classList.remove("hidden");
          card.classList.add("fade-in");
          setTimeout(() => card.classList.remove("fade-in"), 300);
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // زر عرض التفاصيل
  document.querySelectorAll(".btn-view").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = button.closest(".request-card");
      const requestId = card.getAttribute("data-id");
      const currentReq = myRequests.find((req) => req.id == requestId);

      if (currentReq) {
        localStorage.setItem("selectedRequest", JSON.stringify(currentReq));
        localStorage.setItem("viewSource", "needy");
        window.location.href = `request-details.html?id=${requestId}`;
      }
    });
  });

  // زر الحذف
  document.querySelectorAll(".btn-delete").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = button.closest(".request-card");
      const requestId = card.getAttribute("data-id");

      const confirmed = confirm("هل أنت متأكد من حذف هذه المساعدة؟");
      if (confirmed) {
        // حذف من localStorage
        allRequests = allRequests.filter((req) => req.id != requestId);
        localStorage.setItem("aidRequests", JSON.stringify(allRequests));

        // حذف من الصفحة
        card.remove();
      }
    });
  });

  // زر التعديل
  document.querySelectorAll(".btn-edit").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = button.closest(".request-card");
      const requestId = card.getAttribute("data-id");
      const currentReq = myRequests.find((req) => req.id == requestId);

      if (currentReq) {
        localStorage.setItem("selectedRequest", JSON.stringify(currentReq));
        localStorage.setItem("viewSource", "needy");
        window.location.href = `edit-request.htm?id=${requestId}`;
      }
    });
  });
});
