document.addEventListener("DOMContentLoaded", () => {
  const userEmail = localStorage.getItem("tempEmail") || "";
  // userType = localStorage.getItem("userType");

  if (!userEmail || !localStorage.getItem("userType")) {
    alert("يجب تسجيل الدخول أولاً");
    window.location.href = "login.htm";
    // return;
  }
  const caseTitle = document.querySelector(".case-title");
  const collected = document.querySelector(".collected");
  const progress = document.querySelector(".progress");
  const statusBadge = document.querySelector(".status-badge");
  const caseImage = document.querySelector(".case-details img");

  const donateAgainBtn = document.querySelector(".donate");
  const shareBtn = document.querySelector(".btn.share");
  const modal = document.querySelector(".modal");
  const closeModal = document.querySelector(".modal .close");

  // جلب بيانات الحالة من التخزين
  const selectedCase = JSON.parse(localStorage.getItem("selectedRequest"));
  const donatedAmount = localStorage.getItem("donatedAmount") || 0;

  if (!selectedCase) {
    alert("حدث خطأ أثناء تحميل البيانات.");
    window.location.href = "availabeHelp.htm";
  }

  caseTitle.textContent = selectedCase["card-title"];
  collected.textContent = `$${selectedCase.collected} تم جمعه من أصل $${selectedCase.goal}`;
  progress.style.width = `${
    (selectedCase.collected / selectedCase.goal) * 100
  }%`;
  caseImage.src = selectedCase.img;
  statusBadge.classList.add(
    selectedCase.collected == selectedCase.goal ? "finished" : "pending"
  );
  statusBadge.textContent = selectedCase.status;

  // عند الضغط على زر "تبرع مرة أخرى"
  donateAgainBtn.addEventListener("click", () => {
    window.location.href = "../availabeHelp.htm"; // إعادة توجيه إلى صفحة المساعدات الحالية
  });
  // // عند النقر على ازار المواقع لمشاركة الحالة مع الاصدقاء
  // تهيئة روابط المشاركة
  const shareURL = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(
    `أدعوكم للمساهمة في هذه الحالة: ${selectedCase.title}`
  );

  document.querySelector(
    ".facebook"
  ).href = `https://www.facebook.com/sharer/sharer.php?u=${shareURL}`;
  document.querySelector(
    ".whatsapp"
  ).href = `https://wa.me/?text=${shareText}%0A${shareURL}`;
  document.querySelector(
    ".x"
  ).href = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareURL}`;

  // عند الضغط على زر "شارك الحالة"
  shareBtn.addEventListener("click", function (event) {
    event.preventDefault();
    modal.style.display = "block";
  });

  // عند الضغط على زر إغلاق النافذة
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // إغلاق النافذة عند الضغط خارجها
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
